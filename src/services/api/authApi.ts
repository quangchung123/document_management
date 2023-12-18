import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "@/services/api/base/baseQuery";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});
export const { useLoginMutation } = authApi;
