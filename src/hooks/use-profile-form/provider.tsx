import {ReactNode} from "react";
import ProfileFormContext from "./context.tsx";
import {SolidProfile} from "../../ldo/profile.typings.ts";
import {useResource} from "@ldo/solid-react/src/useResource.ts";

interface Props {
    canEdit: boolean
    children: ReactNode
    profile?: SolidProfile | null
    profileResource?: ReturnType<typeof useResource> | null
}

export default function ModalContextProvider({canEdit, children, profile, profileResource}: Props) {
    return (
        <ProfileFormContext.Provider value={{canEdit, profile, profileResource}}>
            {children}
        </ProfileFormContext.Provider>
    )
}