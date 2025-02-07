import {Header} from "../../Header.jsx";
import {useAuth} from "../../AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Logout} from "../../account/Logout.jsx";
import {CitiesSelector} from "../atrs/CitiesSelector.jsx";
import {Professions} from "../atrs/ProfSelector.jsx";
import {useState} from "react";
import api from "../../axiosInstance.js";


export function PostJobApp() {
    const {isAuthenticated,user,isCompany,email,isVerified} = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState(null);
    const [profession, setProfession] = useState(null);
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const design = 2;

    if (!isCompany){
        navigate("/");
    }

    const handleSubmit = async () => {
        setError(null);

        if (title.length <3 || title.length > 100){
            setError("Title have to be between 3 and 100 characters");
            setTimeout(
                () => setError(null), 2000
            )
            return;
        }
        if (description.length < 10){
            setError("Please enter a description");
            setTimeout(
                () => setError(null), 2000
            )
            return;
        }
        if (salary === null){
            setError("Please enter a salary");
            setTimeout(
                () => setError(null), 2000
            )
            return;
        }
        if (profession === null){
            setError("Please enter a profession");
            setTimeout(
                () => setError(null), 2000
            )
            return;
        }if (city === null){
            setError("Please enter a city");
            setTimeout(
                () => setError(null), 2000
            )
            return;
        }
        try{
            const response = await api.post(`/api/v1/job/create/`, {
                title: title,
                description: description,
                salary: parseInt(salary),
                category: profession,
                location: city,
            })
        } catch (error){
            console.log(error.message);
            setError("Something went wrong");
            if(error.response.status === 401){
                setError(error.response.data.error);
            }
        }
    }

    const handleCitySelection = (data) => {
        setCity(data);
    }

    const handleProfessionSelection = (data) => {
        setProfession(data);
    }

    return (
        <>
            <Header/>
            <div className="mt-[120px] w-screen min-h-[650px]  p-10 flex justify-center bg-[#131517]">
                <div className="w-[50%]  flex justify-center items-center bg-[#1E1F25] rounded-[4px]">
                    <div className="w-[100%] py-10 px-10">
                        <div className="w-[100%] flex items-center justify-center mb-4">
                            <h2 className="font-bold text-[30px]">Vacancy posting form</h2>
                        </div>
                        <div className="w-full h-full">
                            <form className="w-full h-full" onSubmit={handleSubmit}>
                                <div className="w-full mb-6 flex flex-col items-center">
                                    <div className="w-[60%] h-full flex flex-col justify-between mb-6">
                                        <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                                            Title <span className="text-[#FC4747]">*</span>
                                        </label>
                                        <input type="text" placeholder="type here" id="title"
                                               className="w-[100%] px-[2%] h-[40px] text-[#ADB3BF] border-grey-300 border-[1px] rounded-[2px]" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </div>
                                    <div className="w-[60%] h-full flex flex-col justify-between mb-6">
                                        <label htmlFor="Salary" className="mb-2 text-[#CFD3DA]">
                                            Salary <span className="text-[#FC4747]">*</span>
                                        </label>
                                        <input type="number" id="Salary" placeholder="type here"
                                               className="w-[100%] px-[2%] h-[40px] text-[#ADB3BF] border-grey-300 border-[1px] rounded-[2px]" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="w-[100%] flex flex-col items-center mb-6">
                                    <div className="w-[60%]">
                                        <label htmlFor="description" className="mb-2 text-[#CFD3DA]">
                                            Description <span className="text-[#FC4747]">*</span>
                                        </label>
                                    </div>
                                    <textarea placeholder="type here" id="description" value={description}
                                              onChange={(e) => setDescription(e.target.value)} required
                                              className="px-[1%] py-[1%] w-[60%] h-[200px] text-[#ADB3BF] border-grey-300 border-[1px] rounded-[2px]"/>
                                </div>
                                <div className="w-[100%] flex flex-col items-center mb-6">
                                    <div className="w-[60%]">
                                        <label htmlFor="description" className="mb-2 text-[#CFD3DA]">
                                            City <span className="text-[#FC4747]">*</span>
                                        </label>
                                    </div>
                                    <CitiesSelector onSendData={handleCitySelection} design={design}/>
                                </div>
                                <div className="w-[100%] flex flex-col items-center mb-14">
                                    <div className="w-[60%]">
                                        <label htmlFor="description" className="mb-2 text-[#CFD3DA]">
                                            Profession <span className="text-[#FC4747]">*</span>
                                        </label>
                                    </div>
                                    <Professions onSendData={handleProfessionSelection} design={design}/>
                                </div>
                                <div className="w-[100%] flex flex-col items-center mb-6">
                                    <h2 className="text-[#F74E2C] text-[14px] my-2">{error}</h2>
                                    <button type="submit"
                                            className="w-[50%] bg-[#1B70F1] rounded-[4px] shadow-md hover:shadow-xl hover:bg-[#1B70F9] active:scale-95 transition-all">
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}