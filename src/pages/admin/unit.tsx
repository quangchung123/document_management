import React from 'react';
import Layout from "@/container/Layout";
import UnitTable from "@/components/Admin/UnitTable";
import withAuthSync from "@/components/Authenticate/withAuthSync";

const Unit = () => {
    return (
        <Layout>
            <UnitTable/>
        </Layout>
    );
};

export default withAuthSync(Unit);
