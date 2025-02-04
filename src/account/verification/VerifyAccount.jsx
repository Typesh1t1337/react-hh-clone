import {useAuth} from "../../AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {Header} from "../../Header.jsx";
import {useState,useEffect,useRef} from "react";
import api from "../../axiosInstance.js";
import {VerifySend} from "./VerifySend.jsx";


export function VerifyAccount() {
    const {isAuthenticated,user,isCompany,email,isVerified} = useAuth();
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const [countDown, setCountDown] = useState(0);

    useEffect(() => {
        if(countDown > 0){
            const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
            return () => clearTimeout(timer);
        }
    },[countDown]);

    useEffect(()=>{
        if(!hasFetched.current){
            fetchData();
            hasFetched.current = true;
        }
    })

    const fetchData = async () => {
        try {
            const response = await api.get("account/verify/send_code/");
            setCountDown(response.data.remain_seconds);
        } catch (error) {
            setCountDown(error.response.data.remain_seconds);
            console.log(error.message);
        }
    };


    if (isVerified) {
        navigate("/account/my_profile/");
        return;
    }

    return (
        <>
            <Header />
            <div className="h-[calc(100vh-120px)] mt-[120px] w-screen min-h-[600px]  p-10 flex justify-center items-center bg-[#131517]">
                <div className="w-[350px] h-[400px]">
                    <div className="w-full h-[100px] flex justify-center items-center">
                        <h2 className="text-[36px] font-[500]">Verify email</h2>
                    </div>
                    <div className="w-full h-[170px]">
                        <VerifySend countDown={countDown} />
                    </div>
                </div>
            </div>
        </>
    )
}