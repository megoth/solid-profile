import Profile from "../../components/profile";
import ProfileContextProvider from "../../hooks/use-profile/provider.tsx";

export default function ProfilePage() {
    return (
        <ProfileContextProvider>
            <Profile/>
        </ProfileContextProvider>
    )
}