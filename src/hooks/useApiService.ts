import {useDispatch} from "react-redux";
import {useFormContext} from "react-hook-form";
import {toast} from "react-toastify";
import get from "lodash.get";

const useApiService = () => {
    // redux
    const dispatch = useDispatch();
    const {handleSubmit, formState: {isSubmitting}} = useFormContext();

    const callApi: (callFunction: any) => Promise<{
        data: any;
        status: boolean,
        notify: () => void,
        validate: any,
    }> = async (callFunction: () => any) => {
        const action = callFunction();
        const payload = await dispatch(action);
        if (get(payload, 'data.validate')) {
            return {
                status: payload.data?.success,
                data: payload?.validate,
                notify: () => {
                    toast.error(get(payload, 'data.message') || "Lỗi máy chủ")
                },
                validate: get(payload, 'data.validate')
            };
        }
        return {
            status: payload.data?.success,
            data: payload.data?.data,
            notify: () => {
                if (get(payload, 'data.message')) {
                    toast.info(get(payload, 'data.message'))
                }
            },
            validate: null
        };
    }
    return {
        callApi,
        handleSubmit,
        isSubmitting,
        dispatch
    }
};

export default useApiService;
