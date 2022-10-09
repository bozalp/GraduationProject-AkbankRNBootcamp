import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDark, setLight } from '../../Toolkits/themeSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../FirebaseConfig/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icons from '@expo/vector-icons/MaterialIcons';

const SplashScreen = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const getTheme = async () => {
        const value = await AsyncStorage.getItem('theme');
        value === 'light' || value === null ? dispatch(setDark()) : dispatch(setLight());
    };

    //I am logging in if there is registered user data. Otherwise i go to login screen
    const getUserData = async () => {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                goToHomePage();
            })
            .catch(error => {
                navigation.navigate("SignIn");
            });

    }

    function goToHomePage() {
        navigation.navigate("Home");
    }

    useEffect(() => {
        getTheme();
        setTimeout(() => {
            getUserData();
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Icons name='chat' size={64} color={"black"} style={{ paddingBottom: 10}} onPress={goToHomePage}/>
            <Text>Best Chat App</Text>
            <Text style={{ paddingLeft: 120, fontSize: 10 }}>
                by bozalp
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreen;
