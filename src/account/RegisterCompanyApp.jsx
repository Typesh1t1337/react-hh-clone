import {Link} from "react-router-dom";


export function RegisterCompanyApp() {
    return (
        <>
            <div className="w-screen h-screen bg-[#131517] flex">
                <div className="w-[40%] h-[100%] flex justify-center items-center">
                    <div className="w-[75%] h-[95%]">
                        <div className="w-[100%] h-[15%] flex justify-center items-center">
                            <h1 className="text-[36px] font-[500]">Sign Up</h1>
                        </div>
                        <div className="w-[100%] h-[75%]">
                            <form className="w-full h-full flex flex-col justify-between">
                                <div className="w-full h-[13%] flex justify-between">
                                    <div className="w-[45%] h-[100%] flex flex-col justify-between items-start">
                                        <label className="text-[16px]" htmlFor="first_name">
                                            First Name
                                        </label>
                                        <input
                                            className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                            placeholder="Type here" id="first_name" type="text" required/>
                                    </div>
                                    <div className="w-[45%] h-[100%] flex flex-col justify-between items-start">
                                        <label className="text-[16px]" htmlFor="last_name">
                                            last Name
                                        </label>
                                        <input
                                            className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                            placeholder="Type here" id="last_name" type="text" required/>
                                    </div>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Company name
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="text" required/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Email
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="email" required/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Password
                                    </label>
                                    <input
                                        className="w-full p-[16px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="text" required/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <label className="text-[16px]" htmlFor="last_name">
                                        Confirm password
                                    </label>
                                    <input
                                        className="w-full p-[14px] rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                                        placeholder="Type here" id="last_name" type="text" required/>
                                </div>
                                <div className="w-full h-[13%] flex flex-col justify-between">
                                    <button className="rounded-[4px]" style={{backgroundColor:"#1c70ed"}}>Sign Up</button>
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