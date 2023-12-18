import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {documentApi, useGetDocumentQuery} from "@/services/api/documentApi";
import get from "lodash.get";
import Document from "@/components/Document/Document";
import {Button, LoadPanel, SelectBox} from "devextreme-react";
import {InputField} from "@/Fields/InputField";
import FormUpload from "@/components/Document/FormUpload";
import useFormService from "@/hooks/useFormService";
import useApiService from "@/hooks/useApiService";
import {cloneObject} from "@/utils";
import MyPopup from "@/components/UI/MyPopup";
import {selectOptionSearch} from "@/app.config";
import {useRouter} from "next/router";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";

const MapDocument = () => {
    const router = useRouter();
    const user = useSelector((state: any) => state.user.info);
    const type = useMemo(()=>{
        return (user?.unit_id===1 && router.pathname.includes("admin/document")) ?'all' :(router.pathname.includes("user-document") ?'private':(router.pathname.includes("unit-document")?"unit":"publish"));
    },[user]);
    const {data, isLoading,refetch} =useGetDocumentQuery({type});
    const [nameSelect,setNameSelect] = useState("title");
    const {values,setValue} =useFormService();
    const {callApi,handleSubmit,} = useApiService();
    const documents = useMemo(() => get(data, "data.data") ? get(data, "data.data") : [], [data]);
    const ref = useRef<{openModal:any,closeModal:any}>();
    const [popupVisible,setPopupVisible] = useState(false);
    const [filter,setFilter] = useState<any>(selectOptionSearch);
    const search =async (payload:any)=>{
        const {status,data} =await callApi(()=> {
            let item =cloneObject(payload);
            const add = (user?.unit_id===1 && router.pathname.includes("admin/document")) ?{}:{
                private:router.pathname.includes("user-document") ?1:0
            }
            const key = nameSelect.includes("status")?"status":nameSelect;
            if (nameSelect.includes("status")){
                item.status = nameSelect.split("_")[1];
            }
            return documentApi.endpoints.search.initiate({[key]:item[key],...add,type});
        });
    };
    const handlePopupHidden = () => {
        if(ref.current){
            ref.current.closeModal();
        }
        setValue("document",{});
    }

    const handlePopupVisible = () => {
       if(ref.current){
           ref.current.openModal();
       }
    }
    const BUpload = (props:any) => {
        const {values,setValue} =useFormService();
        const onClick = ()=>{
            setValue("document",{});
            props.onClick();
        }
        return (
            <Button
                {...props}
                onClick={onClick}
                icon="upload"
                type={"success"}
                className={"mx-3 my-1 p-10"}
            />
        );
    };
    useEffect(() => {
        if (user && user?.unit_id !==4 && filter.length ==3){
            const data = [
                {
                    id:  "status_0",
                    label: "Đang chờ",
                },
                {
                    id:  "status_2",
                    label: "Phê duyệt",
                }
            ];
            if(user?.unit_id ===1){
                data.push({
                    id:  "status_1",
                    label: "Từ chối",
                })
            }
            setFilter([
                ...filter,
                ...((user?.unit_id ===1 && router.pathname.includes("admin/document")) ?[
                    {
                        id:  "group",
                        label: "Khoa / phòng",
                    },
                    ...data,
                ]:data)
            ])
        }
    }, [user]);

    return (
        <>
            <div className={"mb-5 flex justify-between"}>
                <div className={"flex row space-x-2"}>
                    <SelectBox
                        className={"!rounded-md bg-primary !h-[38px]"}
                        value={nameSelect}
                        dataSource={filter}
                        displayExpr="label"
                        valueExpr="id"
                        width={150}
                        onValueChanged={(e) => {
                            setNameSelect(e.value);
                        }}
                    />
                    {!nameSelect.includes("status") && <InputField name={nameSelect} placeholder={"Tìm kiếm"} className={"search w-[270px]"} />}
                    {/*// @ts-ignore*/}
                    <Button onClick={handleSubmit(search)} type={"default"} text={"Tìm"} className={"!rounded-md bg-primary !h-[38px]"} />
                    <Button onClick={()=>{
                        refetch();
                        setNameSelect("title");
                    }} type={"default"} icon={"refresh"} className={"!rounded-md bg-primary !h-[38px]"} />
                </div>
                <MyPopup ref={ref} button={(router.pathname.includes("user-document") || router.pathname.includes("admin/document")) ? BUpload :()=><div></div>}>
                    <FormUpload values={values}/>
                </MyPopup>
            </div>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                visible={isLoading}
                showIndicator={true}
                shading={true}
                showPane={false}
            />
            <div className="flex flex-wrap gap-5">
                {
                    [...documents.filter((item:any)=>item.level_id ===1),...documents.filter((item:any)=>item.level_id ===2)].map((item:any) => {
                        return (
                            <Document
                                key={item.id}
                                open={handlePopupVisible}
                                close={handlePopupHidden}
                                item={item}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default MapDocument;
