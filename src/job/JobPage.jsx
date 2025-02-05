import {useAuth} from "../AuthContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import api from "../axiosInstance.js";
import {Header} from "../Header.jsx";
import {JobApplyButton} from "./atrs/JobApplyButton.jsx";
import "../Styles.css"
import {SimilarJobs} from "./SimilarJobs.jsx";


export function JobPage() {
    const {isAuthenticated,user,isCompany} = useAuth();
    const {jobId} = useParams();
    const[error, setError] = useState(null);
    const [jobInfo, setJobInfo] = useState({});
    const [applyStatus, setApplyStatus] = useState("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/v1/job/info/${jobId}/`);
                if (response.status === 200) {
                    setJobInfo(response.data.job_info);
                    if (isAuthenticated && response.data.status !== "Not applied") {
                        setApplyStatus(response.data.status);
                    }
                }
            } catch (error) {
                console.log(error.message);
                if (error.response && error.response.status === 404) {
                    navigate("/");
                } else {
                    setError("Something went wrong");
                }
            }
        }
        fetchData();
    },[isAuthenticated,applyStatus]);


    return (
        <>
            {success ? (
                <div
                    className="notification absolute bg-[#06B470] w-[300px] h-[40px] z-100 flex justify-start items-center px-2 right-0">
                    <h2>You successfully applied</h2>
                </div>
            ) : null
            }
            <Header/>
            <div
                className="h-full mt-[120px] w-screen min-h-[650px]  p-10 flex flex-col justify-between items-center bg-[#131517]">
            <div className="h-full w-[700px] bg-[#1E1F25] p-10 rounded-[6px] mb-10">
                    <div className="mb-3">
                        <h2 className="text-[30px] font-bold">{jobInfo.title}</h2>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-[20px]">Salary: {jobInfo.salary}$</h3>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-[20px]">City: {jobInfo.location}</h3>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-[20px]">Corporation: {jobInfo.company}</h3>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-[20px]">Category: {jobInfo.category}</h3>
                    </div>
                    <div className="mt-12">
                        {isAuthenticated ? (
                            isCompany ? (
                                <a className="bg-[#888] px-6 py-4 rounded-[4px]">
                                    Can't apply
                                </a>
                            ) : (
                                applyStatus === "Applied" ? (
                                    <div>
                                        <a className="bg-[#888] px-6 py-4 rounded-[4px]">
                                            You already applied
                                        </a>
                                    </div>
                                ) : applyStatus === "Rejected" ? (
                                    <div>
                                        <a className="bg-[#F74E2C] px-10 py-4 rounded-[4px]">
                                            Your apply rejected
                                        </a>
                                    </div>
                                ) : applyStatus === 'Approved' ? (
                                    <div>
                                        <a className="bg-[#06B470] px-10 py-4 rounded-[4px]">
                                            Your apply accepted
                                        </a>
                                    </div>
                                ) : (
                                    <JobApplyButton jobId={jobId} applyStatus={applyStatus}
                                                    setApplyStatus={setApplyStatus} setSuccess={setSuccess}
                                                    success={success}/>
                                )
                            )
                        ) : (
                            <Link to="/account/login" className="bg-[#1B70F1] px-10 py-4">
                                Apply
                            </Link>
                        )
                        }
                    </div>
                </div>
                <div className="h-full w-[700px] bg-[#1E1F25] p-10 rounded-[6px]">
                    <h2 className="text-[#ADB3BF]">{jobInfo.description}</h2>
                </div>
                <div className="h-full w-[700px] my-20">
                    <SimilarJobs jobId={jobId} />
                </div>
            </div>
        </>
    )
}