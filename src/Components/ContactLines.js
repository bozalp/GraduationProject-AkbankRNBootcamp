import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';

import ChatArea from '../Pages/ChatArea/ChatArea';

const ContactLines = ({ navigation, userName, avatarUrl, lastMessage }) => {

    function goToChat() {
        navigation.navigate("ChatArea");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.empty_image} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}}>
                    <Text style={styles.title}>{userName}</Text>
                    <Text style={[{ color: '#666' }, styles.last_message]}>{lastMessage}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    title:
    {
        fontWeight: '700',
        fontSize: 16,
    },
    last_message:
    {
        fontSize: 12,
    },
    empty_image:
    {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'red',
        marginRight: 10
    },
});

export default ContactLines;
