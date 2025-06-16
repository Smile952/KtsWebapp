import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiControllers } from 'common/addr';
import axios from 'axios';
import { RootState } from './store';

export interface UserData {
    id: number | null,
    name: string | null,
    email: string,
    age: number | null,
    password: string,
    permissionId: number | null
}

export interface AuthData {
    token: string | null,
    userData: UserData[]
}

export interface AuthState {
    token: string | null,
    userData: UserData | null,
    loading: boolean,
    error: string | null
}

type LoginCredentials = {
    email: string;
    password: string;
};
export const loginUser = createAsyncThunk<AuthData, UserData, { rejectValue: string; }>(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const credentials: LoginCredentials = {
                email: userData.email,
                password: userData.password
            }
            const response = await axios.post<AuthData>(
                apiControllers.TokenController,
                credentials
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || 'Ошибка аутентификации'
                );
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

const initialState: AuthState = {
    token: null,
    userData: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userData = action.payload.userData[0] || null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'ОШИБКА';
            });
    }
})

export const tokenSelector = (state: RootState) => state.auth.token;
export const userSelector = (state: RootState) => state.auth.userData;
export const authLoadingSelector = (state: RootState) => state.auth.loading;
export const authErrorSelector = (state: RootState) => state.auth.error;

export default authSlice.reducer;