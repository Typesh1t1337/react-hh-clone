import {useAuth} from "../AuthContext.jsx";


export function WebSocketUserCompany(props) {
    const {isAuthenticated,user,isCompany,loading, first_name} = useAuth();


    return(
        <div className="relative w-full h-[10%] bg-[#272A34] flex justify-center items-center">
            <input placeholder="Type here" className="w-[96%] text-[#CFD3DA] px-2"/>
            <button className="absolute  text-[20px] right-0">
                <i className="bi bi-send-fill" style={{color: "#1B70F1"}}></i>
            </button>
        </div>
    )
}