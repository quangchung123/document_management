import React, {FC, PropsWithChildren, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type IBoxFormProps<T> = {
    schema?: any,
    defaultValue?: any
}
const BoxForm: FC<PropsWithChildren<IBoxFormProps<any>>> = ({children, schema = {}, defaultValue = {}}) => {
    const methods = useForm<any>({
        defaultValues: defaultValue,
        resolver: yupResolver(schema)
    });
    // useEffect(()=>{
    //     methods.reset(defaultValue);
    // },[defaultValue])
    return (
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}

export default BoxForm;