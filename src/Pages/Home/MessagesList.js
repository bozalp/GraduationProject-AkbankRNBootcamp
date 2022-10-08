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
    const [chatList, setChatList] = useState([{
        newId: "",
        data: [],
    }]);
    const [IdS, setId] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    function goToAddContact() {
        navigation.navigate("AddContact");
    }

    //const srg = collection(db, "chats");
    //Giris yapan kisi kullanici adi gonderici adinda varsa mesajlari listeliyorum...
    const queryChats = query(collection(db, "chats"), where("users", "array-contains", auth.currentUser.email));
    //const queryChats2 = query(collection(db, "chats"), where("receiver", "==", auth.currentUser.email));
    const getUsers = async () => {
        const receiverList = [];
        const idList = [];
        let x = 0;
        const querySnapshot = await getDocs(queryChats);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            //setChatList(x);
            receiverList.push(data);
            idList.push(doc.id);
            //console.log(doc.id, " => ", doc.data());
        });
        setChatList(receiverList);
        let idArray = [];
        for (let i = 0; i < idList.length; i++) {
            idArray.push({
                newId: idList[i],
                data: receiverList[i],
            });    
        }
        setId(idArray);
        console.log(IdS);
        setLoading(false);
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                setSender(profile.email);
            });
        }
        getUsers();
    }, []);

    const renderChatList = ({ item }) =>
        <ContactLines navigation={navigation} userName={item.data.users.filter(user => user !== auth.currentUser.email).toString()} lastMessage="Nabıyon bea??" messageTime="12:00"
            onPress={() => navigation.navigate("ChatArea", {
                newId: item.newId,
                newName: item.data.users.filter(user => user !== auth.currentUser.email).toString()
            })}
        />

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <Text>
                Welcome X
            </Text>
            {

               /* IdS.map((m) =>
                        <ContactLines navigation={navigation} userName={m.data.users.filter(user => user !== auth.currentUser.email).toString()} lastMessage="Nabıyon bea??" messageTime="12:00"
                            onPress={() => navigation.navigate("ChatArea", {
                                yeniId: m.yeniId,
                                yeniName: m.data.users.filter(user => user !== auth.currentUser.email).toString()
                            })}
                        />
                )
                 */
                isLoading ? <ActivityIndicator size={"large"} />
                :
                      <FlatList
                            data={IdS}
                            renderItem={renderChatList} />
            }
            <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.contact_button]} onPress={goToAddContact}>
                <Icons name='pencil' size={28} color={theme.backgroundColor} />
            </TouchableOpacity>
            <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.refresh_button]} onPress={getUsers}>
                <Icons name='refresh' size={28} color={theme.backgroundColor} />
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
    },
    refresh_button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        width: 52,
        height: 52,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        right: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});

export default MessagesList;
