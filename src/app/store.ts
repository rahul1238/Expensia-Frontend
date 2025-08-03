import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../feature/auth/authSlice';
import themeReducer from '../feature/theme/themeSlice';
import languageReducer from '../feature/language/languageSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        theme: themeReducer,
        language: languageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
