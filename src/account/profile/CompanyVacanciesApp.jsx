import {useAuth} from "../../AuthContext.jsx";
import {Header} from "../../Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Logout} from "../Logout.jsx";
import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";
import {RemoveVacancy} from "../atr/RemoveVacancy.jsx";
import "../../Styles.css"

export function CompanyVacanciesApp() {
    const {isAuthenticated,user,isCompany,email,isVerified,loading} = useAuth();
    const navigate = useNavigate();
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWarned, setIsWarned] = useState(false);
    const [idOfVacancies, setIdOfVacancies] = useState(null);
    const [titleOfVacancies, setTitleOfVacancies] = useState(null);
    const [ifSuccess, setIfSuccess] = useState(false);

    useEffect(() => {
        if(loading){
            setIsLoading(false);
        }
    });

    useEffect(() => {
        if (!isLoading && !isCompany) {
            navigate("/");
        }
    },[isCompany,navigate]);



    useEffect(() => {
            const fetchData = async () => {
                try{
                    const response = await api.get('api/v1/job/company/vacancies/');
                    setVacancies(response.data);
                    setIsLoading(false);
                } catch(error){
                    console.log(error.message);
                }
            };
            if(isLoading){
                fetchData();
            }
    },[isLoading]);

    const openModal = (vacancyId,vacancyTitle) => {
        setIsWarned(true);
        setIdOfVacancies(vacancyId);
        setTitleOfVacancies(vacancyTitle);

    }

    const closeModal = () => {
        setIsWarned(false);
    }

    return (
        <>
            {ifSuccess && (
                <div className="fixed inset-0 z-101 flex justify-end items-start bg-transparent">
                    <div className="bg-[#06B470] px-2 py-4 w-[300px] h-[40px] flex items-center notification">
                        <h2 className="text-white text-[14px]">Vacancy "{titleOfVacancies}" removed </h2>
                    </div>
                </div>
            )}
            {isWarned  && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-101 flex justify-center items-center">
                    <div className="w-[400px] h-[220px] py-[20px] bg-[#1E1F25] rounded-[4px] shadow-2xl">
                        <div className="w-full h-[50px] flex justify-center items-center">
                            <div className="w-[30px] h-[30px] bg-[#F74E2C] flex justify-center items-center rounded-[2px] mr-2">
                                <i className="bi bi-exclamation-diamond-fill"></i>
                            </div>
                            <h2 className="text-[24px] text-bold">warning</h2>
                        </div>
                        <div className="w-full h-[50px] flex justify-center items-center">
                            <h2 className="text-[13px] text-center">You going to remove vacancy "{titleOfVacancies}" </h2>
                        </div>
                        <div className="w-full h-[100px] flex justify-center items-center">
                            <button className="px-6 h-[48px] bg-white  text-[#1E1F25] rounded-[4px] mr-2 cursor-pointer" onClick={() => closeModal()}>
                                Cancel
                            </button>
                            <RemoveVacancy vacancy_id={idOfVacancies} setIsWarned={setIsWarned} setIsSuccess={setIfSuccess} setVacancies={setVacancies} />
                        </div>
                    </div>
                </div>
            )}
            <Header/>
            <div
                className="mt-[120px] w-screen min-h-[600px]  p-10 flex justify-between items-start bg-[#131517]">
                <div className="w-[20%] h-full">
                    <div className="h-[300px] w-full bg-[#1E1F25]">
                        <div className="h-[75px] w-full flex items-center justify-start px-5 bg-[#272A34]">
                            <h2 className="font-bold">Profile</h2>
                        </div>
                        <div className="h-[75px] w-full flex px-5  items-center justify-start">
                            <Link to="/account/my_profile/" className="font-bold">My profile</Link>
                        </div>
                        <div className="h-[75px] w-full flex px-5  bg-[#1B70F1] items-center justify-start">
                            <Link className="font-bold text-[#CFD3DA]">Company Vacancies</Link>
                        </div>
                        <div className="h-[75px] w-full flex px-5  items-center justify-start">
                            <Logout/>
                        </div>
                    </div>
                </div>
                <div className="w-[75%] h-full flex flex-col ">
                    <div className="w-full h-[75px] flex items-center">
                        <h2 className="text-[30px] font-bold">{user} vacancies</h2>
                    </div>
                    {vacancies.map((vacancy, index) => (
                        <div className="relative w-full h-[260px] flex flex-col mb-6 rounded-[6px] bg-[#1E1F25] p-8 transition-transform duration-300 hover:scale-[1.01]" key={index}>
                            <div className="w-full h-[80px] flex justify-start items-center">
                                <h2 className="text-[#CFD3DA] text-[30px] font-semibold">{vacancy.title}</h2>
                            </div>
                            <div className="w-full h-[80px] flex justify-start items-center">
                                <h2 className="text-[#ADB3BF] text-[24px] font-[500]">{vacancy.salary}$</h2>
                            </div>
                            <div className="w-full h-[120px] flex flex-row items-center">
                                <div className="w-full h-[100px] flex items-center">
                                    <div title="look vacancy"
                                         className="w-[50px] h-[50px] flex items-center justify-center rounded-[4px] text-white bg-[#1B70F1] text-[20px] mr-4 cursor-pointer">
                                        <Link to={`/job/vacancy/${vacancy.id}`}
                                              className="w-full h-full flex items-center justify-center"><i
                                            className="bi bi-eye-fill"></i></Link>
                                    </div>
                                    <div title="edit vacancy"
                                         className="w-[50px] h-[50px] flex items-center justify-center rounded-[4px] text-white bg-[#06B470] text-[20px] mr-4 cursor-pointer">
                                        <i className="bi bi-pencil-square"></i>
                                    </div>
                                    <div title="remove vacancy" onClick={() => openModal(parseInt(vacancy.id), vacancy.title)}
                                         className="w-[50px] h-[50px] flex items-center justify-center rounded-[4px] text-white bg-[#F74E2C] text-[20px] cursor-pointer">
                                        <i className="bi bi-trash3-fill"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}