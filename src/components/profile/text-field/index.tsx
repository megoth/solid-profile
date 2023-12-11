import React, {HTMLAttributes} from "react";
import {useSearchParams} from "react-router-dom";
import {UseFormRegister} from "react-hook-form";
import {PROFILE_FORM_DATA} from "../../../constants.ts";

interface Props extends HTMLAttributes<HTMLInputElement> {
    name: keyof PROFILE_FORM_DATA;
    required?: boolean;
    register: UseFormRegister<PROFILE_FORM_DATA>,
    value: string | undefined
}

export default function ProfileTextField({name, required, register, value, ...props}: Props) {
    const [searchParams] = useSearchParams();

    const handleBlur = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.currentTarget.form?.requestSubmit();
    }

    return searchParams.has("edit")
        ? <input className="input" {...props} {...register(name, {required, onBlur: handleBlur})}/>
        : value;
}