import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "@/services/reducers/userReducer";
import {userApi} from "@/services/api/userApi";
import {authSlice} from "@/services/reducers/accountReducer";
import {urlFileSlice} from "@/services/reducers/urlFileReducer";
import {commentApi} from "@/services/api/commentApi";
import {documentApi} from "@/services/api/documentApi";
import {adminApi} from "@/services/api/adminApi";
import {authApi} from "@/services/api/authApi";

// @ts-ignore
export const makeStore = () => configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [authSlice.name]: authSlice.reducer,
        [urlFileSlice.name]:urlFileSlice.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [documentApi.reducerPath]: documentApi.reducer
    },
    devTools: true,
    // @ts-ignore
    middleware: (gDM) => gDM().concat(userApi.middleware, commentApi.middleware, documentApi.middleware,adminApi.middleware,authApi.middleware),
});
export const store = makeStore();
