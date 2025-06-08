import { configureStore } from '@reduxjs/toolkit';
import synchronize from './slice'; // Путь к вашему слайсу
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        apiRequest: synchronize, // Подключаем слайс
    },
});

export type RootState = ReturnType<typeof store.getState>;

// Создаем типизированную версию хука
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Типизируем dispatch
export type AppDispatch = typeof store.dispatch;

// Создаем типизированную версию хука
export const useAppDispatch = () => useDispatch<AppDispatch>();