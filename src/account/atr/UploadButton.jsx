import {Upload} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../axiosInstance.js";
import {useAuth} from "../../AuthContext.jsx";

export function UploadButton() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();


    return (
        <form className="flex flex-col justify-center items-center">
            
        </form>
    )
}