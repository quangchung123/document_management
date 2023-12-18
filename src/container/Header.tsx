import React from 'react';
import {logoUrl} from "@/app.config";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/services/reducers/userReducer";
import {useRouter} from "next/router";

const Header = () => {
    const info = useSelector((state: any) => state.user.info);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.setItem("token","");
        router.push("/")
    }
    return (
        <nav
            className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar" type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd"
                                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                            <img className="w-8 rounded-full"
                                 src={logoUrl}
                                 alt="user photo"/>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex space-x-5 items-center ml-3">
                            < a
                                role={"button"}
                                className={`flex gap-1 md:bg-transparent text-primary text-gray-700 md:hover:text-primary block pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none`}
                                aria-current="page"
                            >
                                {info?.email}
                            </a>
                            <div onClick={handleLogout} role={"button"}
                                 className={"rounded-full flex items-center justify-center bg-blue-300 h-8 w-8"}>
                                <i className="bi bi-box-arrow-right text-white ml-[2px]"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
