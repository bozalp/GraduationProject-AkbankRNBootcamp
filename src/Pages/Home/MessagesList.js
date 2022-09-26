import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

import ContactLines from '../../Components/ContactLines';

import { useSelector } from 'react-redux';

import Icons from '@expo/vector-icons/Ionicons';

const MessagesList = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const [showProfileImage, setProfilImage] = useState(false);

    function handleViewProfileImage() {
        setProfilImage((i) => !i);
        Alert.alert(showProfileImage.toString());
    }

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <TouchableOpacity style={[{ backgroundColor: theme.greenColor }, styles.contact_button]}>
                <Icons name='pencil' size={28} color={theme.backgroundColor} />
            </TouchableOpacity>
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" profilePicture="https://i.picsum.photos/id/324/200/200.jpg?hmac=qhw4ORwk8T1r-Rxd2QREZORSVvc6l_R1S6F3Pl9mR_c" messageTime="12:00" />
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" profilePicture="https://i.picsum.photos/id/642/200/200.jpg?hmac=MJkhEaTWaybCn0y7rKfh_irNHvVuqRHmxcpziWABTKw" messageTime="yesterday" />
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" profilePicture="https://i.picsum.photos/id/177/200/200.jpg?hmac=785Vry8HsdS9dQ7mFYbwV8bR2tWVtzJWWl9YLp6L0n8" messageTime="24 Sep" />
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" messageTime="22 Sep" />
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
    }
});

export default MessagesList;
