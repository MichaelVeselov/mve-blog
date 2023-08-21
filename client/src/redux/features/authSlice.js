import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/axios';
import { getRandomAvatar } from '../../utils/avatar';

const setTokens = (data) => {
  if (data.accessToken) {
    window.localStorage.setItem('accessToken', data.accessToken);
  }

  if (data.refreshToken) {
    window.localStorage.setItem('refreshToken', data.refreshToken);
  }

  if (data.expiresIn) {
    const expiresDate = new Date().getTime() + data.expiresIn * 1000;
    window.localStorage.setItem('expires', expiresDate);
  }
};

export const registerUser = createAsyncThunk(
  '@@auth/registerUser',
  async (userData) => {
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      avatarUrl: getRandomAvatar(),
    };

    try {
      const { data } = await axios.post('/auth/register', newUser);
      setTokens(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  '@@auth/loginUser',
  async (loginData) => {
    const { email, password } = loginData;
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });
      setTokens(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProfile = createAsyncThunk('@@auth/getProfile', async () => {
  try {
    const { data } = await axios.get('/auth/profile');
    setTokens(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: '@@auth',
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userData;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userData;
      })
      .addCase(getProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.userData;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logOut } = authSlice.actions;

export const selectIsAuth = (state) => Boolean(state.auth.user);
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
