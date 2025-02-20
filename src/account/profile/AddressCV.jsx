import {useEffect, useRef, useState} from "react";
import api from "../../axiosInstance.js";

export function AddressCV({search,setSearch}){
    const[addresses,setAddresses] = useState([]);
    const resultRef = useRef();
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {

        if(search.length === 0){
            setAddresses([]);
        }

        if(isSelected) return;

        const timeout =  setTimeout(()=> {
            if(search.length>3){
                handleSearch();
            }
        },300);

        return () => clearTimeout(timeout);
    }, [search]);


    const handleSearch = async () => {
        try{
            const response = await api.get(`api/v1/address/${search}/`);
            if(response.status === 200){
                setAddresses(response.data.result);
                console.log(response.data.result);
            }
        }catch(err){
            console.log(err.message);
            setAddresses([]);
        }
    };

    const handleSelection = (selectedCategory) => {
        setSearch(selectedCategory);
        setAddresses([]);
        setIsSelected(true);
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultRef.current && !resultRef.current.contains(event.target)) {
                setAddresses([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full my-6 flex flex-col items-center">
            <div className="w-[60%] flex flex-col my-6 relative">
                <label className="text-[#CFD3DA] text-[14px]">
                    Address <span className="text-[#FC4747]">*</span>
                </label>
                <input
                    placeholder="Type here"
                    className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2" value={search} onChange={(e)=>setSearch(e.target.value)} onClick={() => setIsSelected(false)} />
                {addresses.length > 0 && (
                    <div className="absolute w-full max-h-[200px] bg-[#272A34] top-[70px] overflow-scroll" ref={resultRef}>
                        {addresses.map((address, index) => (
                            <div className="w-full my-2 py-2 px-4 cursor-pointer" key={index} onClick={()=>handleSelection(address.description)}>
                                <h2>{address.description}</h2>
                            </div>
                        ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}