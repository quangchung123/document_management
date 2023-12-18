import React, {useMemo, useState} from 'react';
import Form, {ButtonItem, GroupItem, Item, SimpleItem} from 'devextreme-react/form';
import {levelStore, unitStore} from "@/components/Admin/data";
import {RequiredRule} from "devextreme-react/data-grid";
import useApiService from "@/hooks/useApiService";
import {documentApi} from "@/services/api/documentApi";
import storage from "@/services/firebase/storage";
import {generateRandomString} from "@/utils";
import get from "lodash.get";
import Document from "@/components/Document/Document";
import {useSelector} from "react-redux";
import {useRouter} from 'next/router';
import pick from "lodash.pick";
import isEmpty from "lodash.isempty";
import {statusVerify} from "@/app.config";

const FormUpload = ({values, closeModal}: any) => {
    const [form, setForm] = useState(values['document']);
    const {callApi, dispatch} = useApiService();
    const [units, setUnit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isHideForm, setIsHideForm] = useState(false);
    const user = useSelector((state: any) => state.user.info);
    const idUser = useMemo(() => user.unit_id, [user]);
    const isHideItem = (idUser === 4);
    const router = useRouter();
    const type = useMemo(()=>{
        return (user?.unit_id===1 && router.pathname.includes("admin/document")) ?'all' :(router.pathname.includes("user-document") ?'private':(router.pathname.includes("unit-document")?"unit":"publish"));
    },[user]);
    const submit = async (e: any) => {
        e.preventDefault();
        if(isVerify){
            nextVerify("2")
        }
        else{
            setLoading(true);
            let url = "";
            if (get(form, 'file.0')) {
                url = await storage.putFile(get(form, 'file.0'), `file/${generateRandomString(20)}.pdf`);
                // @ts-ignore
            }
            const {status, notify} = await callApi(() => documentApi.endpoints.uploadDocument.initiate(
                {
                    private: 1,
                    ...form,
                    file: form.url ? form.url : url,
                }));
            notify();
            if (status) {
                // @ts-ignore
                dispatch(documentApi.util.prefetch('getDocument', {type}, {force: true}));
                closeModal();
            }
            ;
            setLoading(false);
        }
    };
    const changeForm = (e: any) => {
        const updateForm = e.component.option("formData");
        updateForm.date = `${new Date(updateForm.date).toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })} 00:00:00`
        setForm(e.component.option("formData"));
    }
    const verifyDocument = async (e: any) => {
        e.preventDefault();
        if (isHideForm === false) {
            setIsHideForm(!isHideForm);
        } else {
            const {status, notify} = await callApi(() => documentApi.endpoints.verifyDocument.initiate({
                ...pick(form, ['unit_id']),
                document_id: form.id
            }));
            notify();
            if (status) {
                // @ts-ignore
                dispatch(documentApi.util.prefetch('getDocument', {type}, {force: true}));
                closeModal();
            }
        }
    };

    const nextVerify = async (s:string) => {
        setLoading(true);
        const {status, notify} = await callApi(() => documentApi.endpoints.uploadDocument.initiate(
            {
                ...form,
                file: values['document'].url,
                status:s
            }));
        notify();
        if (status) {
            // @ts-ignore
            dispatch(documentApi.util.prefetch('getDocument', {type}, {force: true}));
            closeModal();
        };
        setLoading(false);
    };

    const publishDocument = async (e: any) => {
        setLoading(true);
        const {status, notify} = await callApi(() => documentApi.endpoints.publishDocument.initiate({
            document_id: form.id,
            private:form.private ===1 ? 0:1
        }));
        notify();
        if (status) {
            // @ts-ignore
            dispatch(documentApi.util.prefetch('getDocument', {type}, {force: true}));
            closeModal();
        }
        setLoading(false);
    };
    const nextShare = async () => {
        setLoading(true);
        // @ts-ignore
        let {data} = await unitStore.load();
        setUnit(data);
        const value = values['document']["shareds"].map((item:any)=>item.unit_id);
        if (!isEmpty(value)) {
            setForm({
                ...form,
                unit_id:value
            });
        }
        setIsHideForm(!isHideForm);
        setLoading(false);
    };

    const shareds = useMemo(()=>{
        return  (get(values,'document.shareds') || []).find((item:any)=>item.unit_id === user?.unit_id+1);
    },[user,values]);

    const isVerify = useMemo(()=>{
        const check =user?.unit_id ===1 ?false: get(values,'document.isVerify');
        return  check ;
    },[user,values]);
    return (
        <form onSubmit={isHideForm === true ? verifyDocument : submit} className="popup-property-details">
            {(shareds && user?.unit_id !==4) &&  <div className={"text-primary"}>Ghi chú: <span className={"text-red-400"}>{shareds.note}</span></div>}
            <Form
                formData={form}
                onFieldDataChanged={changeForm}
            >
                {!isHideForm && (
                    !isVerify ? <GroupItem>
                        <Item dataField="name" caption={"Tên văn thư"} colSpan={2}
                              label={{location: "top", text: "Tên văn thư"}}>
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </Item>
                        <Item dataField="summary" label={{location: "top", text: "Trích dẫn/ Tóm tắt"}}
                              editorType={"dxTextArea"} colSpan={2} editorOptions={{height: 80}}>
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </Item>
                        {(!form.id || (form?.id && (user?.unit_id !==1 && user?.unit_id === get(values,'document.user.unit_id')))) && (
                            <Item dataField="note" caption={"Ghi chú"} colSpan={2}
                                  label={{location: "top", text: "Ghi chú"}}>
                                <RequiredRule message={"Trường này là bắt buộc"}/>
                            </Item>
                        )}
                        <SimpleItem dataField="level_id" label={{location: "top", text: "Mức độ"}}
                                    editorType="dxSelectBox"
                                    editorOptions={{dataSource: levelStore, valueExpr: "id", displayExpr: 'name'}}
                        >
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </SimpleItem>
                        <Item dataField="code" label={{location: "top", text: "Số hiệu"}}>
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </Item>
                        <SimpleItem dataField="date" label={{location: "top", text: "Thời gian"}} editorType="dxDateBox"
                                    editorOptions={{
                                        displayFormat: "yyyy-MM-dd",
                                        type: "date"
                                    }}
                        >
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </SimpleItem>
                        {user?.unit_id ===1 && (
                            <SimpleItem dataField="status" label={{location: "top", text: "Trạng thái"}}
                                        editorType="dxSelectBox"
                                        editorOptions={{dataSource: statusVerify, valueExpr: "id", displayExpr: 'name'}}
                            >
                                <RequiredRule message={"Trường này là bắt buộc"}/>
                            </SimpleItem>
                        )}
                        <GroupItem colCount={2}>
                            <SimpleItem dataField="file" label={{location: "top", text: "Văn thư"}}
                                        editorType="dxFileUploader"
                                        editorOptions={{
                                            selectButtonText: form?.url ? "Cập nhật văn thư" : "Chọn văn thư",
                                            accept: "/pdf",
                                            uploadMode: "useForm"
                                        }}
                            >
                                {!form?.url && <RequiredRule message={"Trường này là bắt buộc"}/>}
                            </SimpleItem>
                        </GroupItem>
                        {form?.url && (
                            <SimpleItem dataField="url" label={{location: "top", text: "Ảnh", visible: false}}>
                                <Document item={form} visible={false}/>
                            </SimpleItem>
                        )}
                    </GroupItem> :
                    <GroupItem>
                        <Item dataField="note" caption={"Ghi chú"} colSpan={2}
                              label={{location: "top", text: "Ghi chú"}}>
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </Item>
                        {form?.url && (
                            <SimpleItem dataField="url" label={{location: "top", text: "Ảnh", visible: false}}>
                                <Document item={form} visible={false}/>
                            </SimpleItem>
                        )}
                    </GroupItem>
                )}
                {!isHideItem && isHideForm && (
                    <GroupItem>
                        <SimpleItem dataField="unit_id" label={{location: "top", text: "Chọn đơn vị"}}
                                    editorType="dxTagBox"
                                    editorOptions={{dataSource: units, valueExpr: "id", displayExpr: 'name'}}
                        >
                            <RequiredRule message={"Trường này là bắt buộc"}/>
                        </SimpleItem>
                    </GroupItem>
                )}
                <GroupItem colSpan={2} colCount={5}>
                    {!isVerify && (
                        <ButtonItem horizontalAlignment="left"
                                    buttonOptions={
                                        !isHideForm ? {
                                            disabled: loading,
                                            text: loading ? 'Đang gửi' : (form?.url ? 'Cập nhật' : 'Gửi công văn'),
                                            type: 'success',
                                            useSubmitBehavior: true,
                                        } : {
                                            text: "Quay lại",
                                            disabled: loading,
                                            useSubmitBehavior: false,
                                            onClick: () => setIsHideForm(!isHideForm)
                                        }}
                        />
                    )}

                    {isVerify && (
                        <ButtonItem horizontalAlignment="left"
                                    buttonOptions={{
                                        disabled: loading,
                                        text: loading ? 'Đang gửi' : "Duyệt",
                                        type: 'danger',
                                        useSubmitBehavior: true,
                                    }}
                        />
                    )}

                    {(user?.unit_id ===1 && !isHideForm && form?.id) && (
                        <ButtonItem horizontalAlignment="left"
                                    buttonOptions={{
                                        disabled: loading,
                                        text: loading ? 'Đang gửi' :(form.private===1?"Công khai": "Riêng tư"),
                                        type: 'danger',
                                        useSubmitBehavior: false,
                                        onClick:publishDocument
                                    }}
                        />
                    )}
                    {(form?.url && user?.unit_id < 4 && !isVerify) && (
                        <ButtonItem horizontalAlignment="left"
                                    buttonOptions={isHideForm === true ? {
                                        disabled: loading,
                                        text: 'Duyệt',
                                        type: 'default',
                                        useSubmitBehavior: true,
                                    } : {
                                        text: "Chia sẻ",
                                        useSubmitBehavior: false,
                                        type: 'info',
                                        onClick: nextShare
                                    }}
                        />
                    )}
                </GroupItem>
            </Form>
        </form>
    );
};

export default FormUpload;
