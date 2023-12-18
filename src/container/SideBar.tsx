import React, {useMemo, useState} from 'react';
import Link from "@/UI/Link";
import {useRouter} from "next/router";
import {sideBarOptions} from "@/app.config";
import {useSelector} from "react-redux";

const SideBar =  () => {
    const router = useRouter();
    const unitID = useSelector((state: any) => state.user.info?.unit_id);
    const itemToRender  = useMemo(()=>{
        return sideBarOptions.filter((item)=>(item.type ===(unitID ===1 ?1:2)) || item.type ===3)
    },[unitID]);
    return (
        <ul className="space-y-2 font-medium">
            {itemToRender.map((item, index) => {
                const active = item.key === 'dashboard' ? router.pathname === "/" : (router.pathname.includes(item.router) && item.key !== 'dashboard');
                return (
                    <Link key={index} url={item.router}
                          className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 group ${active ? 'bg-blue-300 text-white' : ''}`}>
                        <div dangerouslySetInnerHTML={{__html: `${item.icon}`}}></div>
                        <span className="ml-3">{item.name}</span>
                    </Link>
                )
            })}
        </ul>
    );
};

export default SideBar;
