import {ReactNode, useMemo} from "react";
import ProfileContext from "./context.tsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useSolidAuth, useResource, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "../../ldo/profile.shapeTypes.ts";

interface Props {
    children: ReactNode
}

export default function ProfileContextProvider({children}: Props) {
    const {webId} = useParams();
    const {session} = useSolidAuth();
    const [searchParams] = useSearchParams();
    const profileResource = useResource(webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, webId);
    const isOwner = useMemo(() => webId === session.webId, [session.webId, webId]);
    const isEditMode = searchParams.has("edit");
    const canEdit = isOwner && isEditMode;
    const isLoading = useMemo(
        () => !profile || profileResource?.isDoingInitialFetch() || false,
        [profile, profileResource]
    )
    return (
        <ProfileContext.Provider value={{canEdit, isEditMode, isLoading, isOwner, profile, profileResource}}>
            {children}
        </ProfileContext.Provider>
    )
}