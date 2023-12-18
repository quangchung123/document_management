import * as React from "react";
import {HTMLProps} from "react";
import {Controller, useController} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {SelectBox} from "devextreme-react";
import useFormService from "@/hooks/useFormService";
import {ISelectBoxOptions} from "devextreme-react/select-box";
//input field

// khai bao kieu cho cac props
export type InputFieldProps = HTMLProps<HTMLInputElement> & {
    containerClassName?: string | any;
    // name và control là bắt buộc dùng để khai báo ở dưới
    name: string;
} & ISelectBoxOptions;

export function SelectField({name,containerClassName = "",children, ...rest}: InputFieldProps) {
    const {control, setValue, trigger} = useFormService();
    const {
        fieldState: {error},
    } = useController({name, control});

    const onChange = async (e: any, field: ControllerRenderProps<any, any>) => {
        field.onChange(e.event?.currentTarget.value);
        trigger(name);
    };

    return (
        <div >
            <div className={containerClassName}>
                <Controller
                    control={control}
                    name={name}
                    render={({field}) => (
                        // @ts-ignore
                        <SelectBox
                            onValueChanged={(e)=>onChange(e,field)}
                            name={name}
                            value={field.value}
                            {...rest}
                        />
                    )}
                />
                {children}
            </div>
            <div>
                {error && <p role="alert" className={"mt-2 text-red-400"}>{error?.message}</p>}
            </div>
        </div>
    );
}
