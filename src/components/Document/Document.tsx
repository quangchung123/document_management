import React, {useMemo, useState} from 'react';
import {ReactFCWithChildren} from "@/types";
import useFormService from "@/hooks/useFormService";
import {useRouter} from "next/router";
import omit from "lodash.omit";
import {documentApi} from "@/services/api/documentApi";
import useApiService from "@/hooks/useApiService";
import {useSelector} from "react-redux";

const Document:ReactFCWithChildren<{open?:any,close?:any,item:any,routerSearch?: any,visible?:any}> = ({open,close,item,visible=true}) => {
    const {values,setValue} =useFormService();
    const unitID = useSelector((state: any) => state.user.info?.unit_id);
    const {dispatch,callApi} = useApiService();
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const user = useSelector((state: any) => state.user.info);
    const type = useMemo(()=>{
        return (user?.unit_id===1 && router.pathname.includes("admin/document")) ?'all' :(router.pathname.includes("user-document") ?'private':(router.pathname.includes("unit-document")?"unit":"publish"));
    },[user]);
    const isVerify = useMemo(()=>{
        const check = item?.shareds[item?.shareds.length-1] ===undefined ? false:item?.shareds[item?.shareds.length-1].unit_id ===user?.unit_id;
        return  check ;
    },[user,item]);

    const view = useMemo(()=>{
        const isAdmin = user?.unit_id===1 && router.pathname.includes("admin/document");
        const isUserAndCorrectRouter = user?.id === item.user_id && router.pathname.includes("user-document") && parseInt(item.status) ===1;
        return  isAdmin || isUserAndCorrectRouter ;
    },[user,item]);

    const gotToRead = (e:any)=>{
        e.stopPropagation();
        if(open){
            router.push({pathname:"/user/comment-document/",query:{document_id:item.id,file:item.file}},"/user/comment-document/");
        }
    }

    const remove =async (e:any)=>{
        e.stopPropagation();
        setLoading(true);
        const {status,notify}=await callApi(()=>{
            return documentApi.endpoints.removeDocument.initiate({id:item.id});
        })
        notify();
        if(status){
            // @ts-ignore
            await dispatch(documentApi.util.prefetch('getDocument',{type},{force:true}));
        }
        setLoading(false);
    }

    const confirm =async (e:any,s:string) => {
        e.stopPropagation();
        const {status, notify} = await callApi(() =>{
            return documentApi.endpoints?.uploadDocument.initiate({
                ...item,
                status: s
            })
        })
        notify();
        if(status){
            // @ts-ignore
            await dispatch(documentApi.util.prefetch('getDocument',{type},{force:true}));
        }
    }

    const handle = async (e:any)=>{
        e.stopPropagation();
        // @ts-ignore
        setValue("document",{...omit(item,'file'),url:item.file,isVerify});
        open();
    }
    return (
        <button key={item?.id} type={"button"} onClick={gotToRead}  className={`${(item?.user?.unit_id===1 &&  user?.unit_id===1) ?"bg-orange-100":""} lg:w-1/6 md:w-1/4 w-[45%] cursor-pointer border shadow relative ${loading?'animate-pulse':''}`}>
            {visible && (
                <>
                    {(open && (view || (isVerify && item.status !== "2")))  && <button type={"button"} className={"absolute right-0 w-8 z-1"} onClick={handle}>
                        <div className={"bg-primary flex justify-center text-white"}>
                            <i className="bi bi-pencil-square"></i>
                        </div>
                    </button>}
                    {(open && view && user?.unit_id===1)  && <button type={"button"} className={"absolute right-0 w-8 z-1 top-7"} onClick={remove}>
                        <div className={"bg-primary flex justify-center text-white"}>
                            <i className="bi bi-trash"></i>
                        </div>
                    </button>}
                    <div className={"absolute left-0 w-24 z-1"}>
                        <div className={`bg-primary flex justify-center text-white ${item.status ==="1" ?"bg-orange-300":(item.status ==="2"?"bg-primary":"bg--red-500")}`}>
                            {item.status ==="1" ?"Từ chối":(item.status ==="2"?"Phê duyệt":"Đang chờ")}
                        </div>
                    </div>
                    {(isVerify && item.status ==="0") && (
                        <div className={"absolute right-0 w-8 z-1 top-7"} onClick={(e)=>confirm(e,"1")}>
                            <div className={"bg-primary flex justify-center text-white"}>
                                <i className="bi bi-x-circle"></i>
                            </div>
                        </div>
                    )}
                </>
            )}
            <div className="item-options">
                <img alt={item?.name} src={'/pdf.png'} className={"h-30 w-30"}/>
                {open && (
                    <div className={"h-28 pl-3 mt-2 flex flex-col justify-between"}>
                        <h3 className={'text-left text-base text-primary font-semibold tracking-tight overflow-hidden h-14'}>{item?.name}</h3>
                        <hr className={"mr-2"}/>
                        <h3 className={'text-left text-base text-red-500 font-semibold tracking-tight overflow-hidden h-14'}>{item?.user?.name}</h3>
                        <h3 className={'text-left text-base text-red-500 font-semibold tracking-tight overflow-hidden h-14'}>KP: {item?.user?.room}</h3>
                        <h3 className={'text-left text-base text-red-500 font-semibold tracking-tight overflow-hidden h-14'}>CV: {item?.user?.role}</h3>
                        <p className={"text-right mr-2 text-xs text-gray-400 mb-1"}>{item?.date.split("00:00:00")}</p>
                    </div>
                )}
            </div>
        </button>
    );
};

export default Document;
