import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';

import ContactLines from '../../Components/ContactLines';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore, getDocs, setDoc, QuerySnapshot, collection, addDoc, query, where } from 'firebase/firestore/lite';

import { useSelector } from 'react-redux';

import Icons from '@expo/vector-icons/Ionicons';

const MessagesList = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const [sender, setSender] = useState("");
    const [chatList, setChatList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    //const userList = [];
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    function goToAddContact() {
        navigation.navigate("AddContact");
    }

    /* const createChat = async () => {
         const response = await firebase
             .firestore()
             .collection("users")
             .add({
                 users: ["email", "userEmail"],
             });
         return response;
     };*/
    //const srg = collection(db, "chats");
    //Giris yapan kisi kullanici adi gonderici adinda varsa mesajlari listeliyorum...
    const srg2 = query(collection(db, "chats"), where("sender", "==", sender));
    const sorgu = async () => {
        const receiverList = [];
        const querySnapshot = await getDocs(srg2);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            //setChatList(x);
            receiverList.push(data.receiver);
            
            //console.log(doc.id, " => ", doc.data());
        });
        setChatList(receiverList);
        setLoading(false);
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                setSender(profile.email);
            });
        }
        sorgu();
        setTimeout(() => {
            // sorgu();
        }, 1000);
        /* firebase.firestore().collection('chats').onSnapshot((snapShot) => {
             console.warn(snapShot.docs);
         })*/
    }, [chatList]);

    const photos = [
        "https://i.picsum.photos/id/324/200/200.jpg?hmac=qhw4ORwk8T1r-Rxd2QREZORSVvc6l_R1S6F3Pl9mR_c",
        "https://i.picsum.photos/id/642/200/200.jpg?hmac=MJkhEaTWaybCn0y7rKfh_irNHvVuqRHmxcpziWABTKw",
        "https://i.picsum.photos/id/177/200/200.jpg?hmac=785Vry8HsdS9dQ7mFYbwV8bR2tWVtzJWWl9YLp6L0n8"
    ]

    const renderChatList = ({ item }) => <ContactLines navigation={navigation} userName={item} lastMessage="Nabıyon bea??" messageTime="12:00" />

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>

            <Text>
                Welcome X
            </Text>
            {
                isLoading ? <ActivityIndicator size={"large"} />
                    :
                    <FlatList
                        data={chatList}
                        renderItem={renderChatList} />
            }
            <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.contact_button]} onPress={goToAddContact}>
                <Icons name='pencil' size={28} color={theme.backgroundColor} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    zoom_picture_container:
    {
        flex: 1,
        backgroundColor: 'black',
        //opacity: 0.7,
        width: '100%',
        height: '100%'
    },
    contact_button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        width: 52,
        height: 52,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    full_screen_container:
    {
        width: '100%',
        height: '100%',
    },
    full_screen_image:
    {
        position: 'absolute',
        width: 250,
        height: 250,
    },
    image_bg:
    {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 50
    }
});

export default MessagesList;
