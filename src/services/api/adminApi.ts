import {createApi} from "@reduxjs/toolkit/query";
import {baseQuery} from "@/services/api/base/baseQuery";

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: baseQuery,
    tagTypes: ['UNIT',"LEVEL"],
    refetchOnMountOrArgChange:true,
    endpoints: (builder) => ({
        show: builder.query({
            query(url) {
                return {
                    url: url,
                    method: 'GET',
                };
            },
        }),
        updateUnit: builder.mutation<any,{id:number,name:string}>({
            query(body) {
                return {
                    url: 'unit/update',
                    method: 'POST',
                    body
                };
            },
        }),
        updateLevel: builder.mutation<any,{id:number,name:string}>({
            query(body) {
                return {
                    url: 'level/update',
                    method: 'POST',
                    body
                };
            },
        }),
        updateRoom: builder.mutation<any,{id:number,name:string}>({
            query(body) {
                return {
                    url: 'room/update',
                    method: 'POST',
                    body
                };
            },
        }),
        removeRoom: builder.mutation<any,{id:number}>({
            query(body) {
                return {
                    url: 'room/remove',
                    method: 'POST',
                    body
                };
            },
        }),
        updateUser: builder.mutation<any,{id:number,name:string}>({
            query(body) {
                return {
                    url: 'user/update',
                    method: 'POST',
                    body
                };
            },
        }),
        removeUser: builder.mutation<any,{id:number}>({
            query(body) {
                return {
                    url: 'user/remove',
                    method: 'POST',
                    body
                };
            },
        }),
        createUser: builder.mutation<any,{name:string,email:string,password:string,unit_id:number}>({
            query(body) {
                return {
                    url: 'user/register',
                    method: 'POST',
                    body
                };
            },
        }),
    }),
});

