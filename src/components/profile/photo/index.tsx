import Grid from "../../grid";
import {sortById} from "../../../libs/array.ts";
import PhotoCard from "./card";
import useProfile from "../../../hooks/use-profile";

interface Props {
    value: Array<{ "@id": string }> | undefined
}

export default function ProfilePhoto({value}: Props) {
    const {canEdit} = useProfile();

    return <Grid>
        {value && value.length > 0 && (<>
            {value.sort(sortById).map((photo) => (
                <li key={`photo-${photo["@id"]}`}>
                    <PhotoCard photoUrl={photo["@id"]}/>
                </li>
            ))}
            {canEdit && <li><PhotoCard/></li>}
        </>)}
        {value && value.length === 0 && (
            <li>{canEdit ? <PhotoCard/> : "No photos listed"}</li>
        )}
    </Grid>
}