import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";


export function Professions({onSendData}) {
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
        <select id="city" name="professions" className="bg-[#272A34] px-1 py-4 rounded-[4px] text-[14px]" value={chosenCategory} onChange={setData}>
            <option value="" disabled selected>Choose Profession</option>
            {categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
            ))}
        </select>
    )
}