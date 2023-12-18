import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {baseUrlApi} from "@/app.config";

export const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api) => {
    // @ts-ignore
    const {method, url, body,params} = args;
    let request = JSON.stringify(body);
    if(params?.isFormData){
        request = body;
    }
    // @ts-ignore
    const token = api.getState().user.token || localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "69420");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", `application/json`);
    if (token !== null) {
        myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var requestOptions = {
        method,
        headers: myHeaders,
        ...(method ==='GET'?{}:{ body:request}),
        redirect: 'follow',
    };
    const a = (method ==='GET' && body) ?`?${new URLSearchParams(body).toString()}`:"";
    //@ts-ignore
    const result = await fetch(`${baseUrlApi}/${url}${a}`, {...requestOptions});
    if (result.status === 401) {
        // api.dispatch(setCredentials({access_token: ""}));
    }
    let data = await result.json();
    return {data,meta:data,}
}
