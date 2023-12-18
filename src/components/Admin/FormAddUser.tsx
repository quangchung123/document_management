import React, {useEffect, useMemo, useState} from "react";
import {ButtonItem, Form, GroupItem, Item, SimpleItem} from "devextreme-react/form";
import {RequiredRule} from 'devextreme-react/data-grid';
import useApiService from "@/hooks/useApiService";
import get from "lodash.get";
import {adminApi,} from "@/services/api/adminApi";
import {validation} from "@/app.config";
import {useSelector} from "react-redux";
import {store} from "@/store/makeStore";

interface FormAddUserProps {
    values: any;
    closeModal?: any;
    grid?: any;
}

const FormAddUser: React.FC<FormAddUserProps> = ({values, closeModal, grid}: FormAddUserProps) => {
    const [form, setForm] = useState({...values});
    const [validate, setValidate] = useState({});
    const {handleSubmit, callApi} = useApiService();
    const user = useSelector((state: any) => state.user.info);
    const [count, setCount] = useState(0);
    const onHandleSubmit = handleSubmit(async (data: any) => {
        const formUpdate = {
            ...form,
            user_id: form.id
        }
        const {status, validate, notify} = await callApi(() => {
            if (form.id) {
                return adminApi.endpoints.updateUser.initiate(formUpdate);
            }
            return adminApi.endpoints.createUser.initiate(form);
        });
        setValidate(validate);
        notify();
        if (status) {
            closeModal();
            if (grid.current) {
                grid.current.instance.refresh();
            }
        }
    });

    const changeForm = (e: any) => {
        const newFormData = e.component.option("formData");
        setForm({...form,...newFormData});
    };
    const [units, setUnits] = useState([]);
    const room = useMemo(() => user?.room.filter((item: any) => item?.unit_id === form?.unit_id), [user, form]);
    const onStart = async () => {
        const {data} = await store.dispatch(adminApi.endpoints.show.initiate("unit/show"));
        setUnits(data?.data || [])
    }

    useEffect(() => {
        onStart();
    }, []);

    useEffect(() => {
        if(units.length>0){
            setForm((prevForm: any) => ({
                ...prevForm,
                room_id:"",
            }));
        }
    }, [form.unit_id]);

    return (
        <form onSubmit={onHandleSubmit} className="popup-property-details">
            <Form defaultFormData={form} onFieldDataChanged={changeForm}>
                <Item dataField="name" helpText={get(validate, 'name.0')} colSpan={2}
                      label={{location: "top", text: "Họ và Tên"}}>
                    <RequiredRule message={validation.required}/>
                </Item>
                <Item dataField="email" helpText={get(validate, 'email.0')} colSpan={2}
                      label={{location: "top", text: "Email"}}>
                    <RequiredRule message={validation.required}/>
                </Item>
                <Item dataField="password" helpText={get(validate, 'password.0')} editorOptions={{mode: "password"}}
                      label={{location: "top", text: "Mật Khẩu"}}>
                    <RequiredRule message={validation.required}/>
                </Item>
                <SimpleItem dataField="unit_id" helpText={get(validate, 'unit_id.0')}
                            label={{location: "top", text: "Đơn vị"}} editorType="dxSelectBox"
                            editorOptions={{dataSource: units, valueExpr: "id", displayExpr: 'name'}}>
                    <RequiredRule message={validation.required}/>
                </SimpleItem>
                <Item dataField="room" helpText={get(validate, 'room.0')}
                      label={{location: "top", text: "Phòng / Khoa"}} editorType="dxSelectBox"
                      editorOptions={{dataSource: room, valueExpr: "name", displayExpr: 'name'}}>
                    <RequiredRule message={validation.required}/>
                </Item>
                <Item dataField="role" helpText={get(validate, 'role.0')} colSpan={2}
                      label={{location: "top", text: "Vai trò/ Chức vụ"}}>
                    <RequiredRule message={validation.required}/>
                </Item>
                <GroupItem colSpan={2} colCount={5}>
                    <ButtonItem buttonOptions={{text: "Lưu", type: "success", useSubmitBehavior: true}}/>
                    <ButtonItem
                        buttonOptions={{text: "Hủy", type: "default", useSubmitBehavior: false, onClick: closeModal}}/>
                </GroupItem>
            </Form>
        </form>
    );
};

export default FormAddUser;
