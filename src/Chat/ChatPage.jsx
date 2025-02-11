import {useEffect, useRef, useState} from "react";
import {useAuth} from "../AuthContext.jsx";
import api from "../axiosInstance.js";
import {Link, useNavigate} from "react-router-dom";
import pfp from "/img_1.png";
import support from "/support.png"
import {SendMessagesAi} from "./ChatWithAi.jsx";
import {LoadingSpinner} from "../LoadingSpinner.jsx";
import {TypingTextAnimation} from "./TypingTextAnimation.jsx";
import {WebSocketUserCompany} from "./WebSocketUserCompany.jsx";



function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function ChatPage({chat_id,second_user}) {
    const [messages, setMessages] = useState([]);
    const {isAuthenticated,user,isCompany,loading, first_name} = useAuth();
    const navigate = useNavigate();
    const messageEndRef = useRef(null);
    const [isChatLoaded, setIsChatLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const scrollToEnd = () => {
        if(messageEndRef.current){
            messageEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    useEffect(() => {
        if (isChatLoaded && messages.length > 0) {
            scrollToEnd();
        }
    }, [isChatLoaded, messages]);



    useEffect(() => {
        const fetchMessages = async () => {
            try{
                const response = await api.get(
                    `api/chat/retrieve/message/${chat_id}/${second_user}/`,
                )
                setMessages(response.data);
            } catch (error){
                console.log(error);
                if(error.response.status === 404){
                    navigate("/chat/");
                }
            }finally{
                setIsChatLoaded(true);
            }
        };
        fetchMessages();
    },[chat_id,second_user]);



    if(!isChatLoaded){
        return <LoadingSpinner />;
    }

    return (
        <div className="w-[60%]  h-full">
            <div className="w-full h-[15%] bg-[#272A34]">
                <div className="w-full h-full flex">
                    <div className="w-[90px] flex justify-start items-center">
                        {second_user==="Support_AI" ? (
                            <div className="w-[64px] h-[64px] overflow-hidden bg-[#1E1F25] rounded-[50%]">
                                <img src={support} alt=""/>
                            </div>
                        ) : (
                            <div className="w-[64px] h-[64px] overflow-hidden bg-[#1E1F25] rounded-[50%]">
                                <img src={pfp} alt=""/>
                            </div>
                        )
                        }
                    </div>
                    <div className="w-[calc(100%-90px] flex justify-start items-center">
                        <div className="h-[50px] flex items-start flex-col">
                            <h2 className="font-bold text-white">{second_user}</h2>
                            {
                                isLoading && (
                                   <TypingTextAnimation />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[75%] bg-[#1E1F25] overflow-scroll">
                {messages.map((message, index) => (
                    message.sender === user ? (
                        <div className="w-full flex justify-end" key={index}>
                            <div
                                className="max-w-[40%] mx-2 my-3 py-2 px-2  flex justify-end bg-[#1B70F1] rounded-l-[4px] rounded-tr-[4px]">
                                {message.job_link ? (
                                    <div>
                                        <h2>{message.message}</h2>
                                        <div className="my-3 py-2 w-full flex justify-center items-center rounded-[2px] border-[1px] border-[#ffffff/20]">
                                            <Link to={`/job/vacancy/${message.job_link}`} className="text-[14px]">Find out more</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h2>{message.message}</h2>
                                    </div>
                                )
                                }
                                {message.is_read ? (
                                        <div className="w-[50px] h-full flex justify-start items-end ml-2">
                                            <i className="bi bi-check-all" style={{color: "white", fontSize: "20px"}}> </i>
                                            <h5 className="text-[10px]">{formatTime(message.message_date)}</h5>
                                        </div>
                                    ) : (
                                    <div className="w-[50px] h-full flex justify-start items-end ml-2">
                                        <i className="bi bi-check" style={{color: "gray",fontSize:"20px"}}></i>
                                        <h5 className="text-[10px]">{formatTime(message.message_date)}</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex justify-start" key={index}>
                            <div
                                className="max-w-[40%]  mx-2 my-3 px-2 py-2 bg-[#54576D] rounded-r-[4px] rounded-tl-[4px] flex">
                                <h2>{message.message}</h2>
                                <div className="w-[40px] h-full flex justify-center items-end ml-2">
                                    <h5 className="text-[10px]">{formatTime(message.message_date)}</h5>
                                </div>
                            </div>
                        </div>
                    )
                ))}
                <div ref={messageEndRef} className="w-full h-[5px] bg-transparent"></div>
            </div>
            {
                second_user === "Support_AI" ? (
                    <SendMessagesAi setMessages={setMessages} messages={messages} isLoading={isLoading} setIsLoading={setIsLoading} />
                ) : (
                    <WebSocketUserCompany />
                )
            }
        </div>
    )
}

