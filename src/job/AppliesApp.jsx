import {Header} from "../Header.jsx";
import {Link} from "react-router-dom";
import {Logout} from "../account/Logout.jsx";
import {useEffect, useState} from "react";
import api from "../axiosInstance.js";

export function AppliesApp() {
    const [statusToggle, setStatusToggle] = useState("Applied");
    const [applies, setApplies] = useState([]);
    const [status, setStatus] = useState("Applies");


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`api/v1/job/applies/?status=${statusToggle}`);
                setApplies(response.data);
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[statusToggle]);


    const switchToApplied = () =>{
        setStatusToggle("Applied")
        setStatus("Applies")
    }

    const switchToRejected = () =>{
        setStatusToggle("Rejected")
        setStatus("Rejects")
    }

    const switchToAccepted = () =>{
        setStatusToggle("Accepted")
        setStatus("Accepts")
    }

    return (
        <>
            <Header/>
            <div className="h-full mt-[120px] w-screen min-h-[650px]  p-10 flex flex-col justify-between items-center bg-[#131517]">
                <div className="w-full h-full flex justify-between">
                    <div className="w-[20%] h-full">
                        <div className="h-[300px] w-full bg-[#1E1F25]">
                            <div className="h-[75px] w-full flex items-center justify-start px-5 bg-[#272A34]">
                                <h2 className="font-bold">Applies</h2>
                            </div>
                            <div
                                className={`h-[75px] w-full flex px-5 items-center justify-start cursor-pointer
        ${statusToggle === "Applied" ? "bg-[#1B70F1] text-white" : "bg-[#1E1F25] text-[#CFD3DA]"}`}
                                onClick={switchToApplied}
                            >
                                <h2 className="font-bold">Applied</h2>
                            </div>

                            <div
                                className={`h-[75px] w-full flex px-5 items-center justify-start cursor-pointer
        ${statusToggle === "Rejected" ? "bg-[#1B70F1] text-white" : "bg-[#1E1F25] text-[#CFD3DA]"}`}
                                onClick={switchToRejected}
                            >
                                <h2 className="font-bold">Rejected</h2>
                            </div>

                            <div
                                className={`h-[75px] w-full flex px-5 items-center justify-start cursor-pointer
        ${statusToggle === "Accepted" ? "bg-[#1B70F1] text-white" : "bg-[#1E1F25] text-[#CFD3DA]"}`}
                                onClick={switchToAccepted}
                            >
                                <h2 className="font-bold">Accepted</h2>
                            </div>

                        </div>
                    </div>
                    <div className="w-[70%] h-full">
                        {applies.length > 0 ? (
                            applies.map((apply, index) => (
                                <div
                                    className="w-full h-[300px] flex flex-col mb-6 rounded-[6px] bg-[#1E1F25] p-8 transition-transform duration-300 hover:scale-[1.01]"
                                    key={index}>
                                    <div className="w-full h-[50px] flex justify-start items-center">
                                        <h2 className="text-[#CFD3DA] text-[30px] font-semibold">{apply.job_title}</h2>
                                    </div>
                                    <div className="w-full h-[50px] flex justify-start items-center">
                                        <h2 className="text-[#ADB3BF] text-[24px] font-[500]">{apply.job_salary}$</h2>
                                    </div>
                                    <div className="w-full h-[100px] flex flex-row justify-between">
                                        <div className="w-full h-[90px] flex flex-col justify-around items-start">
                                            <h2 className="text-[#ADB3BF] text-[20px] font-[500]">{apply.job_company}</h2>
                                            <h2 className="text-[#ADB3BF] text-[20px] font-[500]">{apply.job_location}</h2>
                                        </div>
                                        <div className="w-full h-[100px] flex justify-end items-center">
                                            <img
                                                src="https://static.insales-cdn.com/images/articles/1/5406/3224862/%D0%98%D0%BD%D1%81%D0%B5%D0%B9%D0%BB%D1%81_%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.jpg"
                                                className="w-[80px] h-[80px] rounded-[4px]"/>
                                        </div>
                                    </div>
                                    <div className="w-full h-[100px] flex justify-start items-center">
                                        <Link className="bg-[#1B70F1] px-7 py-4 rounded-[4px]" to={`/job/vacancy/${apply.job_id}`}> Find out more</Link>
                                        <Link className="bg-[#888] px-7 py-4 ml-4 rounded-[4px]">Chat</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex justify-start items-start">
                                <h2>You still have no {status}</h2>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}