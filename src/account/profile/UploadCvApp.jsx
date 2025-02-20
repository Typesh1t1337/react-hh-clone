import {Header} from "../../Header.jsx";
import {Link} from "react-router-dom";
import {Logout} from "../Logout.jsx";
import {useAuth} from "../../AuthContext.jsx";
import {Upload} from "lucide-react";
import {UploadButton} from "../atr/UploadButton.jsx";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../../LoadingSpinner.jsx";
import {Professions} from "../../job/atrs/ProfSelector.jsx";
import {SelectSkills} from "../atr/SelectSkills.jsx";
import {AddJobExperience} from "./AddJobExperience.jsx";
import {AddLanguages} from "./AddLanguages.jsx";
import {CreateCvButton} from "./CreateCvButton.jsx";
import {AddressCV} from "./AddressCV.jsx";
import {CvPage} from "./CvPage.jsx";

export function UploadCvApp() {
    const {isAuthenticated,user,isCompany,loading,pfp,cv} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const design = 2;
    const [category, setCategory] = useState(null);
    const [chosenSkill, setChosenSkill] = useState([]);
    const[experiences, setExperiences] = useState([{company:"",started:"", finished:""}]);
    const [languages, setLanguages] = useState([{language:"",level:""}]);
    const [search, setSearch] = useState("");






    const handleDataFromSelector = (data) =>{
        setCategory(data);
    }
    return (
        <>
            <Header />
            <div>
                <div className="h-full mt-[120px] w-screen min-h-[600px]  p-10 flex justify-between items-start bg-[#131517]">
                    <div className="w-[20%] h-full">
                        <div className="h-[300px] w-full bg-[#1E1F25]">
                            <div className="h-[75px] w-full flex items-center justify-start px-5 bg-[#272A34]">
                                <h2 className="font-bold">Profile</h2>
                            </div>
                            <div className="h-[75px] w-full flex px-5  items-center justify-start">
                                <h2 className="font-bold">My profile</h2>
                            </div>
                            <div className="h-[75px] w-full flex px-5 bg-[#1B70F1]  items-center justify-start">
                                <Link className="font-bold text-[#CFD3DA]" to="/account/profile/cv/">My CV</Link>
                            </div>
                            <div className="h-[75px] w-full flex px-5  items-center justify-start">
                                <Logout/>
                            </div>
                        </div>
                    </div>
                    {cv ? (
                        <CvPage />
                    ) : (
                        <div
                            className="h-[1600px] w-[70%]  bg-[#1E1F25] rounded-[8px] py-10 flex flex-col overflow-scroll px-30">
                            <div className="w-full my-6 flex justify-center items-center">
                                <h2 className="text-[40px] font-bold">CV creation form</h2>
                            </div>
                            <div className="w-full my-6 flex flex-col items-center">
                                <div className="w-[60%] my-2">
                                    <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                                        Choose occupation <span className="text-[#FC4747]">*</span>
                                    </label>
                                </div>
                                <Professions onSendData={handleDataFromSelector} design={design}/>
                            </div>
                            <SelectSkills selectedCategory={category} setChosenSkill={setChosenSkill}
                                          chosenSkill={chosenSkill}/>
                            <AddJobExperience experiences={experiences} setExperiences={setExperiences}/>
                            <AddLanguages languages={languages} setLanguages={setLanguages}/>
                            <AddressCV search={search} setSearch={setSearch}/>
                            <CreateCvButton category={category} chosenSkills={chosenSkill} experiences={experiences}
                                            languages={languages} address={search}/>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}