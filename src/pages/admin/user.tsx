import React from 'react';
import Layout from "@/container/Layout";
import UserTable from "@/components/Admin/UserTable";
import BoxForm from "@/Fields/BoxForm";
import * as yup from "yup";
import withAuthSync from "@/components/Authenticate/withAuthSync";

const Unit = () => {
    const schema = yup.object().shape({});

    return (
        <Layout>
            <BoxForm schema={schema} defaultValue={{}}>
                <UserTable/>
            </BoxForm>
        </Layout>
    );
};

export default withAuthSync(Unit);
