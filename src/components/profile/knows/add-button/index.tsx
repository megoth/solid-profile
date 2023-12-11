import UnstyledButton from "../../../unstyled-button";
import ProfileKnowsCard from "../card";
import {clsx} from "clsx";
import styles from "../person/style.module.css";
import {BsFillPersonPlusFill} from "react-icons/bs";
import useModal from "../../../../hooks/use-modal";
import ProfileKnowsEditModal from "../edit-modal";

export default function ProfileKnowsAddButton() {
    const {openModal} = useModal();

    const handleAddContact = () => {
        openModal(<ProfileKnowsEditModal/>);
    }

    return (
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
    )
}