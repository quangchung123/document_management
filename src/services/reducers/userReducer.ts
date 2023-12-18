import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {authApi} from "@/services/api/authApi";
import {userApi} from "@/services/api/userApi";

interface IUserState {
    info:any,
    token:string,
}

const initialState: IUserState = {
    info: null,
    token: '',
};
export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(authApi.endpoints.login.matchFulfilled,userApi.endpoints.getDetail.matchFulfilled), (state: any, action: any) => {
            state.token = action.payload.data?.access_token || localStorage.getItem("token");
            localStorage.setItem("token",state.token)
            state.info =action.payload.data?.data || action.payload;
        });
    }
});
export const {logout} = userSlice.actions;
export default userSlice.reducer;

