import React, { useState } from "react";
import { Form, GroupItem, Item, SimpleItem, ButtonItem } from "devextreme-react/form";
import { RequiredRule } from 'devextreme-react/data-grid';
import useApiService from "@/hooks/useApiService";
import {unitStore, userStore} from "@/components/Admin/data";
import get from "lodash.get";
import { adminApi } from "@/services/api/adminApi";
import {cloneObject} from "@/utils";
import isEmpty from "lodash.isempty";
import {validation} from "@/app.config";

interface FormAddUserProps {
    values: any;
    closeModal?:any;
    grid?:any;
}

const FormAddUser: React.FC<FormAddUserProps> = ({ values,closeModal,grid }: FormAddUserProps) => {
    // console.log("values", values);
    const [form, setForm] = useState({ ...values, "unit_id": get(values, 'unit.id') });
    const [validate, setValidate] = useState({});
    const { handleSubmit, callApi } = useApiService();

    const onHandleSubmit = handleSubmit(async (data: any) => {
        const formUpdate = {
            id:"",
            ...form,
        }
        const { status, validate, notify } = await callApi(() => {
            return adminApi.endpoints.updateRoom.initiate(formUpdate);
        });
        setValidate(validate);
        notify();
        if(status){
            closeModal();
            if(grid.current){
                grid.current.instance.refresh();
            }
        }
    });

    const changeForm = (e: any) => {
        setForm(e.component.option("formData"));
    };

    return (
        <form onSubmit={onHandleSubmit} className="popup-property-details">
            <Form formData={form} onFieldDataChanged={changeForm}>
                <SimpleItem dataField="unit_id" helpText={get(validate, 'unit_id.0')} label={{ location: "top", text: "Đơn vị" }} editorType="dxSelectBox"
                            editorOptions={{ dataSource: unitStore, valueExpr: "id", displayExpr: 'name' }}>
                    <RequiredRule message={validation.required}/>
                </SimpleItem>
                <Item dataField="name" helpText={get(validate, 'name.0')} colSpan={2} label={{ location: "top", text: "Tên phòng/ khoa" }} >
                    <RequiredRule message={validation.required}/>
                </Item>
                <GroupItem colSpan={2} colCount={5}>
                    <ButtonItem buttonOptions={{ text: "Lưu", type: "success", useSubmitBehavior: true }} />
                    <ButtonItem buttonOptions={{ text: "Hủy", type: "default", useSubmitBehavior: false,onClick:closeModal }} />
                </GroupItem>
            </Form>
        </form>
    );
};

export default FormAddUser;
