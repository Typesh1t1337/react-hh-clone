import {useEffect, useState} from "react";
import axios from "axios";


export function Professions({onSendData}) {
    const [categories, setCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://0.0.0.0:8001/api/v1/job/categories/');
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
        <select id="city" name="professions" className="bg-[#272A34] px-5 py-4 rounded-[4px]" value={chosenCategory} onChange={setData}>
            <option value="" disabled selected>Choose Profession</option>
            {categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
            ))}
        </select>
    )
}