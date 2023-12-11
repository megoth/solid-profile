import React, {HTMLAttributes} from "react";
import {UseFormRegister} from "react-hook-form";
import {PROFILE_FORM_DATA} from "../../../constants.ts";
import useProfile from "../../../hooks/use-profile";

interface Props extends HTMLAttributes<HTMLInputElement> {
    alwaysInput?: boolean
    name: keyof PROFILE_FORM_DATA
    required?: boolean
    register?: UseFormRegister<PROFILE_FORM_DATA>
    value: string | undefined
}

export default function ProfileTextField({alwaysInput, name, required, register, value, ...props}: Props) {
    const {canEdit} = useProfile();

    const handleBlur = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.currentTarget.form?.requestSubmit();
    }

    if (canEdit && register) {
        return <input className="input" {...props} {...register(name, {required, onBlur: handleBlur})}/>
    }
    return !canEdit && !alwaysInput ? value : <input className="input" disabled={true} value={value} {...props}/>;
}