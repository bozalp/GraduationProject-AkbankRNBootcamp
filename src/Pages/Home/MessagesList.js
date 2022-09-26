import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ContactLines from '../../Components/ContactLines';

const MessagesList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" profilePicture="https://i.picsum.photos/id/324/200/200.jpg?hmac=qhw4ORwk8T1r-Rxd2QREZORSVvc6l_R1S6F3Pl9mR_c" messageTime="12:00" />
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" profilePicture="https://i.picsum.photos/id/642/200/200.jpg?hmac=MJkhEaTWaybCn0y7rKfh_irNHvVuqRHmxcpziWABTKw" messageTime="yesterday" />
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??" profilePicture="https://i.picsum.photos/id/177/200/200.jpg?hmac=785Vry8HsdS9dQ7mFYbwV8bR2tWVtzJWWl9YLp6L0n8" messageTime="24 Sep" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
});

export default MessagesList;
