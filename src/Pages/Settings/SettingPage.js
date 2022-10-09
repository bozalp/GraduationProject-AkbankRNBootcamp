import { View, Image, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native'
import SettingButton from '../../Components/SettingButton';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from '../../Toolkits/themeSlice';
import lightTheme from '../../Themes/light';
import darkTheme from '../../Themes/dark';

import { firebaseConfig } from "../../FirebaseConfig/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const SettingPage = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [userName, setUserName] = useState('');
    const [email, setMail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const isFocused = useIsFocused();

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1]
        });
        if (!result.cancelled) {
            const uri = result.uri;
            setProfilePicture(uri);
            setTimeout(() => {
                uploadImage(result.uri);
            }, 1000);
        }
    };

    function updateProfilePicture(downloadUrl) {
        updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
        }).then(() => {
            console.log("profile updated");
        }).catch((error) => {
            console.log(error.toString());
        });
    }


    const uploadImage = async (picture) => {
        console.log(picture);
        const metadata = {
            contentType: 'image/jpeg'
        };
        try {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', picture, true);
                xhr.send(null);
            });
            const storage = getStorage();
            const fileRef = ref(storage, uuid.v4());
            await uploadBytes(fileRef, blob, metadata)
            blob.close();
            getDownloadURL(fileRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                updateProfilePicture(downloadURL);
            });
        }
        catch (error) {
            console.log(error);
            Alert.alert('Network Error', 'Please check your internet connection!');
        }


    }
    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                console.log("  Photo URL: " + profile.photoURL);
                setUserName(profile.displayName);
                setMail(profile.email);
                setProfilePicture(profile.photoURL);

            });
        }
    }, [isFocused]);

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <View style={styles.profile_info_area}>
                <View>
                    {
                        profilePicture ?
                            <Image style={styles.profile_image} source={{ uri: profilePicture }} />
                            :
                            <View style={[styles.empty_image, { backgroundColor: theme.purpleColor }]}>
                                <Text style={[styles.empty_image_text, { color: theme.backgroundColor }]}>
                                    {userName.split(' ').reduce((prev, current) => `${prev}${current[0]}`, "")}
                                </Text>
                            </View>

                    }
                    <TouchableOpacity style={[{ backgroundColor: theme.purpleColor, borderColor: theme.backgroundColor }, styles.camera_button]} onPress={pickImage} activeOpacity={0.7}>
                        <Icons name='photo-camera' size={20} color={theme.backgroundColor} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.user_text, { color: theme.color }]}>
                    {userName}
                </Text>
                <Text style={{ color: theme.color }}>
                    {email}
                </Text>

            </View>
            <SettingButton title={"Theme: " + theme.title} iconName={theme === lightTheme ? 'brightness-6' : 'bedtime'} onPress={() => changeTheme()} />
            <SettingButton title="Account" iconName='person' onPress={() => navigation.navigate("AccountPage")} />
            <SettingButton title="Help" iconName="help" onPress={null} />
            <SettingButton title="Log out" iconName="logout" onPress={() => LogOut()} />
            <View style={styles.footer}>
                <Text style={{ color: theme.color, }}>
                    from
                </Text>
                <Text style={{ color: theme.color, fontWeight: '700', }}>
                    Batuhan OZALP - github.com/bozalp
                </Text>
            </View>
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
            padding: 10,
            alignItems: 'center'
        },
        profile_image:
        {
            width: 128,
            height: 128,
            borderRadius: 10,
            marginRight: 10,
            marginBottom: 15,
        },
        empty_image:
        {
            width: 128,
            height: 128,
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
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
        camera_button:
        {
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            position: 'absolute',
            bottom: 5,
            right: -5,
        },
        footer:
        {
            alignContent: 'flex-end',
            bottom: 0,
            alignItems: 'center',
            position: 'absolute',
            paddingBottom: 20
        }
    }
);

export default SettingPage;