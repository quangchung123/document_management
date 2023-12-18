import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "@/services/api/base/baseQuery";

export const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getDocument: build.query({
            query: (body) => ({
                url: 'document/show',
                method: 'GET',
                body
            }),
            serializeQueryArgs:({queryArgs})=>{
                return queryArgs.type;
            },
            forceRefetch: ({currentArg,previousArg})=> {
                return currentArg !== previousArg;
            }
        }),
        search: build.query({
            query: (data) => ({
                url: 'document/search',
                method: 'GET',
                body:data
            }),
            serializeQueryArgs:({queryArgs})=>{
                return queryArgs.type;
            },
            forceRefetch: ({currentArg,previousArg})=> {
                return currentArg !== previousArg;
            }
        }),
        uploadDocument: build.mutation({
            query: (data) => {
                return {
                    url: 'document/upload',
                    method: 'POST',
                    body:data,
                }
            }
        }),
        removeDocument: build.mutation({
            query: (data) => {
                return {
                    url: 'document/remove',
                    method: 'POST',
                    body:data,
                }
            }
        }),
        verifyDocument: build.mutation({
            query: (data) => {
                return {
                    url: 'document/change-status',
                    method: 'POST',
                    body:data,
                }
            }
        }),
        publishDocument: build.mutation({
            query: (data) => {
                return {
                    url: 'document/change-private',
                    method: 'POST',
                    body:data,
                }
            }
        })
    })
})
export const {useGetDocumentQuery,} = documentApi;
export const {useUploadDocumentMutation} = documentApi
