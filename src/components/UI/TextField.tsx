import * as React from "react";
import {HTMLProps} from "react";
import {Controller, useController} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {TextBox} from "devextreme-react";
import useFormService from "@/hooks/useFormService";
import {ITextBoxOptions} from "devextreme-react/text-box";
//input field

// khai bao kieu cho cac props
export type InputFieldProps = HTMLProps<HTMLInputElement> & {
    containerClassName?: string | any;
    name: string;
} & ITextBoxOptions;

export function TextField({
                              name,
                              containerClassName = "",
                              children,
                              ...rest
                          }: InputFieldProps) {
    const {control, setValue, trigger} = useFormService();
    const {
        fieldState: {error},
    } = useController({name, control});

    const onChange = async (e: any, field: ControllerRenderProps<any, any>) => {
        field.onChange(e.event?.currentTarget.value);
        trigger(name);
    };

    return (
        <div>
            <div className={containerClassName}>
                <Controller
                    control={control}
                    name={name}
                    render={({field}) => (
                        // @ts-ignore
                        <TextBox
                            name={name}
                            value={field.value}
                            onChange={(e)=>onChange(e,field)}
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
