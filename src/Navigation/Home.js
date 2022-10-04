import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatArea from '../Pages/ChatArea/ChatArea';
import MessagesList from '../Pages/Home/MessagesList';
import ViewImage from '../Pages/ViewImage/ViewImage';
import Settings from './Settings';

import { useSelector } from 'react-redux';

import Icons from '@expo/vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    function goToSettings() {
        navigation.navigate("Settings");
    }
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: theme.backgroundColor, },
            headerTintColor: theme.color
        }}>
            <Stack.Screen name="MessagesList" component={MessagesList} options={{
                headerBackVisible: false,
                title: "Chats",
                headerRight: () => (
                    <TouchableOpacity activeOpacity={0.7} onPress={goToSettings}>
                        <Icons name="settings" size={24} color={theme.color} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="ChatArea" component={ChatArea} options={{
                headerTitle: ''
            }}/>
            <Stack.Screen name="ViewImage" component={ViewImage} options={{
                headerTintColor:'white',
                headerStyle: { backgroundColor: '#000', },
            }} />
            <Stack.Screen name="Settings" component={Settings} />
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
