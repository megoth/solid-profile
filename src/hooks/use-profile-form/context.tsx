import {createContext, ReactElement} from "react";
import {SolidProfile} from "../../ldo/profile.typings.ts";
import {useResource} from "@ldo/solid-react/src/useResource.ts";

export interface ProfileFormModel extends ReactElement {
}

const ProfileFormContext = createContext<{
    canEdit: boolean
    profile?: SolidProfile | null
    profileResource?: ReturnType<typeof useResource> | null
}>({
    canEdit: false,
    profile: null,
    profileResource: null
});

export default ProfileFormContext;