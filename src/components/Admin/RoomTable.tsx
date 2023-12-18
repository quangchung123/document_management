import React, {useRef} from 'react';

import 'devextreme/data/odata/store';
import {Column, DataGrid, Editing, Lookup, RequiredRule, Scrolling,} from 'devextreme-react/data-grid';
import {texts, validation} from "@/app.config";
import {roomStore, unitStore} from "@/components/Admin/data";
import {Button} from "devextreme-react";
import MyPopup from "@/components/UI/MyPopup";
import FormAddUser from "@/components/Admin/FormAddUser";
import FormAddRoom from "@/components/Admin/FormAddRoom";
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

const RoomTable = () => {
    const ref = useRef();
    const grid: any = useRef();
    return (
        <div className="relative">
            <MyPopup ref={ref} button={BUpload}>
                <FormAddRoom values={{}} grid={grid}/>
            </MyPopup>
            <DataGrid
                dataSource={roomStore}
                showRowLines={true}
                showBorders={true}
                width="100%"
                height={600}
                remoteOperations={true}
            >
                <Scrolling mode="virtual"/>
                <Editing
                    mode="row"
                    useIcons={true}
                    allowAdding={false}
                    allowDeleting={true}
                    allowUpdating={true}
                    texts={texts}
                />
                <Column dataField="unit.id" caption={"Đơn vị"}>
                    <Lookup dataSource={unitStore} allowClearing={true} valueExpr="id" displayExpr="name"/>
                </Column>
                <Column dataField="name" caption={"Tên"}>
                    <RequiredRule message={validation.required}/>
                </Column>
            </DataGrid>
        </div>
    );
};


export default RoomTable;
