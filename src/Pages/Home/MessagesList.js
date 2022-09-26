import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ContactLines from '../../Components/ContactLines';

const MessagesList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??"/>
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??"/>
            <ContactLines userName="Batu" lastMessage="Nabıyon bea??"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MessagesList;
