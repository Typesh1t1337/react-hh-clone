import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";
import {useAuth} from "../../AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Header} from "../../Header.jsx";


export function CompanyApplyList(){
    const [applies, setApplies] = useState([]);
    const {isAuthenticated,user,isCompany,loading} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("Applies");
    const [isLoading,setIsLoading] = useState(true);
    const [statusToggle, setStatusToggle] = useState("Applied");

    useEffect(() => {
        if(isLoading){
            setIsLoading(false);
        }
    });

    useEffect(() => {
        if(!isCompany && !isLoading){
            navigate("/");
        }
    }, [isCompany]);



    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await api.get(`api/v1/job/assignments/retrieve/?status=${statusToggle}`);
                setApplies(response.data.results);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    },[isCompany]);

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
            <Header />
            <div className="w-screen flex flex-col h-min-[650px] p-10 mt-[120px] bg-[#131517]">
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
                    <div className="w-[70%] h-full flex justify-start items-center flex-col">
                        {applies.map((apply, index) => (
                            <div className="w-full h-[220px] bg-[#1E1F25] rounded-[6px] mb-8 transition-transform duration-300 hover:scale-[1.01] p-8">
                                <div className="w-full h-[100px] flex flex-col justify-between" key={index}>
                                    <Link to={`/account/profile/${apply.user_username}`} style={{textDecoration:"underline", color:"#1B70F1"}} className="text-[20px]">{apply.user_username}</Link>
                                    <h2>{apply.user_email}</h2>
                                    <h2 className="text-[14px]">status: {apply.status}</h2>
                                </div>
                                <div className="w-full py-4 items-center flex">
                                    <div className="flex">
                                        <div
                                            className="bg-[#1B70F1] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                                            <a href={`http://127.0.0.1:5173/job/vacancy/${apply.job_id}/`}
                                               target="_blank" rel="noopener noreferrer"
                                               className="text-white">
                                                <i className="bi bi-arrow-up-right-square-fill">
                                                </i>
                                            </a>
                                        </div>
                                        <div
                                            className="bg-[#06B470] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                                            <h2 className="text-white">
                                                <i className="bi bi-check-square-fill"></i>
                                            </h2>
                                        </div>
                                        <div className="bg-[#F74E2C] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                                            <h2 className="text-white">
                                                <i className="bi bi-check-square-fill"></i>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}