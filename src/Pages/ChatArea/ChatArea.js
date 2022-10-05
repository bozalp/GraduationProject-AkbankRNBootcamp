import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { GiftedChat } from 'react-native-gifted-chat';

import Icons from '@expo/vector-icons/MaterialIcons';

import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';
import { initializeApp } from 'firebase/app';
import firebase from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, QuerySnapshot } from 'firebase/firestore/lite';

const ChatArea = ({ navigation, route }) => {
    const theme = useSelector((state) => state.theme.theme);
    const { id, userName, pictureUrl } = route.params;
    const [message, setMessage] = useState("");
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        firebase.getFirestore().collection("chats")
            .onSnapshot((QuerySnapshot) => {
                Alert.alert(QuerySnapshot.docs);
            }
            )
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
                                            {userName.split(' ').reduce((prev, current) => `${prev}${current[0]}`, "")}
                                        </Text>
                                    </View>
                            }
                        </TouchableOpacity>
                        <Text style={{ color: theme.color, fontWeight: '700', paddingLeft: 10 }}>
                            {userName}
                        </Text>
                    </View>
                ),
            }
        );
    }, []);

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <View style={styles.inner}>
                <Text>sa</Text>
            </View>
            <View style={[{ backgroundColor: theme.lineBackground, borderColor: theme.purpleColor, }, styles.textbox_area]}>
                <TextInput
                    style={[{ backgroundColor: theme.lineBackground, color: theme.color, borderColor: theme.purpleColor, }, styles.textbox]}
                    onChangeText={setMessage}
                    value={message}
                    placeholder={"Write a message"}
                    placeholderTextColor={theme.grayText}
                />
                <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.send_button]} activeOpacity={0.7}>
                    <View style={{ transform: [{ rotate: "-45deg" }], paddingBottom: 5, paddingLeft: 10 }} >
                        <Icons name="send" size={28} color={theme.backgroundColor} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner:
    {
        flex: 1,
        padding: 10
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
