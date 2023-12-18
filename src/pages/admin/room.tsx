import React from 'react';
import Layout from "@/container/Layout";
import LevelTable from "@/components/Admin/LevelTable";
import RoomTable from "@/components/Admin/RoomTable";
import * as yup from "yup";
import BoxForm from "@/Fields/BoxForm";
import withAuthSync from "@/components/Authenticate/withAuthSync";

const Room = () => {
    const schema = yup.object().shape({});

    return (
        <Layout>
            <BoxForm schema={schema} defaultValue={{}}>
                <RoomTable/>
            </BoxForm>
        </Layout>
    );
};

export default withAuthSync(Room);
