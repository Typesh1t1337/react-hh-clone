export function RejectButton({status, job_id}) {

    return (
         status !== 'Approved' ? (
             <div>
                 {status !== 'Rejected' ? (
                     <div
                         className="bg-[#F74E2C] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                         <button className="text-white">
                             <i className="bi bi-x-square-fill"></i>
                         </button>
                     </div>
                 ) : null
                 }
             </div>
         ) : null
    )
}