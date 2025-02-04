import {createCookie, Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import api from "../axiosInstance.js";

axios.defaults.withCredentials = true;

export function LoginUserApp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

        const handleLogin = async (e) => {
            e.preventDefault();
            if(!username){
                setError("Username is required");
            }
            if(!password){
                setError("Password is required");
            }else{
                try {
                    const response = await api.post("account/login/", {
                        username,
                        password,
                    })
                    if (response.status === 200) {
                        setStatus(response.data.status);
                        navigate("/");
                    }else{
                        setError("Invalid username or password");
                    }
                }catch (error) {
                    console.log(error.message);
                    setError("Something went wrong!");
                }
            }
        }

    return (
        <>
            <div className="w-screen h-screen bg-[#131517] flex min-h-[700px]">
                <div className="w-[40%] h-[100%] flex justify-center items-center">
                    <div className="w-[75%] h-[60%]">
                        <div className="w-[100%] h-[20%] flex justify-center items-center">
                            <h1 className="text-[36px] font-[500]">Log In</h1>
                        </div>
                        <div className="w-[100%] h-[65%]">
                            <form className="w-full h-full flex flex-col justify-between" onSubmit={handleLogin}>
                                <div className="w-full h-[27%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                                <div className="w-full h-[27%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full p-[16px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="password" type="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required/>
                                    <h2 className="text-[#F74E2C] text-[14px] my-2">{error}</h2>
                                </div>
                                <div className="w-full h-[20%] flex flex-col justify-between">
                                    <button className="rounded-[4px]" style={{backgroundColor:"#1c70ed"}} type="submit">Log in</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full h-[10%] flex justify-center items-center text-[16px]">
                            <p className="text-[#ADB3BF]">Don't Have an Account?</p>
                            <Link to="/account/register/user/" className="text-white ml-2 cursor-pointer">Sign Up Here</Link>
                        </div>
                    </div>
                </div>
                <div className="w-[60%] h-[100%] flex justify-center items-center">
                    <img src="/img.png" alt="" className="w-full h-full"/>
                </div>
            </div>
        </>
    )
}