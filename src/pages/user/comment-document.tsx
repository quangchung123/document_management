import WithCommentDocument from "@/components/User/Comment/WithCommentDocument";
import Layout from "@/container/Layout";
import withAuthSync from "@/components/Authenticate/withAuthSync";
import {useRouter} from "next/router";
import {isEmpty} from "@firebase/util";

const CommentDocument = () =>{
    const router = useRouter();

    return(
        <Layout>
            {/*// @ts-ignore*/}
            {!isEmpty(router.query) ? <WithCommentDocument /> : <div className={"flex justify-center items-center"}>
                <img src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" className={"w-full md:w-1/2"}/>
            </div>}
        </Layout>
    )
}
export default withAuthSync(CommentDocument)
