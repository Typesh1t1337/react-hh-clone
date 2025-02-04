import {Link, useNavigate} from "react-router-dom";
import api from "../axiosInstance.js";


export function Logout() {
    const navigate = useNavigate();
    const fetchData = async () => {
        try{
            const response = await api.post("account/logout/");
            if (response.status === 200) {
                navigate("/");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <Link className="font-bold text-[#CFD3DA]" onClick={fetchData}>Logout</Link>
        </div>
    )
}