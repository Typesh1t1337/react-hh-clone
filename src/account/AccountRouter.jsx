import {Route, Routes} from "react-router-dom";
import {RegistrationUserApp} from "./RegistrationUserApp.jsx";
import {LoginUserApp} from "./LoginUserApp.jsx";
import {RegisterApp} from "./RegisterApp.jsx";
import {RegisterCompanyApp} from "./RegisterCompanyApp.jsx";
import {MyProfileApp} from "./profile/MyProfileApp.jsx";
import {VerifyAccount} from "./verification/VerifyAccount.jsx";
import {AuthProvider} from "../AuthContext.jsx";
import {CompanyVacanciesApp} from "./profile/CompanyVacanciesApp.jsx";


export function AccountRouter() {
    return (
            <Routes>
                <Route path="register/user/" element={ <RegistrationUserApp />}  />
                <Route path="login/" element={<LoginUserApp />} />
                <Route path="register/" element={<RegisterApp />} />
                <Route path="register/company/"  element={<RegisterCompanyApp />} />
                <Route path="my_profile/" element={<MyProfileApp />} />
                <Route path="verify_email/" element={<AuthProvider><VerifyAccount /></AuthProvider>} />
                <Route path="company/vacancies/" element={<AuthProvider><CompanyVacanciesApp /></AuthProvider>} />
            </Routes>
    )
}