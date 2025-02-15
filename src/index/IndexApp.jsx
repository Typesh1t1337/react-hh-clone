import {Header} from "../Header.jsx";
import {AuthProvider, useAuth} from "../AuthContext.jsx";
import {HeaderIndex} from "./HeaderIndex.jsx";
import {NewVacanciesIndex} from "./NewVacanciesIndex.jsx";
import {LabelIndex} from "./LabelIndex.jsx";

export function IndexApp() {
    return (
        <>
            <AuthProvider>
                <Header />
                <HeaderIndex />
                <NewVacanciesIndex />
                <LabelIndex />
            </AuthProvider>
        </>
    )
}