import {useRouter} from "next/router";
import {useEffect} from "react";


export default function Home() {
    const router = useRouter();
    const nextPage = ()=>{
        router.push("/user/user-document")
    }
    // const authLogin =() =>{
    //     router.push("/auth/login")
    // }
    const nextPageComment =() => {
        router.push("/user/comment-document")
    }
    useEffect(() => {
        router.push("/authenticate/login")
    }, []);
    return null
}
