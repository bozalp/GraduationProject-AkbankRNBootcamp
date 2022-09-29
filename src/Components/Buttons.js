import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';


const Buttons = ({ title, onPress }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { borderColor: theme.color, backgroundColor: theme.purpleColor }]}
            onPress={onPress}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create(
    {
        button:
        {
            borderWidth: 1,
            borderRadius: 5,
            height: 50,
            width: '80%',
            justifyContent: 'center',
            alignSelf: 'center'
        }
    }
)
export default Buttons;