import {NextPage} from "next";
import Layout from "@/container/Layout";
import UnitTable from "@/components/Admin/UnitTable";

const Home: NextPage = () => {
    return (
        <Layout>
            <UnitTable/>
        </Layout>
    )
};

export default Home;
