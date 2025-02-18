import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";


export function SelectSkills({selectedCategory,chosenSkill, setChosenSkill}) {
    const [allSkills, setAllSkills] = useState([]);
    const [searchSkill, setSearchSkill] = useState("");
    const[filteredSkills, setFilteredSkills] = useState([]);
    useEffect(() => {
        const fetchSkills = async () => {
            try{
                const response = await api.get(`api/v1/job/list/skills/?related_names=${selectedCategory}`)
                if(response.status === 200){
                    setAllSkills(response.data);
                    setFilteredSkills(response.data.slice(0,10));
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchSkills();
    },[selectedCategory]);

    const addToChosenSkill = (skill) => {
        setChosenSkill((prev) => prev.some(s => s.name === skill.name) ?  prev : [...prev, skill]);
        const newArray = filteredSkills.filter(s => s.name !== skill.name);
        setFilteredSkills(newArray);

        const nextSkill = allSkills.find(s => !chosenSkill.includes(s) && !filteredSkills.includes(s));
        if(nextSkill && nextSkill.name.toLowerCase().includes(searchSkill.toLowerCase())) {
            setFilteredSkills(prev => [...prev, nextSkill]);
        }
    }

    const removeFromChosenSkill = (skill) => {
        const newArray = chosenSkill.filter(s => s.name !== skill.name);
        setChosenSkill(newArray);
        setFilteredSkills((prev) => prev.some(s => s.name === skill.name) ? prev : [...prev, skill]);

        if(filteredSkills.length >= 10){
            const newArray = filteredSkills.slice(0,10);
            setFilteredSkills(newArray);
        }
    }

    useEffect(() => {
        if(searchSkill.trim() === ""){
            setFilteredSkills(allSkills.slice(0,10));
        }else{
            setFilteredSkills(allSkills.filter(s => s.name.toLowerCase().includes(searchSkill.toLowerCase())));
        }
    }, [searchSkill,allSkills]);

    return (
        <div className="w-full my-6 flex flex-col items-center">
            <div className="w-[60%] my-2">
                <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                    Choose skillsets <span className="text-[#FC4747]">*</span>
                </label>
            </div>
            <div className="relative w-[60%]">
                <input placeholder="Type here"
                       className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px]"
                value={searchSkill}
                       onChange={e => setSearchSkill(e.target.value)}
                />
                <i className="bi bi-search absolute right-[10px] top-[8px]"></i>
            </div>
            <div className="w-[60%] my-4 flex flex-wrap">
                {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill,index) => (
                            <div className="px-3 py-3 rounded-[6px] mr-4 mb-4 bg-[#272A34] cursor-pointer" key={index} onClick={() => addToChosenSkill(skill)}>
                                {skill.name}
                            </div>
                        ))
                ) : (
                    <h2 className="text-[14px] m-4 text-[#ADB3BF]">First of all choose the occupation</h2>
                )
                }
            </div>
            <div className="bg-[#272A34] w-[60%] min-h-[20px] rounded-[6px] flex flex-wrap px-2 py-2">
                {
                    chosenSkill.length > 0 ? (
                        chosenSkill.map((skill, index) => (
                            <div className="px-3 py-3 rounded-[6px] mr-4 my-2 border-[1px] border-[#1B70F1] text-[#1B70F1] cursor-pointer" key={index} onClick={() => removeFromChosenSkill(skill)}>
                                {skill.name}
                            </div>
                        ))
                    ) : (
                        <h2 className="m-4 text-[#ADB3BF]">Skills are not chosen yet</h2>
                    )
                }
            </div>
        </div>
    )
}