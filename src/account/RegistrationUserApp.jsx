import {Link, useNavigate} from "react-router-dom";
import api from "../axiosInstance.js";
import {useState} from "react";

export function RegistrationUserApp() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username){
            setError("Username is required");
            return;
        }
        if(!password) {
            setError("Password is required");
            return;
        }if (!email) {
            setError("Email is required");
            return;
        }if(!firstName || !lastName) {
            setError("full name is required");
            return;
        }if(password !== secondPassword) {
            setError("Passwords do not match");
            return;
        }
        try{
            const response = await api.post("account/register/user/", {
                username: username,
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
            })
            if (response.status===200) {
                navigate("/");
            }
        }
        catch(err){
                console.log(err.message);
                setError("Something went wrong");
        }
    }

    return (
        <>
            <div className="w-screen h-screen bg-[#131517] flex min-h-[700px]">
                <div className="w-[40%] h-[100%] flex justify-center items-center">
                    <div className="w-[75%] h-[95%]">
                        <div className="w-[100%] h-[15%] flex justify-center items-center">
                            <h1 className="text-[36px] font-[500]">Sign Up</h1>
                        </div>
                        <div className="w-[100%] h-[75%]">
                            <form className="w-full h-full flex flex-col justify-between" onSubmit={handleSubmit}>
                                <div className="w-full h-[13%] flex justify-between">
                                    <div className="w-[45%] h-[100%] flex flex-col justify-between items-start">
                                        <label className="text-[16px]" htmlFor="first_name">
                                            First Name
                                        </label>
                                        <input
                                            className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                            placeholder="Type here" id="first_name" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className="w-[45%] h-[100%] flex flex-col justify-between items-start">
                                        <label className="text-[16px]" htmlFor="last_name">
                                            last Name
                                        </label>
                                        <input
                                            className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                            placeholder="Type here" id="last_name" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Username
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Email
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Password
                                    </label>
                                    <input
                                        className="w-full p-[16px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Confirm password
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="password" required
                                        value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)}/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <h2 className="text-[#F74E2C] text-[14px] my-2">{error}</h2>
                                    <button className="rounded-[4px]" style={{backgroundColor: "#1c70ed"}}
                                            type="submit">Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full h-[10%] flex justify-center items-center text-[16px]">
                            <p className="text-[#ADB3BF]">Have an Account?</p>
                            <Link to="/account/login/" className="text-white ml-2 cursor-pointer">Login Here</Link>
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