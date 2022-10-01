import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native';

import ContactLines from '../../Components/ContactLines';

import { useSelector } from 'react-redux';

import Icons from '@expo/vector-icons/Ionicons';

const MessagesList = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const [showProfileImage, setProfilImage] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(false);

    function handleViewProfileImage(selectedPicture) {
        setProfilImage((i) => !i);
        setSelectedPhoto(selectedPicture);
        Alert.alert(selectedPhoto);
        //Alert.alert(showProfileImage.toString());
    }

    const photos = [
        "https://i.picsum.photos/id/324/200/200.jpg?hmac=qhw4ORwk8T1r-Rxd2QREZORSVvc6l_R1S6F3Pl9mR_c",
        "https://i.picsum.photos/id/642/200/200.jpg?hmac=MJkhEaTWaybCn0y7rKfh_irNHvVuqRHmxcpziWABTKw",
        "https://i.picsum.photos/id/177/200/200.jpg?hmac=785Vry8HsdS9dQ7mFYbwV8bR2tWVtzJWWl9YLp6L0n8"
    ]
    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.contact_button]}>
                <Icons name='pencil' size={28} color={theme.backgroundColor} />
            </TouchableOpacity>
            <ContactLines navigation={navigation} userName="Batuhan özalp" lastMessage="Nabıyon bea??" profilePicture={photos[0]} messageTime="12:00" />
            <ContactLines navigation={navigation} userName="Doğan Kayış" lastMessage="Nabıyon bea??" messageTime="yesterday" />
            <ContactLines navigation={navigation} userName="Ayşe fatma" lastMessage="Nabıyon bea??" profilePicture={photos[2]} messageTime="24 Sep" />
            <ContactLines navigation={navigation} userName="Batuhh ö" lastMessage="Nabıyon bea??" profilePicture={photos[1]} messageTime="22 Sep" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    zoom_picture_container:
    {
        flex: 1,
        backgroundColor: 'black',
        //opacity: 0.7,
        width: '100%',
        height: '100%'
    },
    contact_button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        position: 'absolute',
        bottom: 30,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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

export default MessagesList;
