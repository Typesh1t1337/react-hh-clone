import {useEffect, useState} from "react";
import {useAuth} from "../AuthContext.jsx";
import api from "../axiosInstance.js";
import {Header} from "../Header.jsx";
import pfp from "/img_1.png";
import {useNavigate, useParams} from "react-router-dom";
import {ChatPage} from "./ChatPage.jsx";


function CheckCode(message) {
    if(message.includes("Assigned Code:Bober")){
        return "Assigned"
    }
}

export function ChatActive() {
    const [allChats, setAllChats] = useState([]);
    const [search, setSearch] = useState("");
    const {isAuthenticated,user,isCompany,loading} = useAuth();
    const chat_link = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllChats = async () => {
            try{
                const response = await api.get(`api/chat/retrieve/?username=${search}`);
                setAllChats(response.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchAllChats();
    },[search]);

    const setSearchValue = (value) => {
        setSearch(value);
    }

    const setConversation = (chat_id, second_user) => {
        navigate(`/chat/conversation/${chat_id}/${second_user}/`);
    }


    return (
        <>
            <Header/>
            <div className="h-[calc(100vh-120px)] mt-[120px] w-screen min-h-[600px] py-4 px-10 flex justify-center items-start bg-[#131517]">
                <div className="w-[80%] h-full flex justify-between rounded-[8px]">
                    <div className="w-[40%] bg-[#1E1F25] h-full overflow-scroll">
                        <div className="w-full h-[15%] bg-[#272A34] pl-6 pr-10 flex items-center relative">
                            <input
                                className="w-full border-[#ffffff]/20 border-[1px] px-2 h-[35px] text-[#CFD3DA] text-[13px] rounded-[4px]"
                                placeholder="Find contacts" value={search}
                                onChange={e => setSearchValue(e.target.value)}/>
                            <button className="absolute left-[315px]">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        <div className="w-full h-[85%] flex flex-col overflow-scroll">
                            {allChats.map((chat, index) => (
                                    <div className = "relative w-full h-[100px]  flex cursor-pointer" key={index} onClick={() => setConversation(chat.pk,chat.first_username !== user  ?   chat.first_username : chat.second_username )}>
                                        {(chat.first_username === chat_link.second_user ||
                                            chat.second_username === chat_link.second_user) && (
                                            <div
                                                className="absolute w-full h-full"
                                                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                                            ></div>
                                        )}
                                    <div className="w-[80px] h-full flex items-center ml-2">
                                        <div className="w-[64px] h-[64px] overflow-hidden bg-[#272A34] rounded-[50%]">
                                            <img src={pfp} alt=""/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        {chat.first_username === user ? (
                                            <h2 className="text-white text-[20px] my-2 font-bold">
                                                {chat.second_username}
                                            </h2>
                                        ) : (
                                            <h2 className="text-white text-[20px] my-2 font-bold">
                                                {chat.first_username}
                                            </h2>
                                        )}
                                        {chat.last_message.length > 35 ? (
                                            <h2 className="text-[#ADB3BF] text-[14px]">
                                                {chat.last_message.substring(0, 35) + "..."}
                                            </h2>
                                        ) : (
                                            chat.last_message.includes("Code:Bober") ? (
                                                <h2 className="text-[#06B470] text-[14px] font-bold">
                                                    {CheckCode(chat.last_message)}
                                                </h2>
                                            ) : (
                                                <h2 className="text-[#ADB3BF] text-[14px]">
                                                    {chat.last_message}
                                                </h2>
                                            )
                                        )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ChatPage chat_id={chat_link.chat_id} second_user={chat_link.second_user}  />
                </div>
            </div>
        </>
    )
}