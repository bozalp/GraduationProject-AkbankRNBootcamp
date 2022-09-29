import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatArea = ({navigation, route}) => {
    const { id, userName } = route.params;
    useEffect(()=>{
        navigation.setOptions(
            {
                title: userName,
            }
        );
    },[])

    return (
        <View style={styles.container}>
            <Text>ChatArea</Text>
        </View>
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

export default ChatArea;
