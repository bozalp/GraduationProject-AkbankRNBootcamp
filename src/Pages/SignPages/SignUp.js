import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import Buttons from '../../Components/Buttons';
import TextBox from '../../Components/TextBox';

const SignUp = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const theme = useSelector((state) => state.theme.theme);

    const [email, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    const [username, setUsername] = useState(null);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
                navigation.navigate("SignIn");
            })
            .catch(error => Alert.alert(error.message));
    }
    function handleGoSignIn() {
        navigation.navigate("SignIn");
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={{ margin: 10, }}>
                <Text style={[styles.header_text, { color: theme.color }]}>Sign up</Text>

                <TextBox title="Username" value={username} onChangeText={setUsername} />
                <TextBox title="E-Mail" value={email} onChangeText={setMail} />
                <TextBox title="Password" value={password} onChangeText={setPassword} secureText={true} />
                <TextBox title="Password (Again)" value={passwordAgain} onChangeText={setPasswordAgain} secureText={true} />
                <View style={{ paddingBottom: 30, }} />
                <Buttons title={"Sign up"} onPress={() => handleSignUp()} />
                <View style={styles.text} >
                    <Text style={{ color: theme.grayText, paddingRight: 10 }}>
                        Do you have an account?
                    </Text>
                    <Text style={{ color: theme.purpleColor }} onPress={() => handleGoSignIn()}>
                        Sign in
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
            justifyContent: 'center',
        }
    }
);
export default SignUp;
