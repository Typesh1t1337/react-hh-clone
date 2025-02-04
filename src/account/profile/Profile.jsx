import pfp from "/img_1.png"
import {useAuth} from "../../AuthContext.jsx";
import {Link} from "react-router-dom";
import  {Logout} from "../Logout.jsx";


export function Profile() {
    const {isAuthenticated,user,isCompany,email,isVerified} = useAuth();
    return (
        <div className="h-[calc(100vh-120px)] mt-[120px] w-screen min-h-[600px]  p-10 flex justify-between items-start bg-[#131517]">
            <div className="w-[20%] h-full">
                <div className="h-[300px] w-full bg-[#1E1F25]">
                    <div className="h-[75px] w-full flex items-center justify-start px-5 bg-[#272A34]">
                        <h2 className="font-bold">Profile</h2>
                    </div>
                    <div className="h-[75px] w-full flex px-5 bg-[#1B70F1] items-center justify-start">
                        <h2 className="font-bold">My profile</h2>
                    </div>
                    <div className="h-[75px] w-full flex px-5  items-center justify-start">
                        <Link className="font-bold text-[#CFD3DA]">My CV</Link>
                    </div>
                    <div className="h-[75px] w-full flex px-5  items-center justify-start">
                        <Logout />
                    </div>
                </div>
            </div>
            <div className="w-[75%] h-full flex flex-col">
                <div className="h-[150px] w-full bg-[#1E1F25] flex justify-center items-center">
                <div className="h-full w-[96%] flex justify-between">
                        <div className="w-[70%] h-full flex">
                            <div className="h-full flex justify-center items-center w-[150px] mr-5">
                                <div
                                    className="h-[120px] w-[120px] flex justify-center items-center overflow-hidden bg-[#272A34] rounded-[50%]">
                                    <img src={pfp} className="h-[120px] h-[120px]"/>
                                </div>
                            </div>
                            <div className="h-full flex justify-start items-center w-[250px]">
                                <div className="h-[70px] flex flex-col justify-between">
                                    <h2 className="text-[#ECEEF0] font-bold text-[20px]">{user}</h2>
                                    <h3 className="text-[12px] text-[#CFD3DA]">@{user}</h3>
                                </div>
                            </div>
                            <div className="h-full flex justify-center items-center w-[200px]">
                                <div className="h-[70px] flex flex-col justify-between">
                                    <h2 className="text-[#ADB3BF] font-bold text-[16px]">Email Address -</h2>
                                    <h3 className="text-[20px] text-[#ECEEF0]">{email}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] h-full flex justify-end items-center">
                            <div className="h-[70px] flex justify-center items-center">
                                <Link  className="px-16 py-4 border-[#1B70F1] rounded-[4px] border-[1px] text-[14px] text-[#1B70F1]">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[350px] bg-[#1E1F25] w-full mt-10 flex justify-center items-center rounded-[6px]">
                    <div className="h-full w-[96%] flex flex-col">
                        <div className="w-full h-[90px] border-b-[0.5px] border-[#434343] flex justify-start items-center">
                            <h2 className="text-white text-[20px] font-bold">Verification</h2>
                        </div>
                        <div className="w-full h-full flex justify-between items-center">
                            <div className="w-[32%] h-[84%] flex justify-end items-center bg-[#272A34]">
                                <div className="w-full h-[50%] flex flex-col  justify-between items-center">
                                    <h2 className="text-[18px] font-bold">Email Verification</h2>
                                    {isVerified ? (
                                            <Link className="px-16 py-4 border-[#1B70F1] rounded-[4px] border-[1px] text-[14px] text-[#1B70F1]">
                                                Verified
                                            </Link>
                                    ) : (
                                            <Link to="/account/verify_email/"
                                                className="px-16 py-4 border-[#1B70F1] rounded-[4px] border-[1px] text-[14px] text-[#1B70F1]">
                                                Verify
                                            </Link>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="w-[32%] h-[84%] flex justify-end items-center bg-[#272A34]">
                                <div className="w-full h-[50%] flex flex-col  justify-between items-center">
                                    <h2 className="text-[18px] font-bold">Bank Account</h2>
                                    <Link
                                        className="px-16 py-4 border-[#1B70F1] rounded-[4px] border-[1px] text-[14px] text-[#1B70F1]">
                                        Verify
                                    </Link>
                                </div>
                            </div>
                            <div className="w-[32%] h-[84%] flex justify-end items-center bg-[#272A34]">
                                <div className="w-full h-[50%] flex flex-col  justify-between items-center">
                                    <h2 className="text-[18px] font-bold">Phone No Verification</h2>
                                    <Link
                                        className="px-16 py-4 border-[#1B70F1] rounded-[4px] border-[1px] text-[14px] text-[#1B70F1]">
                                        Verify
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}