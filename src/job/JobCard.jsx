import {useEffect, useState} from "react";
import axios from "axios";
import api from "../axiosInstance.js";


export function JobCard({title,description,location,salary_min,salary_max,category}) {
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            try{
                const response = await api.get(`api/v1/job/list/?title=${title}&description=${description}&salary_min=${salary_min}&salary_max=${salary_max}&location=${location}&category=${category}`);
                setJobList(response.data.results);
            }
            catch(err){
                console.log(err);
            }
        }
        getJobs();
    },[title,description,location,salary_max,salary_min,category]);

    return (
        <div className="w-full h-full flex flex-col ">
            {jobList.map((job, index) => (
                <div
                    className="w-full h-[350px] flex flex-col mt-6 rounded-[6px] bg-[#1E1F25] p-8 transition-transform duration-300 hover:scale-[1.01]" key={index}>
                    <div className="w-full h-[60px] flex justify-start items-center">
                        <h2 className="text-[#CFD3DA] text-[30px] font-semibold">{job.title}</h2>
                    </div>
                    <div className="w-full h-[60px] flex justify-start items-center">
                        <h2 className="text-[#ADB3BF] text-[24px] font-[500]">{job.salary}$</h2>
                    </div>
                    <div className="w-full h-[120px] flex flex-row justify-between">
                        <div className="w-full h-[100px] flex flex-col justify-around items-start">
                            <h2 className="text-[#ADB3BF] text-[20px] font-[500]">{job.company}</h2>
                            <h2 className="text-[#ADB3BF] text-[20px] font-[500]">{job.location}</h2>
                        </div>
                        <div className="w-full h-[120px] flex justify-end items-center">
                            <img
                                src="https://static.insales-cdn.com/images/articles/1/5406/3224862/%D0%98%D0%BD%D1%81%D0%B5%D0%B9%D0%BB%D1%81_%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.jpg"
                                className="w-[64px] h-[64px] rounded-[4px]"/>
                        </div>
                    </div>
                    <div className="w-full h-[130px] flex justify-start items-center">
                        <button className="bg-[#1B70F1] w-[170px] h-[60px] rounded-[4px]">Find out more</button>
                    </div>
                </div>
            ))}
        </div>
    )
}