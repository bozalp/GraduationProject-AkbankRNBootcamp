import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icons from '@expo/vector-icons/MaterialIcons';

const SettingButton = ({ title, iconName, onPress }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <TouchableOpacity onPress={onPress}
            style={[{ backgroundColor: theme.lineBackground, borderColor: theme.borderColor, }, styles.button]}>
            <Icons name={iconName} size={32} color={theme.color} style={styles.icon} />
            <Text style={{ color: theme.color, width: '100%' }}>{title}</Text>
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create(
    {
        button:
        {
            borderWidth: 2,
            borderRadius: 5,
            height: 64,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
        },
        icon:
        {
            padding: 10,
        }
    }
)
export default SettingButton;