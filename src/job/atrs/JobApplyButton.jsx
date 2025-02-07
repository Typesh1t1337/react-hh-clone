import api from "../../axiosInstance.js";
import {useEffect, useState} from "react";

export function JobApplyButton({jobId, applyStatus, setApplyStatus,success,setSuccess,jobCompany}) {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('api/v1/job/apply/',
                {
                    job_id: jobId,
                    company: jobCompany,
                }
            );
            if (response.status === 200) {
                setApplyStatus("Applied");
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
        } catch (error){
            console.log(error.message);
            setError("something went wrong");
            if (error.response.data.error){
                setError(error.response.data.error);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-[12px] text-[#F74E2C] my-2">{error}</h2>
                <button type="submit" className="bg-[#1B70F1] w-[150px] py-4 text-white rounded-[4px]">
                    Apply
                </button>
        </form>
    )
}