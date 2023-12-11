import {useContext} from "react";
import ProfileContext from "./context.tsx";

export default function useProfile() {
    return useContext(ProfileContext);
}

