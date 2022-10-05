import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Buttons from '../../Components/Buttons';
import TextBox from '../../Components/TextBox';
const SignIn = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const theme = useSelector((state) => state.theme.theme);

    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

             /*   console.log("giris basarili");
                console.log(user.email);
                console.log(user.password);*/
                //setNewUser(email = user.email, password = user.password);
                setUserStorage();
                handleGoHome();
            })
            .catch(error => Alert.alert(error.message));
    }

    const setUserStorage = async () => {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
    };
    function handleGoHome() {
        navigation.navigate("Home");
    }
    function handleGoSignUp() {
        navigation.navigate("SignUp");
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={{ margin: 10, }}>
                <Text style={[styles.header_text, { color: theme.color }]}>Sign in</Text>

                <TextBox title="E-Mail" value={email} onChangeText={setMail} />
                <TextBox title="Password" value={password} onChangeText={setPassword} secureText={true} />
                <View style={{paddingBottom: 30,}} />
                <Buttons title={"Sign in"} onPress={() => handleSignIn()} />
                <View style={styles.text} >
                    <Text style={{ color: theme.grayText, paddingRight: 10 }}>
                        Don't have an account?
                    </Text>
                    <Text style={{ color: theme.purpleColor }} onPress={() => handleGoSignUp()}>
                        Sign Up
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            padding: 10,
        },
        header_text:
        {
            fontSize: 24,
            paddingTop: 50,
            paddingBottom: 30
        },
        phone_number_area:
        {
            flexDirection: 'row',
        },
        text:
        {
            flexDirection: 'row',
            paddingTop: 30,
            justifyContent: 'center'
        }
    }
);
export default SignIn;
