import {createContext} from "react";
import {SolidProfile} from "../../ldo/profile.typings.ts";
import {useResource} from "@ldo/solid-react";

const ProfileContext = createContext<{
    canEdit: boolean
    isLoading: boolean
    isOwner: boolean
    profile?: SolidProfile | null
    profileResource?: ReturnType<typeof useResource> | null
    tryingToEdit: boolean
}>({
    canEdit: false,
    isLoading: false,
    isOwner: false,
    profile: null,
    profileResource: null,
    tryingToEdit: false
});

export default ProfileContext;