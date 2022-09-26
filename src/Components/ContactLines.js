import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { useEffect, useState } from 'react';

import ChatArea from '../Pages/ChatArea/ChatArea';

const ContactLines = ({ navigation, userName, profilePicture, messageTime, lastMessage }) => {

    function goToChat() {
        navigation.navigate("ChatArea");
    }

    return (
        <View style={[{ backgroundColor: '#dedede' }, styles.container]}>
            <TouchableOpacity>
                {
                    
                            <Image source={{ uri: profilePicture }} style={styles.profile_picture} />
                        
                       // <View style={styles.empty_image} />
                }

            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{userName}</Text>
                    <Text style={styles.last_message}>{messageTime}</Text>
                </View>
                <Text style={[{ color: '#666' }, styles.last_message]}>{lastMessage}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
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
        borderRadius: 10,
        backgroundColor: 'red',
        marginRight: 10
    },
    profile_picture:
    {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 10
    },
});

export default ContactLines;
