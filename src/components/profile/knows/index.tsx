import Grid from "../../grid";
import ProfileKnowsPerson from "./person";
import useProfile from "../../../hooks/use-profile";
import {sortById} from "../../../libs/array.ts";
import ProfileKnowsAddButton from "./add-button";

interface Props {
    value: Array<{ "@id": string }> | undefined
}

export default function ProfileKnows({value}: Props) {
    const {canEdit} = useProfile();

    return <>
        {value && value.length > 0 && (<Grid>
                {value.sort(sortById).map((person) => (
                    <li key={`person-${person["@id"]}`}>
                        <ProfileKnowsPerson webId={person["@id"]}/>
                    </li>
                ))}
                {canEdit && <li><ProfileKnowsAddButton /></li>}
            </Grid>
        )}
        {value && value.length === 0 && (canEdit ? <ProfileKnowsAddButton /> : "No contacts listed")}
    </>
}