import {useAuth} from "../AuthContext.jsx";
import api from "../axiosInstance.js";
import {useEffect, useRef, useState} from "react";


export function SendMessagesAi({setMessages,messages,isLoading,setIsLoading}) {
    const [message, setMessage] = useState("");
    const {isAuthenticated,user,isCompany,loading, first_name} = useAuth();

    const handleKeyPress = (e) => {
        if(e.keyCode === 13 && message.trim() !== ""){
            e.preventDefault();
            sendMessage();
        }
    }




    const sendMessage = async () => {
        if(message.trim() === "") return;

        const newMessages = [...messages, { sender:user, message: message, is_read:true, message_date:Date.now() }];
        setMessages(newMessages);
        setMessage("");
        setIsLoading(true);

        try{
            const response = await api.post('api/chat/support/send/', {
                    message
                })

            if(response.status === 200){
                setMessages([
                    ...newMessages,
                    { sender: 'SUPPORT_AI', message:response.data.message, message_date:Date.now(),is_read:true },
                ]);
            }

        }catch(e){
            console.log(e);
            setMessages([
                ...newMessages,
                { sender: 'SUPPORT_AI', message: 'Error connecting to SUPPORT_AI', is_read:true,message_date:Date.now() },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative w-full h-[10%] bg-[#272A34] flex justify-center items-center">
            <input placeholder="Type here" className="w-[96%] text-[#CFD3DA] px-2" value={message}
                   onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress}/>
            <button className="absolute  text-[20px] right-0" onClick={sendMessage} disabled={loading}>
                {
                    isLoading ? (
                        <i className="bi bi-send-fill" style={{color:"#98A0AF"}}></i>
                    ) : (
                        <i className="bi bi-send-fill" style={{color:"#1B70F1"}}></i>
                    )
                }
            </button>
        </div>
    )
}