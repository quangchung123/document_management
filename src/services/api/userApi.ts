import {createApi} from "@reduxjs/toolkit/query";
import {baseQuery} from "@/services/api/base/baseQuery";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    tagTypes: ['USER'],
    endpoints: (builder) => ({
        getDetail: builder.mutation({
            query() {
                return {
                    url: 'user',
                    method: 'GET',
                };
            },
        }),
    }),
});


