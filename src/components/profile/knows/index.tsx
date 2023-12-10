import Grid from "../../grid";
import ProfileKnowsPerson from "./person";

interface Props {
    value: Array<{"@id": string}> | undefined
}

export default function ProfileKnows({value}: Props) {
    return value && value.length > 0
        ? <Grid>
            {value.map((person) => (
                <li key={`person-${person["@id"]}`}>
                    <ProfileKnowsPerson webId={person["@id"]} />
                </li>
            ))}
        </Grid>
        : <div>No photo uploaded</div>
}