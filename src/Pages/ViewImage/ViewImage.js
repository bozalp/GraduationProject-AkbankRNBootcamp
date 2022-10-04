import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import { useEffect } from 'react';
const ViewImage = ({ route, navigation }) => {
    const { userName, pictureUrl } = route.params;

    useEffect(() => {
        navigation.setOptions(
            {
                title: userName,
            }
        );
    }, []);

    return (
        <View style={styles.container} >
            <Image style={styles.profile_picture} source={{ uri: pictureUrl }} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            backgroundColor: '#000',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 50
        },
        profile_picture:
        {
            borderRadius: 10,
            width: Dimensions.get('window').width / 1.2,
            height: Dimensions.get('window').width / 1.2,
        },
    }
);

export default ViewImage;