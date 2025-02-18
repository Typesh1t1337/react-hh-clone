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

export function UploadCvApp() {
    const {isAuthenticated,user,isCompany,loading,pfp,cv} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const design = 2;
    const [category, setCategory] = useState(null);
    const [chosenSkill, setChosenSkill] = useState([]);

    useEffect(() => {
        if (cv) {
            setIsLoading(false);
        }
    }, [cv]);


    if (isLoading) {
        return <LoadingSpinner />;
    }

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
                    <div
                        className="h-[1500px] w-[70%]  bg-[#1E1F25] rounded-[8px] py-10 flex flex-col overflow-scroll px-30">
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
                        <div className="w-full my-6 flex flex-col items-center">
                            <div className="w-[60%] my-4">
                                <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                                    Experience
                                </label>
                                <h2 className="mt-2 text-[12px] text-[#8a8a8a]">
                                    leave this blank empty if you have no work experience
                                </h2>
                                <div className="my-3">
                                    <label className="text-[#CFD3DA] text-[14px]">
                                        Corporation
                                    </label>
                                    <input placeholder="Type here"
                                           className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                           type="text"/>
                                </div>
                                <div className="my-3">
                                    <label className="text-[#CFD3DA] text-[14px]">
                                        Started at
                                    </label>
                                    <input placeholder="Started"
                                           className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                           type="date"/>
                                </div>
                                <div className="my-3">
                                    <label className="text-[#CFD3DA] text-[14px]">
                                        Finished at
                                    </label>
                                    <input placeholder="Finished"
                                           className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                           type="date"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-6 flex flex-col items-center">
                            <div className="w-[60%] my-4">
                                <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                                    Languages <span className="text-[#FC4747]">*</span>
                                </label>
                                <div className="my-3">
                                    <label className="text-[#CFD3DA] text-[14px]">
                                        Language
                                    </label>
                                    <input placeholder="Type here"
                                           className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                           type="text"/>
                                </div>
                                <div className="my-3">
                                    <label className="text-[#CFD3DA] text-[14px]">
                                        Level
                                    </label>
                                    <select
                                        className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2">
                                        <option value="" disabled selected>Choose Level</option>
                                        <option value="A0">A0</option>
                                        <option value="A1">A1</option>
                                        <option value="A2">A2</option>
                                        <option value="B1">B1</option>
                                        <option value="B2">B2</option>
                                        <option value="C1">C1</option>
                                        <option value="C2">C2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}