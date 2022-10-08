import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';

import SettingPage from '../Pages/Settings/SettingPage';
import AccountPage from '../Pages/Settings/AccountPage';

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    function goToSettings() {
        Alert.alert("sa");
    }
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: theme.backgroundColor, },
            headerTintColor: theme.color,
            
        }}>
            <Stack.Screen name="SettingPage" component={SettingPage} options={{
                title:"Settings"
            }}/>
            <Stack.Screen name="AccountPage" component={AccountPage} options={{
                title:"Account"
            }}/>

        </Stack.Navigator>
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

export default Home;
