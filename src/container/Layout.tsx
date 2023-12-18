import React, {useMemo} from 'react';
import SideBar from "@/container/SideBar";
import Header from "@/container/Header";
import {ReactFCWithChildren} from "@/types";
import {useRouter} from "next/router";

const Layout: ReactFCWithChildren<any> = ({children}) => {
    const router = useRouter();
    const key = useMemo(() => router.pathname.split("/"), [router.pathname]);

    return (
        <div>
            <Header/>
            <aside id="logo-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                   aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <SideBar/>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 pt-20 min-h-screen ">
                {children}
            </div>
        </div>
    );
};

export default Layout;
