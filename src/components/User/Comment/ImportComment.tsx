import {useDispatch} from "react-redux";
import {commentApi, useAddCommentMutation} from "@/services/api/commentApi";
import {useState} from "react";
import {toast} from "react-toastify";
import isEmpty from 'lodash.isempty'
import {useRouter} from "next/router";

const ImportComment = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [addCommentMutation,{isLoading}] = useAddCommentMutation();
    const onHandleAddComment = async (data: any) => {
        // @ts-ignore
        if(!isEmpty(comment)){
            try {
                await addCommentMutation({
                    message: comment,
                    document_id:router.query.document_id
                });
                setComment("");
                // @ts-ignore
                dispatch(commentApi.util?.prefetch('getComment',{document_id:router.query.document_id},{force:true}))
            } catch (error) {
                console.error("Error adding comment", error);
            }
        }else{
            toast.info('Vui lòng nhập thông tin trước khi gửi.')
        }
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg">
            <form>
                <div className="mb-4">
          <textarea
              placeholder="Nhập bình luận"
              rows={4}
              cols={50}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              value = {comment}
              onChange={(e) => setComment(e.target.value)}
          />
                </div>
                <div className="flex justify-end">
                    <button
                        disabled={isLoading}
                        type="button"
                        className="bg-secondary text-white px-4 py-2 mr-2 rounded-lg hover:bg-emerald-600"
                        onClick={onHandleAddComment}
                    >
                        Gửi
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ImportComment;
