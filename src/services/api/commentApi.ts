import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "@/services/api/base/baseQuery";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (body) => ({
                url: `comment/send-message`,
                method: 'POST',
                body
            }),
        }),
        getComment: builder.query({
            query: (body) => {
                return {
                    url: 'comment/get-comment-by-document',
                    method: 'GET',
                    body
                }
            },
            // serializeQueryArgs:(endpoint)=>endpoint
        }),
        deleteComment: builder.mutation({
            query: (body) => ({
                url: `comment/delete-message`,
                method: 'POST',
                body
            }),
        }),
        editComment: builder.mutation({
            query:(body) => ({
                url: `comment/update-message`,
                method: 'POST',
                body
            }),
        }),
    }),
});

export const { useAddCommentMutation } = commentApi;
export const { useGetCommentQuery } = commentApi;
export const { useDeleteCommentMutation} = commentApi;
export const {useEditCommentMutation} = commentApi;
