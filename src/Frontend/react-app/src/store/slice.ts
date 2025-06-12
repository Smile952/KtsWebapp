import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { synchronizeToken } from '../common/synchronizeToken';
import { RootState } from 'store';

interface AuthState {
    token: string | null;
    role: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    role: null,
    isLoading: false,
    error: null
};

export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
        try {
            const isValid = await synchronizeToken();
            if (!isValid) throw new Error('Invalid token');

            return {
                token: localStorage.getItem('token'),
                role: localStorage.getItem('role')
            };
        } catch (error) {
            return rejectWithValue('Token verification failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.isLoading = false;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
                state.token = null;
                state.role = null;
            });
    }
});

export const selectAuth = (state: RootState) => state.apiRequest;
export default authSlice.reducer;