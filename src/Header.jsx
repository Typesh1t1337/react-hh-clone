import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import logo from "/portfolio.png";
import api from "./axiosInstance.js";
import pfp from "/img_1.png"
import {useAuth} from "./AuthContext.jsx";
import {LoadingSpinner} from "./LoadingSpinner.jsx";


export function Header() {
    const {isAuthenticated,user,isCompany,loading} = useAuth();

    if (loading) {
        return (<LoadingSpinner />);
    }

    return (
            <div className="w-screen h-[120px] fixed flex justify-between bg-[#1E1F25] pl-20 pr-20 z-99">
                <div className="h-[100%] w-[200px] flex justify-start items-center">
                    <div className="h-[70%] w-[100px] flex -justify-start items-center">
                        <Link to="/">
                            <img src={logo} className="h-[64px] w-[64]" />
                        </Link>
                    </div>
                </div>
                <div className="h-[100%] w-full flex justify-center items-center">
                        {isAuthenticated ? (
                                isCompany ? (
                                        <ul className="w-full flex justify-around items-center text-[#ADB3BF]">
                                            <li><Link to="/job/search/vacancy/">Find job</Link></li>
                                            <li><a href="">Company vacancies</a></li>
                                            <li><a href="">Chats</a></li>
                                        </ul>
                                    ) : (
                                        <ul className="w-full flex justify-around items-center text-[#ADB3BF]">
                                            <li><Link to="/job/search/vacancy/">Find job</Link></li>
                                            <li><Link to="/job/applies/">My applies</Link></li>
                                            <li><a href="">Chats</a></li>
                                        </ul>
                                    )
                        ) : (
                            <ul className="w-full flex justify-around items-center text-[#ADB3BF]">
                                <li><Link to="job/search/vacancy/">Find job</Link></li>
                                <li><a href="">Post vacancy</a></li>
                                <li><a href="">Support</a></li>
                            </ul>
                        )}
                </div>
                <div className="h-full w-[280px] flex justify-center items-center">
                        {
                            isAuthenticated ? (
                                <div className="h-[56px] w-full flex">
                                    <div className="h-full w-[40%] flex justify-center items-center ">
                                        <div
                                            className="bg-[#272A34] w-[56px] h-[56px] flex justify-center items-center overflow-hidden rounded-[50%]">
                                            <img src={pfp} className="w-[56px] h-[56px]"/>
                                        </div>
                                    </div>
                                    <div className="h-full w-[60%] flex justify-center items-center">
                                        <div className="h-[50px] w-full flex flex-col justify-between items-end">
                                            <h2 className="text-[16px] font-semibold">{user}</h2>
                                            <Link to="/account/my_profile/" className="text-[12px]">@{user}</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-[56px] w-full flex">
                                    <div className="h-full w-[50%] flex justify-center items-center">
                                        <Link to="/account/login">Log in</Link>
                                    </div>
                                    <div className="h-full w-[50%] flex justify-center items-center rounded-[4px] bg-[#1B70F1]">
                                        <Link to="/account/register/" className="text-white">Sign Up</Link>
                                    </div>
                                </div>
                            )
                        }
                </div>
            </div>
        )
}