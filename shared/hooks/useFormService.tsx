import {
    Control,
    FieldValues,
    FormState,
    UseFormClearErrors,
    useFormContext,
    UseFormGetFieldState, UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
    UseFormResetField,
    UseFormSetError,
    UseFormSetFocus,
    UseFormSetValue,
    UseFormTrigger,
    UseFormUnregister,
    UseFormWatch,
    useWatch
} from "react-hook-form";

type IProps = <T>()=>{
    resetField: UseFormResetField<FieldValues>;
    values: any & T;
    clearErrors: UseFormClearErrors<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
    control: Control<FieldValues, any>;
    trigger: UseFormTrigger<FieldValues>;
    setFocus: UseFormSetFocus<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    getFieldState: UseFormGetFieldState<FieldValues>;
    watch: UseFormWatch<FieldValues>; setError: UseFormSetError<FieldValues>;
    setValue: UseFormSetValue<FieldValues>; formState: FormState<FieldValues>;
    reset: UseFormReset<FieldValues>; register: UseFormRegister<FieldValues>
}
const useFormService: IProps = () => {
    const {getValues, ...rest} = useFormContext();
    return {
        values: {
            ...useWatch(), // subscribe to form value updates
            ...getValues(), // always merge with latest form values
        },
        ...rest
    }
}

export default useFormService;