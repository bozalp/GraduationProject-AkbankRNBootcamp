import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatArea from '../ChatArea/ChatArea';
import MessagesList from './MessagesList';

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MessagesList" component={MessagesList} options={{
                headerShown: false
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
