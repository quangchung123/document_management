import React from 'react';
import WithLogin from "@/components/Authenticate/WithLogin";
import BoxForm from "../../../shared/Fields/BoxForm";
import * as yup from "yup";

const Login = () => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required("Trường này là email"),
        password: yup
            .string()
            .required("Trường này là bắt buộc"),
    });
    const defaultValue = {
        email:"admin@gmail.com",
        password:"123456"
    }
    return (
       <BoxForm schema={schema} defaultValue={defaultValue}>
           <WithLogin/>
       </BoxForm>
    );
};

export default Login;
