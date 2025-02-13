export function ArchiveButton({status}) {
    return (
        status !== "Applied" && status !== "Archived" ? (
            <div
                className="bg-[#8a8a8a] text-[20px] mr-4 cursor-pointer rounded-[4px] w-[40px] h-[40px] flex justify-center items-center">
                <button className="text-white">
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        ): null
    )
}