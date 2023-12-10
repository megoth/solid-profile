import Grid from "../../grid";
import ProfileKnowsPerson from "./person";
import ProfileKnowsCard from "./card";
import {BsFillPersonPlusFill} from "react-icons/bs";
import {useParams, useSearchParams} from "react-router-dom";
import {useSolidAuth} from "@ldo/solid-react";
import UnstyledButton from "../../unstyled-button";
import useModal from "../../../hooks/use-modal";
import ProfileKnowsModal from "./modal";

interface Props {
    value: Array<{ "@id": string }> | undefined
}

export default function ProfileKnows({value}: Props) {
    const {webId} = useParams();
    const [searchParams] = useSearchParams();
    const {session} = useSolidAuth();
    const ownProfile = session.isLoggedIn && webId === session.webId;
    const {openModal} = useModal();

    const handleAddContact = () => {
        openModal(<ProfileKnowsModal/>);
    }

    return value && value.length > 0
        ? <Grid>
            {value.map((person) => (
                <li key={`person-${person["@id"]}`}>
                    <ProfileKnowsPerson webId={person["@id"]} ownProfile={ownProfile}/>
                </li>
            ))}
            {ownProfile && searchParams.has("edit") && <li>
                <UnstyledButton onClick={handleAddContact}>
                    <ProfileKnowsCard name={"Add new contact"}
                                      image={<BsFillPersonPlusFill/>} style={{fontSize: 32}}
                                      webId={"By adding their WebID"} />
                </UnstyledButton>
            </li>}
        </Grid>
        : <div>No photo uploaded</div>
}