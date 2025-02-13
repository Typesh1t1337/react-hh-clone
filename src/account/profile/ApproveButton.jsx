import {useState} from "react";
import api from "../../axiosInstance.js";

export function ApproveButton({status, job_id,user,setIsSuccess,setStatusText,setApplies,applies}) {
    const [error, setError] = useState(null);
    const ApproveButton = async () => {
        try{
            const response = await api.post("api/v1/job/approve/",
                {
                    job_id:job_id,
                    user:user
                }
            )

            if (response.status === 200) {
                setStatusText("Approved");

                const newApplies = applies.filter(job => job.job_id !== job_id);
                setApplies(newApplies);

                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 1000);
            }
        } catch (error) {
            if(error.response) {
                if (error.response.status === 403) {
                    setError(error.response.data.error);
                }
                if (error.response.status === 400) {
                    setError(error.response.data.message);
                }
                if (error.response.status === 406) {
                    setError(error.response.data.error);
                }
            }
        }
    }
    return (
        status !== 'Approved' ? (
            <div
                className="bg-[#06B470] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                <button className="text-white" onClick={ApproveButton}>
                    <i className="bi bi-check-square-fill"></i>
                </button>
            </div>
        ) : null
    )

}