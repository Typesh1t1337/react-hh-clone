import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import logo from "/portfolio.png";


export function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://0.0.0.0:8001/account/auth/check/',
                );
                setIsAuthenticated(response.data.status);
                setUser(response.data.user);
            }catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    },[]);
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
                            <ul className="w-full flex justify-around items-center text-[#ADB3BF]">
                                <li><Link to="/search/vacancy/">Find job</Link></li>
                                <li><a href="">My applies</a></li>
                                <li><a href="">Support</a></li>
                            </ul>
                        ) : (
                            <ul className="w-full flex justify-around items-center text-[#ADB3BF]">
                                <li><Link to="/search/vacancy/">Find job</Link></li>
                                <li><a href="">Post vacancy</a></li>
                                <li><a href="">Support</a></li>
                            </ul>
                        )}
                </div>
                <div className="h-full w-[280px] flex justify-center items-center">
                    <div className="h-[56px] w-full flex">
                        <div className="h-full w-[50%] flex justify-center items-center">
                            <Link to="/account/login">Log in</Link>
                        </div>
                        <div className="h-full w-[50%] flex justify-center items-center rounded-[4px] bg-[#1B70F1]">
                            <Link to="/account/register/" className="text-white">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
}