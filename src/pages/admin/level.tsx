import React from 'react';
import Layout from "@/container/Layout";
import LevelTable from "@/components/Admin/LevelTable";
import withAuthSync from "@/components/Authenticate/withAuthSync";

const Unit = () => {
    return (
        <Layout>
            <LevelTable/>
        </Layout>
    );
};

export default withAuthSync(Unit);
