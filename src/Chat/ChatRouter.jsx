import {Route, Routes} from "react-router-dom";
import {ChatApp} from "./ChatApp.jsx";
import {AuthProvider} from "../AuthContext.jsx";


export function ChatRouter() {
    return (
        <Routes>
            <Route  path="" element={<AuthProvider>
                <ChatApp />
            </AuthProvider>} />
        </Routes>
    )
}