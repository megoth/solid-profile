import Grid from "../../grid";
import {sortById} from "../../../libs/array.ts";
import PhotoCard from "./card";
import useProfile from "../../../hooks/use-profile";

interface Props {
    value: Array<{ "@id": string }> | undefined
}

export default function ProfilePhoto({value}: Props) {
    const {canEdit} = useProfile();

    return value && value.length > 0
        ? <Grid>
            {value.sort(sortById).map((photo) => (
                <li key={`photo-${photo["@id"]}`}>
                    <PhotoCard photo={photo}/>
                </li>
            ))}
            {canEdit && <li>
                <PhotoCard/>
            </li>}
        </Grid>
        : <div>No photos listed</div>
}