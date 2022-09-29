import { View, Image, StyleSheet } from "react-native";

const ViewImage = ({ route, navigation }) => {
    const { pictureUrl } = route.params;
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
            justifyContent: 'center'
        },
        profile_picture:
        {
            width: '75%',
            height: '75%',
        },
    }
);

export default ViewImage;