import { createSlice } from '@reduxjs/toolkit'
import { Alert } from 'react-native';

import darkTheme from '../Themes/dark';
import lightTheme from '../Themes/light';

const initialState = {
    theme: darkTheme
}

export const themeSlice = createSlice(
    {
        name: 'Theme',
        initialState, //or initialState:initialState
        reducers: {
            setDark: (state) => {
                state.theme = darkTheme
            },
            setLight: (state) => {
                state.theme = lightTheme
            }
        }
    }
);

export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;