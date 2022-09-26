import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import themeReducer from './themeSlice';

export const store = configureStore(
    {
        reducer: {
            theme: themeReducer,
            //users: useReducer
        }
    }
);