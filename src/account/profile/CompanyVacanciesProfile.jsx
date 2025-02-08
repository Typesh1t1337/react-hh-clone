import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";
import {Link} from "react-router-dom";

export function CompanyVacanciesProfile({username}) {
    const [vacancies, setVacancies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVacancies = async () => {
            try{
                const response =await api.get(`account/company/vacancies/${username}/`);
                console.log(response);
                if(response.status === 200) {
                    setVacancies(response.data);
                }
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }
        getVacancies();
    },[username]);
    return (
        <div className="w-full h-full flex justify-center items-center mt-20">
            <div className="w-[90%] flex pb-20">
                {error ? (
                        <div className="w-full">
                            <h2 className="text-[#F74E2C] text-[30px] font-semibold">
                                Error loading vacancies
                            </h2>
                        </div>
                ) : vacancies.length > 0 ? (
                    <div className="w-[100%] flex-col bg-[#1E1F25] rounded-[6px]">
                        <h2 className="text-[#CFD3DA] text-[30px] font-semibold mt-6 mx-[1.66667%]">Company Vacancies</h2>
                        <div className="flex flex-wrap mb-6">
                            {vacancies.map((vacancy,index) => (
                                <div className="w-[30%] h-[200px] bg-[#272A34] px-6 my-8 rounded-[4px] mx-[1.66667%] mb-2" key={index}>
                                    <div className="h-[75px] w-[100%] flex justify-start items-center">
                                        <h2 className="text-[#CFD3DA] text-[24px] text-center">{vacancy.title}</h2>
                                    </div>
                                    <div className="h-[25px] w-full flex justify-start items-center">
                                        <h2 className="text-[#ADB3BF] text-[16px]">{vacancy.salary}$</h2>
                                    </div>
                                    <div className="h-[100px] w-full flex justify-start items-center">
                                        <Link className="bg-[#1B70F1] px-6 py-3 rounded-[4px]" to={`/job/vacancy/${vacancy.pk}`}>Find out
                                            More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <h2 className="text-[#CFD3DA] text-[30px] font-semibold">This company not posted vacancies
                            yet</h2>
                    </div>
                )}
            </div>
        </div>
    )
}