import { View, Image, StyleSheet, Text } from "react-native";
import SettingButton from '../../Components/SettingButton';

import { useSelector } from 'react-redux';

const SettingPage = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <View style={[{ backgroundColor: theme.backgroundColor}, styles.container]}>
            <SettingButton title="Theme" iconName="brightness-6" onPress={null} />
            <SettingButton title="Account" iconName="person" onPress={null} />
            <SettingButton title="Help" iconName="help" onPress={null} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            alignItems: 'center',
            padding:10
        },
    }
);

export default SettingPage;