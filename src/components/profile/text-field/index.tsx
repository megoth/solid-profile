import {useSearchParams} from "react-router-dom";
import {UseFormRegister} from "react-hook-form";
import {PROFILE_FORM_DATA} from "../../../constants.ts";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
    name: keyof PROFILE_FORM_DATA;
    required?: boolean;
    register: UseFormRegister<PROFILE_FORM_DATA>,
    value: string | undefined
}

export default function ProfileTextField({name, required, register, value, ...props}: Props) {
    const [searchParams] = useSearchParams();
    return searchParams.has("edit")
        ? <input className="input" {...props} {...register(name, {required})}/>
        : value;
}