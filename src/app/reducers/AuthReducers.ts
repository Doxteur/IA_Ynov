import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '@/components/services/types/user';
import { Profile } from '@/components/services/types/user';
import { REACT_APP_API_URL } from '../../config';


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Une erreur inconnue est survenue');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; password: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/register`, userData);
      return response.data as Object;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Une erreur inconnue est survenue');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as User & { profile: Profile } | null,
    token: null as string | null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User & { profile: Profile }, token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, token } = action.payload as { user: User & { profile: Profile }, token: string };
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
