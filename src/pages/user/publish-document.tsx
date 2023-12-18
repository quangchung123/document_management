import React from 'react';
import Layout from "@/container/Layout";
import MapDocument from "@/components/Document/MapDocument";
import BoxForm from "@/Fields/BoxForm";
import withAuthSync from "@/components/Authenticate/withAuthSync";
import * as yup from "yup";

const SearchDocument = () => {
    const schema = yup.object().shape({
        title: yup
            .string(),
        document: yup
            .object()
    });

    return (
        <Layout>
            <BoxForm schema={schema} defaultValue={{}}>
                <MapDocument/>
            </BoxForm>
        </Layout>
    );
};

export default withAuthSync(SearchDocument);
