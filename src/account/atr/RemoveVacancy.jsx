import api from "../../axiosInstance.js";

export function RemoveVacancy({vacancy_id,setIsWarned,setIsSuccess,setVacancies}) {

    const deleteVacancy = async (e) => {
        e.preventDefault();
        try{
            const response = await api.delete(`api/v1/job/remove/${vacancy_id}/`);
            if (response.status === 200) {
                setIsWarned(false);
                setIsSuccess(true);
                setVacancies((prev) => prev.filter(v=> v.id !== vacancy_id));
                setTimeout(() => setIsSuccess(false), 2000);
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={deleteVacancy}>
            <button type="submit" className="px-6 h-[48px] bg-[#F74E2C] shadow-xl ml-2 text-white rounded-[4px]">
                Remove
            </button>
        </form>
    )
}