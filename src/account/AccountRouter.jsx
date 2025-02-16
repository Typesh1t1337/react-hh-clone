import {Route, Routes} from "react-router-dom";
import {RegistrationUserApp} from "./RegistrationUserApp.jsx";
import {LoginUserApp} from "./LoginUserApp.jsx";
import {RegisterApp} from "./RegisterApp.jsx";
import {RegisterCompanyApp} from "./RegisterCompanyApp.jsx";
import {ProfileApp} from "./profile/ProfileApp.jsx";
import {VerifyAccount} from "./verification/VerifyAccount.jsx";
import {AuthProvider} from "../AuthContext.jsx";
import {CompanyVacanciesApp} from "./profile/CompanyVacanciesApp.jsx";
import {CompanyApplyListApp} from "./profile/CompanyApplyListApp.jsx";
import {EditProfileApp} from "./profile/EditProfileApp.jsx";
import {UploadCvApp} from "./profile/UploadCvApp.jsx";


export function AccountRouter() {
    return (
            <Routes>
                <Route path="register/user/" element={ <RegistrationUserApp />}  />
                <Route path="login/" element={<LoginUserApp />} />
                <Route path="register/" element={<RegisterApp />} />
                <Route path="register/company/"  element={<RegisterCompanyApp />} />
                <Route path="profile/:username" element={<ProfileApp />} />
                <Route path="verify_email/" element={<AuthProvider><VerifyAccount /></AuthProvider>} />
                <Route path="company/vacancies/" element={<AuthProvider><CompanyVacanciesApp /></AuthProvider>} />
                <Route  path="vacancies/:company/:status/" element={<AuthProvider><CompanyApplyListApp /></AuthProvider>} />
                <Route  path="profile/edit/" element={<AuthProvider><EditProfileApp /></AuthProvider>} />
                <Route  path="profile/cv/" element={<AuthProvider><UploadCvApp/></AuthProvider>} />
            </Routes>
    )
}