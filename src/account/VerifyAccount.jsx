import {useAuth} from "../AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {Header} from "../Header.jsx";
import {useState,useEffect} from "react";
import api from "../axiosInstance.js";


export function VerifyAccount() {
    const {isAuthenticated,user,isCompany,email,isVerified} = useAuth();
    const navigate = useNavigate();


    if (isVerified) {
        navigate("/account/my_profile/");
    } else{
        useEffect(() => {
            const fetchData = async () => {
                const response = await api.get("account/verify/send_code/");
            }
            fetchData();
        }, []);
    }

    return (
        <>
            <Header />
            <div className="h-[calc(100vh-120px)] mt-[120px] w-screen min-h-[600px]  p-10 flex justify-center items-center bg-[#131517]">
                <div className="w-[350px] h-[400px]">
                    <div className="w-full h-[100px] flex justify-center items-center">
                        <h2 className="text-[36px] font-[500]">Verify email</h2>
                    </div>
                    <div className="w-full h-[170px]">
                        <form className="w-full h-full flex flex-col justify-between">
                            <div>
                                <label htmlFor="code" className="text-[16px]">Email</label>
                                <input
                                    className="w-full my-2 p-3 rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                    placeholder="Type here" id="code" type="number" max="6" min="6"
                                    required/>
                            </div>
                            <button className="rounded-[4px]" style={{backgroundColor: "#1c70ed"}} type="submit">Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}