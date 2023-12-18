import React, {useMemo, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm, useWatch} from "react-hook-form";
import {
    commentApi,
    useDeleteCommentMutation,
    useEditCommentMutation,
    useGetCommentQuery
} from "@/services/api/commentApi";
import get from "lodash.get";
import {useDispatch, useSelector} from "react-redux";
import {LoadPanel} from "devextreme-react";
import {useRouter} from "next/router";

const CommentInput = (props: any) => {
    const router = useRouter();
    const {data,isLoading} = useGetCommentQuery({document_id:router.query.document_id},{skip:!router.query?.document_id});
    const info = useSelector((state: any) => state.user.info);
    const dispatch = useDispatch();
    const commentList = useMemo(() => get(data, "data.data") || [], [data]);
    const {
        getValues, handleSubmit,
        register, reset, control, setValue
    }
        = useForm();
    const value = useWatch({control});
    const [editingIndex, setEditingIndex] = useState(-1);
    const [deleteCommentMutation] = useDeleteCommentMutation();
    const [editCommentMutation] = useEditCommentMutation();

    const handleEditClick = async (index: any, isEdit: boolean, comment?: any) => {
        if (isEdit) {
            setValue("editComment", comment.message);
            setEditingIndex(index);
        } else {
            await editCommentMutation({
                id: comment.id,
                message: getValues("editComment"),
                document_id:router.query.document_id
            });
            // @ts-ignore
            await dispatch(commentApi.util?.prefetch("getComment", {document_id:router.query.document_id}, {force: true}));
            setEditingIndex(-1);
        }
    }
    const notify = () => toast.success("Xóa Thành Công");
    const handleDeleteComment = async (comment: any) => {
        await deleteCommentMutation({
            id: comment.id
        });
        // @ts-ignore
        await dispatch(commentApi.util?.prefetch("getComment", {document_id:router.query.document_id}, {force: true}));
        notify();
    }
    return (
        <div>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                visible={isLoading}
                showIndicator={true}
                shading={true}
                showPane={false}
            />
            {commentList.map((comment: any, index: number) => (
                <div className="mt-4" key={index}>
                    <div className="bg-gray-200 p-3 mb-2 rounded-lg">
                        <div className="flex flex-col">
                            <span
                                className="text-blue-700 uppercase">{comment.user === null ? "Tài khoản ẩn danh" : comment.user.name}</span>
                            <hr className={"bg-white !h-[1px] border-white"}/>
                            <div>
                                {editingIndex === index && (
                                    <textarea rows={3}
                                              className={`${editingIndex === index ? 'border border-primary rounded-lg w-full' : 'border-none'} focus:outline-none px-2`}
                                              {...register('editComment')}
                                    >
                                    </textarea>
                                )}
                                {editingIndex !== index && (
                                    <p
                                        className={`${editingIndex == index ? 'border border-primary rounded-lg ' : 'border-none'} focus:outline-none`}
                                    >
                                        {comment.message}
                                    </p>
                                )}
                            </div>
                            <div className={"flex justify-end space-x-4 items-center"}>
                                <span className="text-blue-700 font-light text-[12px]">{comment.created_at}</span>
                                {info?.id === comment?.user?.id && (
                                    <div className="flex justify-end space-x-1.5">
                                        <button type={"button"}
                                                className="hover:bg-red-600"
                                                onClick={() => handleEditClick(index, editingIndex !== index, comment)}
                                        >
                                            {editingIndex === index ? <i className="bi bi-floppy"></i> :
                                                <i className="bi bi-pencil-square"></i>}
                                        </button>
                                        <button type={"button"}
                                                className="hover:bg-red-600"
                                                onClick={() => handleDeleteComment(comment)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentInput;
