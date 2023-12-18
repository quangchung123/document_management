import {createSlice} from '@reduxjs/toolkit';
import {authApi} from "@/services/api/authApi";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints?.login.matchFulfilled, (state) => {
                state.error = null;
            })
    },
});

export default authSlice.reducer;
