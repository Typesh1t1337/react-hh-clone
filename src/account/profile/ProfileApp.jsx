import {Header} from "../../Header.jsx";
import {AuthProvider, useAuth} from "../../AuthContext.jsx";
import {Profile} from "./Profile.jsx";

export function ProfileApp() {
    return (
        <>
            <AuthProvider>
                <Header />
                <Profile />
            </AuthProvider>
        </>
    )
}