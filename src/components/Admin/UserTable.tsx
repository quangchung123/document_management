import React, {useMemo, useRef, useState} from 'react';
import 'devextreme/data/odata/store';
import {Column, DataGrid, Editing, Lookup, Popup, Scrolling} from 'devextreme-react/data-grid';
import {Form, Item} from 'devextreme-react/form';
import {texts} from "@/app.config";
import {unitStore, userStore} from "@/components/Admin/data";
import get from "lodash.get";
import {Button} from "devextreme-react";
import MyPopup from "@/components/UI/MyPopup";
import FormAddUser from "@/components/Admin/FormAddUser";
import {toast} from "react-toastify";

const BUpload = (props: any) => {
    return (
        <Button
            {...props}
            icon="plus"
            type={"success"}
            className={" my-1 p-10"}
        />
    );
};
const BUpdate = (props: any) => {
    return (
        <Button
            {...props}
            icon="edit"
            type={"default"}
            className={" my-1 p-10"}
        />
    );
};
const BRemove = ({data}: any) => {
    const onRemove = ()=>{
        if(data.unit_id ===1){
            toast.info("Bạn không thể xóa tài khoản này");
        }
    }
    return (
        <Button
            onClick={onRemove}
            icon="trash"
            type={"default"}
            className={" my-1 p-10"}
        />
    );
};

const UserTable = () => {
    const [changes, setChanges] = useState<any>([]);
    const validate = useMemo(() => get(changes, '0.data.data.validate'), [changes]);
    const ref = useRef();
    const grid: any = useRef();
    const refUpdate = useRef();
    const PopupUpdate = (valueOfRow: any) => {
        return (
            <MyPopup ref={refUpdate} button={BUpdate}>
                <FormAddUser values={valueOfRow.row.data} grid={grid}/>
            </MyPopup>
        )
    }
    return (
        <div className="relative">
            <MyPopup ref={ref} button={BUpload}>
                <FormAddUser values={{}} grid={grid}/>
            </MyPopup>
            <DataGrid
                ref={grid}
                key={"id"}
                dataSource={userStore}
                showRowLines={true}
                showBorders={true}
                repaintChangesOnly={true}
                width="100%"
                height={600}
                remoteOperations={true}
            >
                <Scrolling mode="virtual"/>
                <Editing
                    mode="popup"
                    useIcons={true}
                    allowAdding={false}
                    allowDeleting={false}
                    allowUpdating={false}
                    texts={texts}
                >
                    <Popup title="Cập nhật nhân viên" showTitle={true} maxWidth={500} height={500}>
                    </Popup>
                    <Form>
                        <Item itemType="group" colCount={2} colSpan={2}>
                            <Item helpText={get(validate, 'name.0')} dataField="name" caption={"Họ tên"} colSpan={2}
                                  label={{location: "top"}}/>
                            <Item helpText={get(validate, 'email.0')} dataField="email" caption={"Email"} colSpan={2}
                                  label={{location: "top"}}/>
                            <Item helpText={get(validate, 'password.0')} dataField="password" caption={"Mật khẩu"}
                                  editorOptions={{mode: "password"}}
                                  colSpan={2} label={{location: "top"}}/>
                            <Item helpText={get(validate, 'unit_id.0')} dataField="unit.id" caption={"Đơn vị"}
                                  colSpan={2} label={{location: "top"}}/>
                        </Item>
                    </Form>
                </Editing>
                <Column dataField="name" caption={"Họ tên"}>
                </Column>
                <Column dataField="email" caption={"Email"}>
                </Column>
                <Column dataField="password" caption={"Mật khẩu"}/>
                <Column dataField="room" caption={"Phòng / Khoa"}/>
                <Column dataField="role" caption={"Vai trò/ Chức vụ"}/>
                <Column dataField="unit.id" caption={"Đơn vị"}>
                    <Lookup dataSource={unitStore} allowClearing={true} valueExpr="id" displayExpr="name"/>
                </Column>
                <Column dataField="action" caption={""} cellRender={(valueOfRow)=>{
                    return (
                        <MyPopup ref={refUpdate} button={BUpdate}>
                            <FormAddUser values={valueOfRow.row.data} grid={grid}/>
                        </MyPopup>
                    )
                }} width={50}>
                </Column>
            </DataGrid>
        </div>
    );
};

export default UserTable;

