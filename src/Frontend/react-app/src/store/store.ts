import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from './authSlice'

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);


export const store = configureStore({
    reducer: {
        auth: persistedReducer
    },
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;