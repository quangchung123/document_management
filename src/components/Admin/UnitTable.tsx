import React from 'react';

import 'devextreme/data/odata/store';
import {Column, DataGrid, Editing, RequiredRule, Scrolling,} from 'devextreme-react/data-grid';
import {texts, validation} from "@/app.config";
import {unitStore} from "@/components/Admin/data";

class UnitTable extends React.Component {
    render() {
        return (
            <DataGrid
                dataSource={unitStore}
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
                    allowDeleting={false}
                    allowUpdating={true}
                    texts={texts}
                />
                <Column dataField="position" allowEditing={false} caption={"Thứ bậc"}>
                </Column>
                <Column dataField="name" caption={"Tên"}>
                    <RequiredRule message={validation.required}/>
                </Column>
            </DataGrid>
        );
    }
}

export default UnitTable;
