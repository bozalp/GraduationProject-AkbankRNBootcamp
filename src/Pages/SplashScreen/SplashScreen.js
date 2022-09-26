import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';


const SplashScreen = ({ navigation }) => {

    function goToHomePage() {
        navigation.navigate("Home");
    }

    useEffect(() => {
        setTimeout(() => {
            goToHomePage();
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Best Chat App</Text>
            <Text style={{ paddingLeft: 120, fontSize: 10 }}>
                by bozalp
            </Text>
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

export default SplashScreen;
