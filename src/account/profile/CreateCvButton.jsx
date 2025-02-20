import {useState} from "react";
import api from "../../axiosInstance.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.jsx";

export function CreateCvButton({category,chosenSkills,experiences,languages,address}) {
    const [error, setError] = useState(null);
    const {isAuthenticated,user} = useAuth();

    const skills = chosenSkills.map(item => item.name).join("(*)");
    const navigate = useNavigate();

    const experience = experiences
        .map(item => `company: ${item.company} started: ${item.started} finished: ${item.finished}`)
        .join("(*)");

    const language = languages
        .map(item => `${item.language}: ${item.level}`)
        .join("(*)");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!category || category.length < 3){
            setError("Category didn't chosen");
            return;
        }
        if(!chosenSkills && chosenSkills.length === 0){
            setError("Skills didn't chosen");
            return;
        }
        if(!language && language.length === 0){
            setError("Language didn't chosen");
            return;
        }
        if(!address){
            setError("Address didn't chosen");
            return;
        }
        try{
            const response = await api.post('account/profile/upload/cv/',
            {
                occupation: category,
                skill_sets: skills,
                languages: language,
                work_experience: experience,
                address: address
            })
            if(response.status === 200){
                navigate(`/account/profile/${user}`);
            }
        }catch(err){
            console.log(err);
            setError("Something went wrong");
        }
    };

    return (
        <form className="w-full flex flex-col justify-center items-center my-4" onSubmit={handleSubmit}>
            <div className="w-[60%] flex justify-start">
                {error && (
                    <h2 className="text-[14px] text-[#F74E2C] my-2">{error}</h2>
                )}
            </div>
            <button className="w-[60%] bg-[#1B70F1] rounded-[4px] shadow-2xl">
                Create
            </button>
        </form>
    )
}