import {createContext, useContext, useEffect, useState} from "react";
import api from "./axiosInstance.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isCompany, setIsCompany] = useState(false);
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [cv, setCv] = useState(null);
    const [pfp, setPfp] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('account/auth/check/');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUser(response.data.user.username);
                    setEmail(response.data.user.email);
                    setIsVerified(response.data.user.isVerified);
                    setFirstName(response.data.user.first_name);
                    setLastName(response.data.user.last_name);
                    setPfp(response.data.user.pfp);
                    setCv(response.data.user.cv);
                    if (response.data.user.status==="Company"){
                        setIsCompany(true);
                    }
                }
            }catch (error) {
                console.log(error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, isCompany, setIsCompany,email,setEmail,isVerified, setIsVerified,loading,setLoading,firstName,setFirstName,lastName,setLastName,pfp, cv }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);