import {Header} from "../Header.jsx";
import pfp from "/img_1.png"
import {useEffect, useState} from "react";
import api from "../axiosInstance.js";
import {useAuth} from "../AuthContext.jsx";
import {ChatActive} from "./ChatActive.jsx";
import {useNavigate} from "react-router-dom";

export function ChatApp() {
    const [allChats, setAllChats] = useState([]);
    const [search, setSearch] = useState("");
    const {isAuthenticated,user,isCompany,loading} = useAuth();
    const [chatId, setChatId] = useState(null);
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

    const setConversation = (chat_id,second_user) => {
        navigate(`conversation/${chat_id}/${second_user}/`);
    }

    return (
        <>
            <Header/>
            <div className="h-[calc(100vh-120px)] mt-[120px] w-screen min-h-[600px] py-4 px-10 flex justify-center items-start bg-[#131517]">
                <div className="w-[80%] h-full flex justify-between rounded-[8px]">
                    <div className="w-[40%] bg-[#1E1F25] h-full overflow-scroll">
                        <div className="w-full h-[15%] bg-[#272A34] pl-6 pr-10 flex items-center relative">
                            <input className="w-full border-[#ffffff]/20 border-[1px] px-2 h-[35px] text-[#CFD3DA] text-[13px] rounded-[4px]" placeholder="Find contacts" value={search} onChange={e => setSearchValue(e.target.value)} />
                            <button className="absolute left-[315px]">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        <div className="w-full h-[85%] flex flex-col overflow-scroll">
                            {allChats.map((chat,index) => (
                                <div className="w-full h-[100px] pl-6 py-3 flex cursor-pointer" key={index} onClick={() => setConversation(chat.pk, chat.first_username !== user  ?   chat.first_username : chat.second_username )}>
                                    <div className="w-[80px] h-full flex items-center">
                                        <div className="w-[64px] h-[64px] overflow-hidden bg-[#272A34] rounded-[50%]">
                                            <img src={pfp} alt=""/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-white text-[20px] my-2 font-bold">
                                            {chat.first_username === user ? (
                                                chat.second_username
                                            ) : (
                                                chat.first_username
                                            )
                                            }
                                        </h2>
                                        <h2 className="text-[#ADB3BF] text-[14px]">
                                            {chat.last_message.length > 35 ? (
                                                chat.last_message.substring(0, 35) + "..."
                                            ) : (
                                                chat.last_message
                                            )
                                            }
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-[60%] h-full flex justify-center items-center">
                        <h2 className="font-bold text-[30px] text-white">
                            Chat not chosen yet
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}