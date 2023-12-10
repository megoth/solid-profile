import {useContext} from "react";
import ProfileFormContext from "./context.tsx";

export default function useProfileForm() {
    return useContext(ProfileFormContext);
}

