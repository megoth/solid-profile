import Grid from "../../grid";
import ProfileKnowsPerson from "./person";
import ProfileKnowsCard from "./card";
import {BsFillPersonPlusFill} from "react-icons/bs";
import {useParams, useSearchParams} from "react-router-dom";
import {useSolidAuth} from "@ldo/solid-react";
import UnstyledButton from "../../unstyled-button";
import useModal from "../../../hooks/use-modal";
import ProfileKnowsModal from "./modal";
import {SolidProfile} from "../../../ldo/profile.typings.ts";
import {useResource} from "@ldo/solid-react/src/useResource.ts";

interface Props {
    profile: SolidProfile
    profileResource: ReturnType<typeof useResource>
    value: Array<{ "@id": string }> | undefined
}

export default function ProfileKnows({profile, profileResource, value}: Props) {
    const {webId} = useParams();
    const [searchParams] = useSearchParams();
    const {session} = useSolidAuth();
    const ownProfile = session.isLoggedIn && webId === session.webId;
    const {openModal} = useModal();

    const handleAddContact = () => {
        openModal(<ProfileKnowsModal profile={profile} profileResource={profileResource}/>);
    }

    return value && value.length > 0
        ? <Grid>
            {value.map((person) => (
                <li key={`person-${person["@id"]}`}>
                    <ProfileKnowsPerson webId={person["@id"]}/>
                </li>
            ))}
            {ownProfile && searchParams.has("edit") && <li>
                <UnstyledButton onClick={handleAddContact}>
                    <ProfileKnowsCard name={"Add new contact"}
                                      image={<BsFillPersonPlusFill/>} style={{fontSize: 32}}
                                      webId={"By adding their WebID"}/>
                </UnstyledButton>
            </li>}
        </Grid>
        : <div>No photo uploaded</div>
}