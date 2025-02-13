import {Route, Routes} from "react-router-dom";
import {JobApp} from "./JobApp.jsx";
import {JobPage} from "./JobPage.jsx";
import {AuthProvider} from "../AuthContext.jsx";
import {AppliesApp} from "./AppliesApp.jsx";
import {PostJobApp} from "./Company/PostJobApp.jsx";
import {CompanyApplyList} from "../account/profile/CompanyApplyList.jsx";

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
        <Route path="vacancy/post/" element={
            <AuthProvider>
                <PostJobApp />
            </AuthProvider>}
        />
        <Route  path="vacancies/:company/" element={
            <AuthProvider>
                <CompanyApplyList />
            </AuthProvider>
        } />
    </Routes>
    )
}