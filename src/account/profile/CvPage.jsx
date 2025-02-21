import {useAuth} from "../../AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";
import {LoadingSpinner} from "../../LoadingSpinner.jsx";

export function CvPage(){
    const {isAuthenticated,user,isCompany} = useAuth();
    const {username} = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`account/profile/cv/${username}/`);
                if(response.status === 200){
                    setUserInfo(response.data);
                    setSkills(response.data.cv.skill_sets ? response.data.cv.skill_sets.split("(*)") : []);
                    setLanguages(response.data.cv.languages ? response.data.cv.languages.split("(*)") : []);
                    setExperience(response.data.cv.work_experience ? response.data.cv.work_experience.split("(*)") : []);
                }
            }catch(error){
                console.log(error.message);
                if(error.response.status === 404){
                    navigate("/404/");
                }
            }
        }
        fetchData();
    },[username]);

    if(!userInfo){
        return <LoadingSpinner />;
    }


    return(
        <div className="w-[70%] rounded-[2px]">
            <div className="w-full flex items-center p-6 justify-between bg-[#1E1F25]">
                <div>
                    <h2 className="font-bold text-[20px]">{userInfo.user_info.first_name} {userInfo.user_info.last_name}</h2>
                    <div className="flex items-center justify-center">
                        <h2 className="text-[#ADB3BF] mr-2">{userInfo.cv.occupation}</h2>
                        <h2 className="text-[#ADB3BF] my-3">CV</h2>
                    </div>
                </div>
                <div className="flex items-center w-[55%]">
                    {username === user && (
                            <div className="flex">
                                <div
                                    className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center mr-5">
                                    <h2 className="font-bold text-[18px]">Applies</h2>
                                    <h2 className="text-[#ECEEF0] mt-2">{userInfo.assignments.applied}</h2>
                                </div>
                                <div
                                    className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center mr-5">
                                    <h2 className="font-bold text-[18px]">Accepts</h2>
                                    <h2 className="text-[#ECEEF0] mt-2">{userInfo.assignments.accepted}</h2>
                                </div>
                                <div
                                    className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center mr-5">
                                    <h2 className="font-bold text-[18px]">Rejects</h2>
                                    <h2 className="text-[#ECEEF0] mt-2">{userInfo.assignments.rejected}</h2>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex">
                        <div
                            className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center">
                            <a className="text-[#06B470] text-[40px]" target="_blank" href={`http://127.0.0.1:8001${userInfo.user_info.cv_link}`}>
                                <i className="bi bi-file-earmark-arrow-down-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full my-6 px-6 py-6 bg-[#1E1F25]">
                <div className="w-full">
                    <div className="w-full flex py-2 items-center justify-start">
                        <h2 className="text-[20px] font-bold">Crucial skills</h2>
                    </div>
                    <div className="w-full flex flex-wrap my-2">
                        {skills.map((skill,index) => (
                            <div className="bg-[#272A34] px-3 py-3 rounded-[6px] mr-4 mb-4" key={index}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full flex py-2 items-center justify-start">
                        <h2 className="text-[20px] font-bold">Languages</h2>
                    </div>
                        <div className="w-full flex flex-wrap my-2">
                            {languages.map((language,index) => (
                                <div className="bg-[#272A34] px-3 py-3 rounded-[6px] mr-4 mb-4" key={index}>
                                    {language}
                                </div>
                            ))}
                        </div>
                </div>
                <div className="w-full">
                    <div className="w-full flex py-2 items-center justify-start">
                        <h2 className="text-[20px] font-bold">Work experience</h2>
                    </div>
                    <div className="w-full flex flex-col my-2">
                        {experience.map((experience,index) => (
                            <div className="bg-[#272A34] px-3 py-3 rounded-[6px] w-[100%] my-2" key={index}>
                                    <h2 className="text-[16px] text-[#ADB3BF]">{experience}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {username === user && (
                <div className="w-full my-8 flex justify-end">
                    <a className=" bg-[#1B70F1]  py-4 px-12 text-white font-bold rounded-[4px]">
                        Edit cv
                    </a>
                </div>
            )}
        </div>
    )
}