import React, {HTMLAttributes} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {ReactFCWithChildren} from "@/types";

type ILinkProps = {
    url: string,
    item?: any
} & HTMLAttributes<HTMLDivElement>

// @ts-ignore
const Link: ReactFCWithChildren<ILinkProps> = ({children, url="", item = {}, ...props}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const click = () => {
        router.push({
            pathname: url,
            query: item,
        }, url)
    }
    return (
        // @ts-ignore
        <div role={"button"} onClick={click} {...props}>
            {children}
        </div>
    );
};

export default Link;
