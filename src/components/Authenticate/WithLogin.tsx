import React, {useState} from 'react';
import styles from './login.module.scss';
import {useRouter} from 'next/router';
import {authApi, useLoginMutation} from "@/services/api/authApi";
import {toast} from 'react-toastify';
import useApiService from "@/hooks/useApiService";
import {InputField} from "@/Fields/InputField";

const WithLogin = () => {
    const [login] = useLoginMutation();
    const {dispatch,handleSubmit,callApi} = useApiService();
    const router = useRouter();
    const [eyePassword, setEyePassword] = useState(true);
    const handleEyePasswordChange = (event: any) => {
        event.preventDefault();
        setEyePassword(!eyePassword);
    };
    const notify = () => (toast.error('Vui Lòng Đăng Nhập Lại'));
    const onHandleSubmit = handleSubmit(async (data) => {
        const {status, validate, notify} = await callApi(() => {
            return authApi.endpoints.login.initiate(data)
        });
        notify();
        // @ts-ignore
        if (status == true) {
            router.push({
                pathname: '/user/user-document',
            })
        }
    });

    return (
        <div className={styles['container']}>
            <div className={styles['container-form']}>
                <form className={styles['form-login']} onSubmit={onHandleSubmit}>
                    <h2 className={styles['form-login-header']}>Đăng nhập</h2>
                    <div className={styles['form-login-username']}>
                        <label>Email</label>
                        <InputField
                            name={'email'}
                            placeholder={'Nhập email'}
                            className={styles['form-input']}
                        />
                    </div>
                    <div className={styles['form-login-username']}>
                        <label>Mật khẩu</label>
                        <InputField
                            name={'password'}
                            type={eyePassword ? 'password' : 'text'}
                            className={styles['form-input']}
                        >
                            <button type={'button'} className={'border-b'} onClick={handleEyePasswordChange}>
                                <i className={`bi ${eyePassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                            </button>
                        </InputField>

                    </div>
                    <div className="flex justify-center">
                        <button className={styles['submit']} type="submit">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default WithLogin;
