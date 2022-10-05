import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const ContactLines = ({ navigation, userName, profilePicture, messageTime, lastMessage }) => {
    const theme = useSelector((state) => state.theme.theme);
    const [showProfileImage, setProfilImage] = useState(false);

    function GoToChat() {
        navigation.navigate("ChatArea", { userName: userName, pictureUrl: profilePicture });
    }
    function ShowProfilePicture() {
        //setProfilImage((i) => !i);
        navigation.navigate("ViewImage", { userName: userName, pictureUrl: profilePicture })
    }
    return (

        <View style={[{ backgroundColor: theme.lineBackground, borderColor: theme.borderColor }, styles.container]}>
            {
                profilePicture ?
                    <TouchableOpacity onPress={ShowProfilePicture}>
                        <Image source={{ uri: profilePicture }} style={styles.profile_picture} />
                    </TouchableOpacity>
                    :
                    <View style={[styles.empty_image, { backgroundColor: theme.purpleColor }]}>
                        <Text style={[styles.empty_image_text, { color: theme.backgroundColor }]}>
                        
                            {userName?.split(' ').reduce((prev, current) => `${prev}${current[0]}`, "")}
                        </Text>
                    </View>
            }
            <TouchableOpacity style={{ flex: 1 }} onPress={GoToChat}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[{ color: theme.color }, styles.title]}>{userName}</Text>
                    <Text style={[{ color: theme.color }, styles.last_message]}>{messageTime}</Text>
                </View>
                <Text style={[{ color: theme.grayText }, styles.last_message]}>{lastMessage}</Text>
            </TouchableOpacity >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        height: 72,
        borderWidth: 2,
    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 16,
    },
    last_message:
    {
        fontSize: 12,
    },
    empty_image:
    {
        width: 48,
        height: 48,
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_image_text:
    {
        color: 'white',
        fontSize: 20
    },
    profile_picture:
    {
        width: 48,
        height: 48,
        borderRadius: 10,
        marginRight: 10,
    },
    full_screen_container:
    {
        width: '100%',
        height: '100%',
    },
    full_screen_image:
    {
        position: 'absolute',
        width: 250,
        height: 250,
    },
    image_bg:
    {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 50
    }
});

export default ContactLines;
