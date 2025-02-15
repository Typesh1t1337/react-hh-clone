import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../axiosInstance.js";
import {LoadingSpinner} from "../LoadingSpinner.jsx";


export function NewVacanciesIndex(){
    const [newVacanciesList, setNewVacanciesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchNewVacancies = async () => {
            try{
                const response = await api.get('api/v1/job/list/landing/');
                if(response.status === 200){
                    setNewVacanciesList(response.data.results);
                    setIsLoading(false);
                }
            }catch(e){
                console.error(e.message);
                setIsLoading(false);
            }
        }
        fetchNewVacancies();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="relative w-screen min-h-[600px] pt-[120px] bg-[#131517] flex justify-center items-center">
            <div className="w-full h-full flex flex-wrap px-20 justify-between">
                {newVacanciesList.map((job, index) => (
                        <div className="w-[30%] h-[230px] bg-[#1E1F25] rounded-[4px] mt-4 py-6 flex flex-col transition-transform duration-300 hover:scale-[1.01] shadow-2xl mb-[4%]" key={index}>
                            <h2 className="ml-6 mb-4 text-[22px]">{job.title}</h2>
                            <h2 className="ml-6 mb-4">{job.salary}$</h2>
                            <h2 className="ml-6 mb-4">{job.location}, {job.company}</h2>
                            <Link to={`/job/vacancy/${job.id}`} className="ml-6 flex justify-center items-center py-3 bg-[#1B70F1] rounded-[2px] w-[40%]">Apply</Link>
                        </div>
                ))}
            </div>
        </div>
    )
}