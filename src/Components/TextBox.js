import { TextInput, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const TextBox = ({ title, value, onChangeText, secureText }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <TextInput
            style={{
                backgroundColor: theme.lineBackground, color: theme.color,
                borderRadius: 5, marginBottom: 10, borderColor: theme.purpleColor, borderWidth: 1, height: 50,
                padding: 5
            }}
            onChangeText={onChangeText}
            value={value}
            placeholder={title}
            placeholderTextColor={theme.grayText}
            secureTextEntry={secureText ? true : false}
        />
    );
}

export default TextBox;
