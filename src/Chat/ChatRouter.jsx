import {Route, Routes} from "react-router-dom";
import {ChatApp} from "./ChatApp.jsx";
import {AuthProvider} from "../AuthContext.jsx";
import {ChatActive} from "./ChatActive.jsx";


export function ChatRouter() {
    return (
        <Routes>
            <Route  path="" element={<AuthProvider>
                <ChatApp />
            </AuthProvider>
            } />
            <Route  path="/conversation/:chat_id/:second_user/" element={<AuthProvider>
                <ChatActive />
            </AuthProvider>
            } />
        </Routes>
    )
}