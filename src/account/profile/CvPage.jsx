import {useAuth} from "../../AuthContext.jsx";

export function CvPage(){
    const {isAuthenticated,user,isCompany,cv,firstName, lastName} = useAuth();

    return(
        <div className="w-[70%] rounded-[2px]">
            <div className="w-full flex items-center p-6 justify-between bg-[#1E1F25]">
                <div>
                    <h2 className="font-bold text-[20px]">{firstName} {lastName}</h2>
                    <div className="flex items-center justify-center">
                        <h2 className="text-[#ADB3BF] mr-2">Backend Developer</h2>
                        <h2 className="text-[#ADB3BF] my-3">CV</h2>
                    </div>
                </div>
                <div className="flex items-center justify-between w-[55%]">
                    <div
                        className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center">
                        <h2 className="font-bold text-[18px]">Applies</h2>
                        <h2 className="text-[#ECEEF0] mt-2">10</h2>
                    </div>
                    <div
                        className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center">
                        <h2 className="font-bold text-[18px]">Accepts</h2>
                        <h2 className="text-[#ECEEF0] mt-2">10</h2>
                    </div>
                    <div
                        className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center">
                        <h2 className="font-bold text-[18px]">Rejects</h2>
                        <h2 className="text-[#ECEEF0] mt-2">10</h2>
                    </div>
                    <div
                        className="bg-[#272A34] w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center items-center">
                        <a className="text-[#06B470] text-[40px]" target="_blank" href={`${cv}`}>
                            <i className="bi bi-file-earmark-arrow-down-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full my-6 px-6 py-6 bg-[#1E1F25]">
                <div className="w-full">
                    <div className="w-full flex py-2 items-center justify-start">
                        <h2 className="text-[20px] font-bold">Crucial skills</h2>
                    </div>
                    <div className="w-full flex flex-wrap my-2">
                        <div className="bg-[#272A34] px-3 py-3 rounded-[6px] mr-4 mb-4">
                            Javascript
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full flex py-2 items-center justify-start">
                        <h2 className="text-[20px] font-bold">Languages</h2>
                    </div>
                    <div className="w-full flex flex-wrap my-2">
                        <div className="bg-[#272A34] px-3 py-3 rounded-[6px] mr-4 mb-4">
                            Javascript
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full flex py-2 items-center justify-start">
                        <h2 className="text-[20px] font-bold">Work experience</h2>
                    </div>
                    <div className="w-full flex flex-col my-2">
                        <div className="bg-[#272A34] px-3 py-3 rounded-[6px] w-[100%] my-2">
                            <h2 className="text-[16px] text-[#ADB3BF]">onai 5 лет </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}