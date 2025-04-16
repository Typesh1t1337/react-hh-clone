import {Header} from "../Header.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {JobCard} from "./JobCard.jsx";
import {Professions} from "./atrs/ProfSelector.jsx";
import api from "../axiosInstance.js";
import {AuthProvider} from "../AuthContext.jsx";
import {CitiesSelector} from "./atrs/CitiesSelector.jsx";
import {JobPagination} from "./JobPagination.jsx";
import {useParams, useSearchParams} from "react-router-dom";


export function JobApp() {
    const searchResult = sessionStorage.getItem("searchResult") || "";
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
    const [title, setTitle] = useState(searchParams.get("title") || searchResult);
    const [minSalary, setMinSalary] = useState(searchParams.get("min_salary") || "");
    const [maxSalary, setMaxSalary] = useState(searchParams.get("max_salary") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const page = parseInt(searchParams.get("page")) || 1;
    const design = 1;


    const updateSearchParams = (newFilters) => {
        const updatedParams = {
            ...Object.fromEntries(searchParams.entries()),
            ...newFilters
        };

        // Убираем пустые параметры из URL
        Object.keys(updatedParams).forEach((key) => {
            if (!updatedParams[key]) {
                delete updatedParams[key];
            }
        });

        setSearchParams(updatedParams);
    };


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        updateSearchParams({"title": event.target.value});
    }


    const handleMinSalaryChange = (event) => {
        setMinSalary(event.target.value);
        updateSearchParams({"min_salary": event.target.value});
    }
    const handleMaxSalaryChange = (event) => {
        setMaxSalary(event.target.value);
        updateSearchParams({"max_salary": event.target.value});
    }

    const handleDataFromSelector = (data) =>{
        setCategory(data);
        updateSearchParams({"category": data.category});
    }

    const handleDataFromSelectorCity = (data) =>{
        setSelectedCity(data);
        updateSearchParams({"city": data.category});
    }


    return (
        <>
            <AuthProvider>
                <Header/>
                <div className="w-screen mt-[120px] h-full min-h-screen p-10 flex justify-between items-start bg-[#131517]">
                    <div className="w-full h-full flex flex-row justify-between items-start">
                        <div className="w-[30%] h-full">
                            <div className="bg-[#1E1F25] w-full h-[500px] rounded-[6px]">
                                <div
                                    className="w-full h-[92px] flex justify-start items-center bg-[#272A34] rounded-tr-[6px] rounded-tl-[6px]">
                                    <h2 className="text-[24px] font-[400] ml-6">Filters</h2>
                                </div>
                                <div className="w-full h-[120px] flex flex-col items-start justify-around px-6">
                                    <h2>City</h2>
                                    <CitiesSelector onSendData={handleDataFromSelectorCity} design={design} />
                                </div>
                                <div className="w-full h-[120px] flex flex-col items-start justify-around px-6">
                                    <h2>Profession</h2>
                                    <Professions onSendData={handleDataFromSelector} design={design} />
                                </div>
                                <div className="w-full h-[150px] flex flex-col items-start justify-around px-6">
                                    <div className="w-full flex items-center justify-start">
                                        <h2>Salary between</h2>
                                    </div>
                                    <div className="w-full h-[100px]  flex items-center justify-between">
                                        <input placeholder="from" className="bg-[#272A34] w-[45%] py-4 pl-[2%] rounded-[4px]" type="number" value={minSalary} onChange={handleMinSalaryChange}/>
                                        <input placeholder="to" className="bg-[#272A34] w-[45%] py-4 pl-[2%] rounded-[4px]" type="number" value={maxSalary} onChange={handleMaxSalaryChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[68%] h-full flex flex-col">
                            <div className="bg-[#1E1F25] w-full h-[92px] flex justify-center items-center rounded-[6px]">
                                <div className="w-[95%] h-full flex justify-start items-center relative">
                                    <input placeholder="Search" className="bg-[#272A34] p-3 w-[500px] rounded-[4px]" value={title} onChange={handleTitleChange}/>
                                    <button className="absolute text-[20px] right-[300px]">
                                        <i className="bi bi-search" />
                                    </button>
                                </div>
                            </div>
                            <JobCard title={title} location={selectedCity} salary_max={maxSalary} salary_min={minSalary} category={category} page={page} />
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </>
    )
}