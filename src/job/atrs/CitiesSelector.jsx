import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";

export function CitiesSelector({onSendData,design}){
    const [cities, setCities] = useState([]);
    const [chosenCity, setChosenCity] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('api/v1/job/cities/');
                setCities(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[]);

    const handleSelection = (event) => {
        const city = event.target.value;
        onSendData(city);
        setChosenCity(city);
        localStorage.setItem('cities',city);
    }


    return (
        design === 1 ? (
            <select id="city" name="cities" className="bg-[#272A34] px-1 w-[50%] py-4 text-[14px] rounded-[4px]"
                    value={chosenCity} onChange={handleSelection}>
                <option value="" selected disabled>Choose city</option>
                {cities.map((city) => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                ))}
            </select>
        ) : design===2 ? (
            <select id="city" name="cities" className=" px-2 border-grey-300 border-[1px] rounded-[2px]  w-[60%] text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px]"
                    value={chosenCity} onChange={handleSelection}>
                <option value="" selected disabled>Choose city</option>
                {cities.map((city) => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                ))}
            </select>
        ) : null
    )
}