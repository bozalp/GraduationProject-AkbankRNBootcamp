import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { GiftedChat } from 'react-native-gifted-chat';

import Icons from '@expo/vector-icons/MaterialIcons';

const ChatArea = ({ navigation, route }) => {
    const theme = useSelector((state) => state.theme.theme);
    const { id, userName } = route.params;
    const [message, setMessage] = useState("");

    useEffect(() => {
        navigation.setOptions(
            {
                title: userName,
            }
        );
    }, []);

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <View style={styles.inner}>
                <Text>sa</Text>
            </View>
            <View style={[{ backgroundColor: theme.lineBackground }, styles.textbox_area]}>
                <TextInput
                    style={[{ backgroundColor: theme.lineBackground, color: theme.color, borderColor: theme.purpleColor, }, styles.textbox]}
                    onChangeText={setMessage}
                    value={message}
                    placeholder={"Write a message"}
                    placeholderTextColor={theme.grayText}
                />
                <TouchableOpacity style={[{ backgroundColor: theme.purpleColor }, styles.send_button]} activeOpacity={0.7}>
                    <View style={{ transform: [{ rotate: "-45deg" }], paddingBottom: 5, paddingLeft: 10 }} >
                        <Icons name="send" size={28} color={theme.backgroundColor} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner:
    {
        flex: 1,
        padding: 10
    },
    textbox:
    {
        borderRadius: 5,
        height: 50,
        padding: 5,
        flex: 1,
        borderWidth: 1,
    },
    textbox_area:
    {
        width: '100%',
        bottom: 0,
        height: 72,
        flexDirection: 'row',
        position: 'absolute',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    send_button:
    {
        width: 48,
        height: 48,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ChatArea;
