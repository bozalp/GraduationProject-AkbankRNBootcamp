import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';
import Icons from '@expo/vector-icons/MaterialIcons';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../FirebaseConfig/firebaseConfig";
import { getAuth, signOut, updateProfile, updatePassword } from "firebase/auth";

const AccountPage = () => {
    const theme = useSelector((state) => state.theme.theme);
    const [userName, setUserName] = useState('');
    const [changeUserName, setChangeUserName] = useState('');
    const [password, setPassword] = useState('');
    const [nameSetting, setNameSetting] = useState(false);
    const [passwordSetting, setpasswordSetting] = useState(false);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                setUserName(profile.displayName);
            });
        }
    }, []);

    function changePassword() {
        const user = auth.currentUser;
        const newPassword = password;
        setpasswordSetting(!passwordSetting);
        updatePassword(user, newPassword).then(() => {
            Alert.alert("Password updated!");
        }).catch((error) => {
            Alert.alert("An error occurred!");
        });
    }
    function UpdateUsername() {
        const user = auth.currentUser;
        setNameSetting(!nameSetting)
        updateProfile(user, {
            displayName: changeUserName,
        }).then(() => {
            Alert.alert("Username updated!");
        }).catch((error) => {
            Alert.alert("An error occurred!");
        });
    }

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>

            <View>
                <View style={[{ borderColor: theme.borderColor, backgroundColor: theme.lineBackground }, styles.info_lines]}>
                    <View style={{ padding: 10 }}>
                        <Icons name='person' size={28} color={theme.color} />
                    </View>
                    {
                        !nameSetting ?
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: theme.grayText, fontSize: 12 }}>
                                    Name Surname
                                </Text>
                                <Text style={{ color: theme.color, fontSize: 16 }}>
                                    {userName}
                                </Text>
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={{
                                        backgroundColor: theme.lineBackground, color: theme.color,
                                        borderRadius: 5, borderColor: theme.purpleColor, borderWidth: 1, height: 50,
                                        padding: 5
                                    }}
                                    onChangeText={setChangeUserName}
                                    value={changeUserName}
                                    placeholder={"Name Surname"}
                                    placeholderTextColor={theme.grayText}
                                    secureTextEntry={false}
                                />
                            </View>
                    }
                    <View style={{ padding: 10 }}>
                        {
                            !nameSetting ?
                                <TouchableOpacity activeOpacity={0.7} onPress={() => setNameSetting(!nameSetting)}>
                                    <Icons name='edit' size={28} color={theme.purpleColor} />
                                </TouchableOpacity>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => UpdateUsername()}>
                                        <Icons name='check' size={28} color={theme.purpleColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => setNameSetting(!nameSetting)}>
                                        <Icons name='close' size={28} color={theme.purpleColor} />
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </View>
            <View>
                <View style={[{ borderColor: theme.borderColor, backgroundColor: theme.lineBackground }, styles.info_lines]}>
                    <View style={{ padding: 10 }}>
                        <Icons name='lock' size={28} color={theme.color} />
                    </View>
                    {
                        !passwordSetting ?
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: theme.grayText, fontSize: 12 }}>
                                    Password
                                </Text>
                                <Text style={{ color: theme.color, fontSize: 16 }}>
                                    
                                </Text>
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={{
                                        backgroundColor: theme.lineBackground, color: theme.color,
                                        borderRadius: 5, borderColor: theme.purpleColor, borderWidth: 1, height: 50,
                                        padding: 5
                                    }}
                                    onChangeText={setPassword}
                                    value={password}
                                    placeholder={"Password"}
                                    placeholderTextColor={theme.grayText}
                                    secureTextEntry={true}
                                />
                            </View>
                    }
                    <View style={{ padding: 10 }}>
                        {
                            !passwordSetting ?
                                <TouchableOpacity activeOpacity={0.7} onPress={() => setpasswordSetting(!passwordSetting)}>
                                    <Icons name='edit' size={28} color={theme.purpleColor} />
                                </TouchableOpacity>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => changePassword()}>
                                        <Icons name='check' size={28} color={theme.purpleColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => setpasswordSetting(!passwordSetting)}>
                                        <Icons name='close' size={28} color={theme.purpleColor} />
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            alignItems: 'center',
            padding: 10
        },
        info_lines:
        {
            width: '100%',
            flexDirection: 'row',
            height: 64,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
        },
        icon:
        {

        }
    }
);

export default AccountPage;