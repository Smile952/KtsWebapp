import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiControllers } from 'common/addr';
import axios from 'axios';

export interface UserData {
    Id: number,
    Name: string,
    Email: string,
    Age: number,
    Password: string,
    PermissionId: number
}

interface AuthData {
    token: string | null,
    userData: UserData | null
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
                email: userData.Email,
                password: userData.Password
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
                state.token = action.payload.token,
                    state.userData = action.payload.userData
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'ОШИБКА';
            });
    }
})

export default authSlice.reducer;