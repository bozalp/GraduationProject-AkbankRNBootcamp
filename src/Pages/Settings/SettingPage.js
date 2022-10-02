import { View, Image, StyleSheet, Text } from "react-native";
import SettingButton from '../../Components/SettingButton';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from '../../Toolkits/themeSlice';
import lightTheme from '../../Themes/light';
import darkTheme from '../../Themes/dark';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingPage = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    function changeTheme() {
        theme === lightTheme ? dispatch(setDark()) : dispatch(setLight());
        setThemeStorage();
    }


    const setThemeStorage = async () => {
        await AsyncStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
    };

    return (
        <View style={[{ backgroundColor: theme.backgroundColor }, styles.container]}>
            <SettingButton title={"Theme: " + theme.title} iconName = {theme === lightTheme ?  'brightness-6' : 'bedtime'} onPress={() => changeTheme()} />
            <SettingButton title="Account" iconName='person' onPress={null} />
            <SettingButton title="Help" iconName="help" onPress={null} />
            <SettingButton title="Log out" iconName="logout" onPress={null} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            alignItems: 'center',
            padding: 10
        },
    }
);

export default SettingPage;