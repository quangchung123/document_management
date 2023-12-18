import React, {useEffect, useState} from 'react';
import {store} from "@/store/makeStore";
import {NextPage} from "next";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {userApi} from "@/services/api/userApi";


/*
* Use with router which need authenticate before that router
* */
const withAuthSync = (WrappedComponent: NextPage) => {
    const wrapper = (props: any) => {
        // eslint-disable-next-line
        const [isWait,setIsWait] = useState(false);
        // eslint-disable-next-line
        const token = useSelector((state:any)=>state.user.token);
        // eslint-disable-next-line
        const router = useRouter();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            // if (!localStorage.getItem("token")) {
            //     router.push("/authenticate/login");
            // } else {
            //     if (!token && !isWait) {
            //         store.dispatch(userApi.endpoints.getDetail.initiate(""));
            //         setIsWait(true);
            //     }
            //     if (router.pathname.includes("auth")) {
            //         router.push("/authenticate/login");
            //     }
            // }
        }, [token]);
        // if(!isWait) return null;
        return <WrappedComponent {...props} />;
    };

    return wrapper;
};

export default withAuthSync;
