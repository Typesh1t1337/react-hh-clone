import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";
import {useAuth} from "../../AuthContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Header} from "../../Header.jsx";
import {ApproveButton} from "./ApproveButton.jsx";
import {RejectButton} from "./RejectButton.jsx";
import "../../Styles.css"
import {ArchiveButton} from "./ArchiveButton.jsx";
import {DeleteButton} from "./deleteButton.jsx";


export function CompanyApplyListApp(){
    const [applies, setApplies] = useState([]);
    const {isAuthenticated,user,isCompany,loading} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const status = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [statusToggle, setStatusToggle] = useState("Applied");
    const [isSuccess,setIsSuccess] = useState(false);
    const [statusText,setStatusText] = useState(null);


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
    },[isCompany,statusToggle]);

    const switchToApplied = () =>{
        setStatusToggle("Applied")
        navigate(`/account/vacancies/${user}/applied/`);
    }

    const switchToRejected = () =>{
        setStatusToggle("Rejected")
        navigate(`/account/vacancies/${user}/rejected/`);

    }

    const switchToAccepted = () =>{
        setStatusToggle("approved")
        navigate(`/account/vacancies/${user}/approved/`);
    }

    const switchToArchived = () =>{
        setStatusToggle("archived");
        navigate(`/account/vacancies/${user}/archived/`);

    }


    return (
        <>
            <Header />
            {
                isSuccess && (
                    <div
                        className="notification absolute bg-[#06B470] w-[400px] h-[40px] z-100 flex justify-start items-center px-2 right-0">
                        <h2>The Users Assignment is successfully {statusText}</h2>
                    </div>
                )
            }
            <div className="w-screen flex flex-col min-h-[650px] p-10 mt-[120px] bg-[#131517]">
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
                                        ${statusToggle === "approved" ? "bg-[#1B70F1] text-white" : "bg-[#1E1F25] text-[#CFD3DA]"}`}
                                onClick={switchToAccepted}
                            >
                                <h2 className="font-bold">Approved</h2>
                            </div>
                            <div
                                className={`h-[75px] w-full flex px-5 items-center justify-start cursor-pointer
                                        ${statusToggle === "archived" ? "bg-[#1B70F1] text-white" : "bg-[#1E1F25] text-[#CFD3DA]"}`}
                                onClick={switchToArchived}
                            >
                                <h2 className="font-bold">Archived</h2>
                            </div>

                        </div>
                    </div>
                    <div className="w-[70%] h-full flex justify-start items-center flex-col">
                        {applies.length > 0 ? (
                            applies.map((apply, index) => (
                                <div
                                    className="w-full h-[220px] bg-[#1E1F25] rounded-[6px] mb-8 transition-transform duration-300 hover:scale-[1.01] p-8">
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
                                               <ApproveButton status={apply.status} user={apply.user_username} job_id={apply.job_id} setIsSuccess={setIsSuccess} setStatusText={setStatusText} setApplies={setApplies} applies={applies} />
                                               <RejectButton status={apply.status} user={apply.user_username} job_id={apply.job_id} setIsSuccess={setIsSuccess} setStatusText={setStatusText} setApplies={setApplies} applies={applies} />
                                                <ArchiveButton status={apply.status} user={apply.user_username} job_id={apply.job_id} setIsSuccess={setIsSuccess} setStatusText={setStatusText} setApplies={setApplies} applies={applies} />
                                                <DeleteButton  status={apply.status} user={apply.user_username} job_id={apply.job_id} setIsSuccess={setIsSuccess} setStatusText={setStatusText} setApplies={setApplies} applies={applies} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No one get status {statusToggle.toLowerCase()} detected to your vacancies</h1>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}