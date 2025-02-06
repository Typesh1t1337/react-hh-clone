import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";


export function Professions({onSendData,design}) {
    const [categories, setCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/v1/job/categories/');
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[])

    const setData = (event) =>{
        const category = event.target.value;
        setChosenCategory(category);
        onSendData(category);
    }

    return (
        design === 1 ? (
            <select id="city" name="professions" className="bg-[#272A34] px-1 py-4 rounded-[4px] text-[14px]" value={chosenCategory} onChange={setData}>
                <option value="" disabled selected>Choose Profession</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select>
            ) : design === 2 ? (
            <select id="city" name="professions" className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-[45%] text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px]"
                    value={chosenCategory} onChange={setData}>
                <option value="" disabled selected>Choose Profession</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select>
    ) : null
)
}