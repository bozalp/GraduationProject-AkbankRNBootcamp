import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Icons from '@expo/vector-icons/MaterialIcons';

import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';
import { getAuth, initializeAuth, } from "firebase/auth";
import { getFirestore, getDocs, setDoc, arrayUnion, onSnapshot, QuerySnapshot, collection, addDoc, query, where, doc, getDoc, set } from 'firebase/firestore';

const ChatArea = ({ navigation, route }) => {
    const theme = useSelector((state) => state.theme.theme);
    const { newId, newName } = route.params;
    const [chatMessage, setChatMessage] = useState("");
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [isLoading, setLoading] = useState(true);
    const [receiverId, setReceiverId] = useState(null);
    const [sendingMessages, setSendMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [pictureUrl, setPicture] = useState("");
    const [username, setUserName] = useState("");
    const [send, setSend] = useState(false);
    const [reference, setReference] = useState(null);
    const scrollViewRef = useRef();

    const getUsers = async (_id) => {
        const unsub = onSnapshot(doc(db, "chats", _id), (doc) => {
            setUsers(doc.data().receiver);
            setMessages(doc.data()?.messages ?? []);
            setLoading(false);
            scrollToEnd();
        });

    };
    useEffect(() => {
        setReceiverId(newId);
        setTimeout(() => {
            getUsers(newId);
        }, 500);

        navigation.setOptions(
            {
                headerLeft: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icons name="arrow-back" size={28} color={theme.color} />
                            {
                                pictureUrl ?
                                    <Image style={{ width: 36, height: 36, borderRadius: 10, marginLeft: 5 }} source={{ uri: pictureUrl }} />
                                    :
                                    <View style={[styles.empty_image, { backgroundColor: theme.purpleColor }]}>
                                        <Text style={[styles.empty_image_text, { color: theme.backgroundColor }]}>
                                            {newName?.split(' ').reduce((prev, current) => `${prev}${current[0]}`, "")}
                                        </Text>
                                    </View>
                            }
                        </TouchableOpacity>
                        <Text style={{ color: theme.color, fontWeight: '700', paddingLeft: 10 }}>
                            {newName}
                        </Text>
                    </View>
                ),
            }
        );
    }, []);

    useEffect(() => {
        getUsers(newId);
        scrollToEnd();
    }, [send])

    function scrollToEnd() {
        scrollViewRef.current.scrollToEnd({ animated: true })
    }
    const onSend = (m) => {
        //textbox bos degilse verileri messages kismina array olarak gonderiyorum
        if (chatMessage !== "") {
            const cityRef = doc(db, 'chats', newId);
            let date = new Date();
            let messageTime = date.getHours() + ":" + date.getMinutes();
            setDoc(cityRef,
                {
                    messages: arrayUnion({ senderMail: auth.currentUser.email, text: m, date: date, time: messageTime })
                }
                , { merge: true });
            setChatMessage("");
        }
        setSend(!send);
    }

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <View style={styles.inner}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                    }
                    showsVerticalScrollIndicator={false}
                >
                    {
                        messages.map((item) => {
                            //I'm showing the sender's messages on the right
                            if (item.senderMail === auth.currentUser.email) {
                                return (
                                    <View style={{ alignItems: 'flex-end' }} key={item.date}>
                                        <View style={[{ borderColor: theme.borderColor, backgroundColor: theme.purpleColor }, styles.messagebox_sender]}>
                                            <Text style={{ color: theme.backgroundColor, }}>
                                                {item.text}
                                            </Text>
                                            <Text style={[styles.time_text, { color: theme.grayText }]}>
                                                {item.time}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                            //I'm showing the receiver's messages on the left
                            else {
                                return (

                                    <View style={{ alignItems: 'flex-start' }} key={item.date}>
                                        <View style={[{ borderColor: theme.borderColor, backgroundColor: theme.lineBackground }, styles.messagebox_receiver]}>
                                            <Text style={{ color: theme.color, }}>
                                                {item.text}
                                            </Text>
                                            <Text style={[styles.time_text, { color: theme.grayText }]}>
                                                {item.time}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        }
                        )
                    }
                </ScrollView>
            </View>
            <View style={[{ backgroundColor: theme.lineBackground, borderColor: theme.purpleColor, }, styles.textbox_area]}>

                <TextInput
                    onFocus={scrollToEnd}
                    style={[{ backgroundColor: theme.lineBackground, color: theme.color, borderColor: theme.purpleColor, }, styles.textbox]}
                    onChangeText={setChatMessage}
                    value={chatMessage}
                    placeholder={"Write a message"}
                    placeholderTextColor={theme.grayText}
                />
                <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.send_button]} activeOpacity={0.7}
                    onPress={() => onSend(chatMessage)}
                >
                    <View style={{ transform: [{ rotate: "-45deg" }], paddingBottom: 5, paddingLeft: 10 }} >
                        <Icons name="send" size={28} color={theme.backgroundColor} />
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner:
    {
        flex: 1,
        padding: 10,
        marginBottom: 70
    },
    messagebox_sender:
    {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    messagebox_receiver:
    {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    time_text:
    {
        fontSize: 12,
        paddingLeft: 20,
        paddingTop: 10,
    },
    textbox:
    {
        borderRadius: 5,
        height: 50,
        padding: 5,
        flex: 1,
        borderWidth: 1,
    },
    textbox_area:
    {
        borderTopWidth: 1,
        width: '100%',
        bottom: 0,
        height: 72,
        flexDirection: 'row',
        position: 'absolute',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    send_button:
    {
        width: 48,
        height: 48,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile_picture:
    {
        width: 24,
        height: 24,
        borderRadius: 10,
        marginRight: 10,
    },
    empty_image:
    {
        width: 36,
        height: 36,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_image_text:
    {
        color: 'white',
    },
});

export default ChatArea;
