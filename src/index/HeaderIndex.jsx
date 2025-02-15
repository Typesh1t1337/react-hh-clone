import background from "/img_3.png";
import sfd from "/img_4.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function HeaderIndex(){
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        sessionStorage.setItem("searchResult", search);
        navigate("/job/search/vacancy/");
    }
    return (
        <div style={{backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
             className="relative w-screen h-[calc(100vh-120px)] min-h-[600px] mt-[120px] bg-[#131517] flex justify-center items-center">
            <div className="inset-0 w-[80%] h-[300px] bg-blue-500 blur-3xl opacity-10 mx-auto"></div>
            <div className="w-full h-full absolute flex top-0 left-0">
                <div className="w-[50%] h-full flex justify-center items-center">
                    <div className="w-[100%]  h-[76%] flex flex-col pl-20 mt-[14%] mb-[10%]">
                        <div className="flex items-center">
                            <div className="w-[20px] h-[3px] bg-[#1B70F1] mr-3"/>
                            <h2 className="text-[24px] text-[#1B70F1] font-bold">Job on demand</h2>
                        </div>
                        <div className="w-[100%] mt-1 mb-8">
                            <h2 className="text-[54px] text-[#CFD3DA] leading-[65px]"><span
                                className="font-bold text-white mr-3">Join us today!</span>And Build
                                Your Best Career</h2>
                        </div>
                        <div>
                            <h3 className="text-[#ADB3BF] text-justify text-[12px]">Welcome to Job on Demand, where top
                                companies meet the best talent. Whether you're looking for your next career move or
                                hiring top professionals, we make job searching simple, fast, and effective.</h3>
                        </div>
                        <div className="w-full flex mt-16">
                            <input placeholder="Search vacancies"
                                   className="border-[1px] border-[#FFFFFF33] px-2 py-2 w-[300px] h-[45px] rounded-[4px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="bg-[#1B70F1] rounded-[4px] ml-3 h-[45px]" onClick={handleSearch}>Search</button>
                        </div>
                        <div className="w-full flex mt-10 justify-between">
                            <div className="flex flex-col w-[20%] items-start justify-center py-4">
                                <h2 className="text-white text-[40px] font-bold">2M +</h2>
                                <h2 className="text-[#CFD3DA] text-[12px]">Trusted users</h2>
                            </div>
                            <div className="flex justify-center items-center w-[20%]">
                                <div className="w-[1px] h-[60%] bg-[#FFFFFF]"/>
                            </div>
                            <div className="flex flex-col w-[20%] items-start justify-center py-4">
                                <h2 className="text-white text-[40px] font-bold">10M +</h2>
                                <h2 className="text-[#CFD3DA] text-[12px]">Vacancies</h2>
                            </div>
                            <div className="flex justify-center items-center w-[20%]">
                                <div className="w-[1px] h-[60%] bg-[#FFFFFF]"/>
                            </div>
                            <div className="flex flex-col w-[20%] items-start justify-center py-4">
                                <h2 className="text-white text-[40px] font-bold">10+</h2>
                                <h2 className="text-[#CFD3DA] text-[12px]">Years of experience</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] h-full flex justify-center items-center">
                    <img src={sfd} className="h-[80%] w-[100%]"/>
                </div>
            </div>
        </div>
    )
}