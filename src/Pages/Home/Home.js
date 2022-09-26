import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatArea from '../ChatArea/ChatArea';
import MessagesList from './MessagesList';

import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: theme.backgroundColor, },
            headerTintColor:theme.color
        }}>
            <Stack.Screen name="MessagesList" component={MessagesList} options={{
                title: "Chats"
            }} />
            <Stack.Screen name="ChatArea" component={ChatArea} />
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
