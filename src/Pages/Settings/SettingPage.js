import { View, Image, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";

import SettingButton from '../../Components/SettingButton';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from '../../Toolkits/themeSlice';
import lightTheme from '../../Themes/light';
import darkTheme from '../../Themes/dark';

import { firebaseConfig } from "../../FirebaseConfig/firebaseConfig";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingPage = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [userName, setUserName] = useState('');
    const [email, setMail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    function changeTheme() {
        theme === lightTheme ? dispatch(setDark()) : dispatch(setLight());
        setThemeStorage();
    }
    const setThemeStorage = async () => {
        await AsyncStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
    };
    function LogOut() {
        resetStorage();
        auth.signOut().then(() => {
            navigation.navigate("SignIn");
        }).catch(error => Alert.alert(error.message));
    }
    const resetStorage = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
                setUserName(profile.displayName);
                setMail(profile.email);
                setProfilePicture(profile.photoURL);
            });
        }
    }, []);

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <View style={styles.profile_info_area}>
                {
                    profilePicture ?
                        <Image style={{ width: 64, height: 64, borderRadius: 10, marginRight: 10 }} source={{ uri: profilePicture }} />
                        :
                        <View style={[styles.empty_image, { backgroundColor: theme.purpleColor }]}>
                            <Text style={[styles.empty_image_text, { color: theme.backgroundColor }]}>
                                {userName.split(' ').reduce((prev, current) => `${prev}${current[0]}`, "")}
                            </Text>
                        </View>
                }
                <View>
                    <Text style={[styles.user_text, { color: theme.color }]}>
                        {userName}
                    </Text>
                    <Text style={{ color: theme.color }}>
                        {email}
                    </Text>
                </View>
            </View>

            <SettingButton title={"Theme: " + theme.title} iconName={theme === lightTheme ? 'brightness-6' : 'bedtime'} onPress={() => changeTheme()} />
            <SettingButton title="Account" iconName='person' onPress={null} />
            <SettingButton title="Help" iconName="help" onPress={null} />
            <SettingButton title="Log out" iconName="logout" onPress={() => LogOut()} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            alignItems: 'center',
            padding: 10
        },
        profile_info_area:
        {
            width: '100%',
            flexDirection: 'row',
            height: 72,
        },
        empty_image:
        {
            width: 64,
            height: 64,
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        empty_image_text:
        {
            color: 'white',
            fontSize: 24
        },
        user_text:
        {
            fontWeight: '700',
            fontSize: 16
        },
        mail_text:
        {

        }
    }
);

export default SettingPage;