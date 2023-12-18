import CommentInput from "@/components/User/Comment/CommentInput";
import ImportComment from "@/components/User/Comment/ImportComment";
import {Viewer, Worker} from '@react-pdf-viewer/core';
import {useRouter} from "next/router";

const WithCommentDocument = () => {
    const router = useRouter();
    return (
        <div className={"overflow-hidden"}>
            <div className={"grid lg:grid-cols-2 h-4/5"}>
                <div className="h-[800px]">
                    <div className={"h-[800px] overflow-hidden"}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={`${router.query?.file}`}
                                defaultScale={1}
                            />
                        </Worker>
                    </div>
                </div>
                <div className={"h-[800px] overflow-auto ml-5"}>
                    <ImportComment/>
                    <CommentInput/>
                </div>
            </div>
        </div>
    )
}
export default WithCommentDocument
