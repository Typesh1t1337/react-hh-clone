import {Route, Routes} from "react-router-dom";
import {JobApp} from "./JobApp.jsx";
import {JobPage} from "./JobPage.jsx";
import {AuthProvider} from "../AuthContext.jsx";
import {AppliesApp} from "./AppliesApp.jsx";

export function JobRouter() {
    return (
    <Routes>
        <Route path="search/vacancy/" element={<JobApp />} />
        <Route path="vacancy/:jobId/" element={
            <AuthProvider>
                <JobPage />
            </AuthProvider>}
        />
        <Route path="applies/" element={
            <AuthProvider>
                <AppliesApp />
            </AuthProvider>}
        />
    </Routes>
    )
}