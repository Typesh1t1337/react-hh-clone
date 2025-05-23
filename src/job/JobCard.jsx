import {useEffect, useState} from "react";
import axios from "axios";
import api from "../axiosInstance.js";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {JobPagination} from "./JobPagination.jsx";


export function JobCard({title,location,salary_min,salary_max,category,page}) {
    const [jobList, setJobList] = useState([]);
    const [paginationSize, setPaginationSize] = useState(null);


    useEffect(() => {
        const getJobs = async () => {
            try{
                const response = await api.get(`api/v1/job/list/?search=${title}&salary_min=${salary_min}&salary_max=${salary_max}&location=${location}&category=${category}&page=${page}`);
                setJobList(response.data.results);
                setPaginationSize(response.data.count);
                console.log(response.data.count);
            }
            catch(err){
                console.log(err);
            }
        }
        getJobs();
    },[title,location,salary_max,salary_min,category]);

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
                    <div className="w-full h-[100px] flex flex-col">
                        <div className="w-full h-[80px] flex justify-start items-center">
                            <Link to={`/job/vacancy/${job.id}`} className="bg-[#1B70F1] px-7 py-4 rounded-[4px]">Find out more</Link>
                            {job.status ? (
                                <Link to={`/chat/conversation/${job.chat_id}/${job.company}`} className="px-5 py-4 bg-[#8a8a8a] rounded-[4px] ml-2">Chat</Link>
                            ) : null
                            }
                        </div>
                        <div className="h-[20px] w-full">
                            {job.status === "Applied" ? (
                                <h2 className="text-[#8a8a8a] text-[14px]">Your applied to this vacancy</h2>
                            ) : job.status === "Approved" ? (
                                <h2 className = "text-[#06B470] text-[14px]" > Your assign to job has been approved!</h2>
                            ) : job.status === "Rejected" ? (
                                <h2 className="text-[#F74E2C] text-[14px]"> Your assign to job has been rejected!</h2>
                            ) : null
                            }
                        </div>
                    </div>
                </div>
            ))}
            <JobPagination paginationSize={paginationSize} page={page} />
        </div>
    )
}