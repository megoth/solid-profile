import React from "react";
import {clsx} from "clsx";

export default function FormControls({
                                         className,
                                         ...props
                                     }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <div className="field is-grouped">
            <div className="control">
                <button className={clsx("button is-primary", className)} type="submit" {...props}>Submit</button>
            </div>
            <div className="control">
                <button className={clsx("button is-secondary", className)} type="reset" {...props}>Cancel</button>
            </div>
        </div>
    )
}