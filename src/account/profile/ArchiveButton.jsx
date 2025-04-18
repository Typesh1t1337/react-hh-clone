import api from "../../axiosInstance.js";
import {useState} from "react";

export function ArchiveButton({status,user, job_id,setIsSuccess,setStatusText,setApplies,applies}) {
     const [error, setError] = useState(null);

    const handleArchive = async () => {
        try{
            const response = await api.post('api/v1/job/archive/', {
                job_id:job_id,
                user:user
            })

            if(response.status === 200){
                setStatusText('archived');
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
                    console.log(error.response.error);
                }
                if (error.response.status === 406) {
                    setError(error.response.data.error);
                }
            }
        }
    }

    return (
        status !== "Applied" && status !== "Archived" ? (
            <div
                className="bg-[#8a8a8a] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                <button className="text-white" onClick={handleArchive}>
                    <i className="bi bi-archive-fill"></i>
                </button>
            </div>
        ) : null
    )
}