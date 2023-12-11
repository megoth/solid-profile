import Grid from "../../grid";
import ProfileKnowsPerson from "./person";
import ProfileKnowsCard from "./card";
import {BsFillPersonPlusFill} from "react-icons/bs";
import UnstyledButton from "../../unstyled-button";
import useModal from "../../../hooks/use-modal";
import ProfileKnowsEditModal from "./edit-modal";
import useProfile from "../../../hooks/use-profile";
import {clsx} from "clsx";
import styles from "./person/style.module.css";
import {sortById} from "../../../libs/array.ts";

interface Props {
    value: Array<{ "@id": string }> | undefined
}

export default function ProfileKnows({value}: Props) {
    const {canEdit} = useProfile();
    const {openModal} = useModal();

    const handleAddContact = () => {
        openModal(<ProfileKnowsEditModal/>);
    }

    return value && value.length > 0
        ? <Grid>
            {value.sort(sortById).map((person) => (
                <li key={`person-${person["@id"]}`}>
                    <ProfileKnowsPerson webId={person["@id"]}/>
                </li>
            ))}
            {canEdit && <li>
                <UnstyledButton onClick={handleAddContact}>
                    <ProfileKnowsCard>
                        <div className="media">
                            <div className="media-left">
                                <figure className={clsx("image", styles.image)}>
                                    <BsFillPersonPlusFill style={{fontSize: 32}}/>
                                </figure>
                            </div>
                            <div className={clsx("media-content", styles.mediaContent)}>
                                <div className="title is-4">Add new contact</div>
                                <div className="subtitle is-6">By adding their WebID</div>
                            </div>
                        </div>
                    </ProfileKnowsCard>
                </UnstyledButton>
            </li>}
        </Grid>
        : <div>No photo uploaded</div>
}