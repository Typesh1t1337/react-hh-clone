import {useState} from "react";

export function AddJobExperience({experiences,setExperiences}) {
    const handleChange = (id,field,value) => {
        const newExperiences = [...experiences];
        newExperiences[id][field] = value;
        setExperiences(newExperiences);
    }


    const addExperience = () => {
        setExperiences([...experiences, {company:"",started:"", finished:""}]);
    }

    const removeExperience = (id) => {
        setExperiences(experiences.filter((_, i) => i !== id));
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-center items-center mt-6">
                <div className="w-[60%]">
                    <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                        Experience
                    </label>
                    <h2 className="mt-2 text-[12px] text-[#8a8a8a]">
                        leave this blank empty if you have no work experience
                    </h2>
                </div>
            </div>
            {experiences.map((experience, index) => (
                <div className="w-full mb-6 flex flex-col items-center" key={index}>
                    <div className="w-[60%] my-4">
                        <div className="my-3">
                        <label className="text-[#CFD3DA] text-[14px]">
                            Corporation
                            </label>
                            <input placeholder="Type here"
                                   className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                   type="text" value={experience.company} onChange={(e) => handleChange(index, "company", e.target.value)}/>
                        </div>
                        <div className="my-3">
                            <label className="text-[#CFD3DA] text-[14px]">
                                Started at
                            </label>
                            <input placeholder="Started"
                                   className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                   type="date" value={experience.started} onChange={(e) => handleChange(index, "started", e.target.value)}/>
                        </div>
                        <div className="my-3">
                            <label className="text-[#CFD3DA] text-[14px]">
                                Finished at
                            </label>
                            <input placeholder="Finished"
                                   className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                                   type="date" value={experience.finished} onChange={(e) => handleChange(index,"finished", e.target.value)}/>
                            {index!==0 && (
                                <div className="w-full flex justify-end">
                                    <h2 className="underline text-[14px] text-[#F74E2C] my-2 cursor-pointer"
                                        onClick={() => removeExperience(index)}>Remove experience</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))
            }
            <div className="w-full my-2 flex justify-center items-center">
                <div className="w-[60%] flex justify-end">
                    <h2 className="text-[#1B70F1] underline text-[14px] cursor-pointer" onClick={() => addExperience()}>Add one
                        more</h2>
                </div>
            </div>
        </div>
    )
}