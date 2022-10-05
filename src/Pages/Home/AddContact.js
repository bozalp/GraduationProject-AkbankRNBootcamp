import { View, Image, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";

import TextBox from "../../Components/TextBox";
import Buttons from "../../Components/Buttons";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import { useSelector, useDispatch } from 'react-redux';
import { firebaseConfig } from "../../FirebaseConfig/firebaseConfig";
import { getFirestore, getDocs, setDoc, QuerySnapshot, collection, addDoc, query, where } from 'firebase/firestore/lite';
const AddContact = () => {
    const theme = useSelector((state) => state.theme.theme);
    const [receiver, setReceiver] = useState("");
    const [sender, setSender] = useState("");
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const createChat = async () => {
        const docRef = await addDoc(collection(db, "chats"), {
            sender: sender,
            receiver: receiver
        });
        setReceiver("");
        console.log("Document written with ID: ", docRef.id);
    }
    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                console.log("  Email: " + profile.email);
                setSender(profile.email);
            });
        }
    }, []);

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <TextBox title={"Receiver Email"} value={receiver} onChangeText={setReceiver} />
            <Buttons title={"Add New Contact"} onPress={createChat} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            padding: 10
        },
    }
)

export default AddContact;