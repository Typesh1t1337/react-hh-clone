import {Header} from "../Header.jsx";
import axios from "axios";
import {useEffect} from "react";
import {AuthProvider, useAuth} from "../AuthContext.jsx";


export function IndexApp() {
    return (
        <>
            <AuthProvider>
                <Header />
            </AuthProvider>
        </>
    )
}