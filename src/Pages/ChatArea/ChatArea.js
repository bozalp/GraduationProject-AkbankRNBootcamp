import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { GiftedChat } from 'react-native-gifted-chat';

import Icons from '@expo/vector-icons/MaterialIcons';

import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';
import { getAuth, initializeAuth, } from "firebase/auth";
import { getFirestore, getDocs, setDoc, arrayUnion, documentId, QuerySnapshot, collection, addDoc, query, where, doc, getDoc, set } from 'firebase/firestore/lite';
import { useRoute } from '@react-navigation/native';

const ChatArea = ({ navigation, route }) => {
    const theme = useSelector((state) => state.theme.theme);
    const { yeniId, yeniName } = route.params;
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

    /*const getUserId = async () => {
        console.log("yeni id: ",yeniId);
        let _id = "";
        //const queryForId = query(collection(db, "chats"), where("receiver", "==", user.receiver));
        const queryForId = query(collection(db, "chats"), where("users", "array-contains", yeniName));
        const querySnapshot = await getDocs(queryForId);
        querySnapshot.forEach((doc) => {
            //setReceiverId(doc.id);
            _id = doc.id;
            //console.log(_id);
           // console.log(typeof (doc.id), " => ", doc.data());
        });
        
        setReceiverId(yeniId);
        getUsers(yeniId);
        setLoading(false);
    }*/

    const getUsers = async (_id) => {
        //console.log(_id);
        try {
            const docRef = doc(db, "chats", _id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                //console.log("+" + docSnap.data().receiver);
                setUsers(docSnap.data().receiver);
                setMessages(docSnap.data()?.messages ?? []);
                setLoading(false);
            } else {
                console.log("Document does not exist")
            }
        } catch (error) {
            console.log(error)
        }
    };

    /*   function getUserPhoto(userMail) {
          auth.getUserByEmail(userMail)
               .then((userRecord) => {
                   // See the UserRecord reference doc for the contents of userRecord.
                   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
               })
           if (user !== null) {
               console.log(user);
               user.providerData.forEach((profile) => {
                   console.log("Sign-in provider: " + profile.providerId);
                   console.log("  Provider-specific UID: " + profile.uid);
                   console.log("  Name: " + profile.displayName);
                   console.log("  Email: " + profile.email);
                   console.log("  Photo URL: " + profile.photoURL);
                   setUserName(profile.displayName);
                   setPicture(profile.photoURL);
               });
           }
           else
               console.log("kullanici yok");
       }*/

    useEffect(() => {
        //getUserId();
        setReceiverId(yeniId);
        setTimeout(() => {
            getUsers(yeniId);
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
                                            {yeniName?.split(' ').reduce((prev, current) => `${prev}${current[0]}`, "")}
                                        </Text>
                                    </View>
                            }
                        </TouchableOpacity>
                        <Text style={{ color: theme.color, fontWeight: '700', paddingLeft: 10 }}>
                            {yeniName}
                        </Text>
                    </View>
                ),
            }
        );
    }, []);

    useEffect(() => {
        getUsers(yeniId);
    }, [send])

    const onSend = (m) => {
        /*const docRef = addDoc(collection(db, "chats", receiverId), {
            messages: message
        });*/

        //textbox bos degilse verileri messages kismina array olarak gonderiyorum
        if (chatMessage !== "") {
            const cityRef = doc(db, 'chats', yeniId);
            let date = new Date();
            let messageTime = date.getHours() + ":" + date.getMinutes();
            setDoc(cityRef,
                {
                    messages: arrayUnion({ senderMail: auth.currentUser.email, text: m, date: date, time: messageTime })
                    //messages: [{ text: m }]
                }
                , { merge: true });
            setChatMessage("");
        }
        setSend(!send);
    }

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>

            <View style={styles.inner}>
                {

                    <FlatList
                        data={messages}
                        renderItem={({ item }) => {
                            if (item.senderMail === auth.currentUser.email) {
                                return (
                                    <View style={{ alignItems: 'flex-end' }}>
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
                            else {
                                return (
                                    <View style={[{ borderColor: theme.borderColor, backgroundColor: theme.lineBackground }, styles.messagebox_receiver]}>
                                        <Text style={{ color: theme.color, }}>
                                            {item.text}
                                        </Text>
                                        <Text style={[styles.time_text, { color: theme.grayText }]}>
                                            {item.time}
                                        </Text>
                                    </View>
                                )
                            }
                        }
                        }
                    />
                }
            </View>


            <View style={[{ backgroundColor: theme.lineBackground, borderColor: theme.purpleColor, }, styles.textbox_area]}>

                <TextInput
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
        // flexDirection: 'column-reverse',
        padding: 10,
        marginBottom: 70
    },
    messagebox_sender:
    {
        width: '60%',
        padding: 5,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'flex-end'
    },
    messagebox_receiver:
    {
        width: '60%',
        padding: 5,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'flex-start'
    },
    time_text:
    {
        fontSize: 12,
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
