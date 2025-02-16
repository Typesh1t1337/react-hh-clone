import {Header} from "../../Header.jsx";
import {Link} from "react-router-dom";
import {Logout} from "../Logout.jsx";
import {useAuth} from "../../AuthContext.jsx";
import {Upload} from "lucide-react";
import {UploadButton} from "../atr/UploadButton.jsx";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../../LoadingSpinner.jsx";

export function UploadCvApp() {
    const {isAuthenticated,user,isCompany,loading,pfp,cv} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (cv) {
            setIsLoading(false);
        }
    }, [cv]);


    if (isLoading) {
        return <LoadingSpinner />;
    }


    return (
        <>
            <Header />
            <div>
                <div className="h-full mt-[120px] w-screen min-h-[600px]  p-10 flex justify-between items-start bg-[#131517]">
                    <div className="w-[20%] h-full">
                        <div className="h-[300px] w-full bg-[#1E1F25]">
                            <div className="h-[75px] w-full flex items-center justify-start px-5 bg-[#272A34]">
                                <h2 className="font-bold">Profile</h2>
                            </div>
                            <div className="h-[75px] w-full flex px-5  items-center justify-start">
                                <h2 className="font-bold">My profile</h2>
                            </div>
                            <div className="h-[75px] w-full flex px-5 bg-[#1B70F1]  items-center justify-start">
                                <Link className="font-bold text-[#CFD3DA]" to="/account/profile/cv/">My CV</Link>
                            </div>
                            <div className="h-[75px] w-full flex px-5  items-center justify-start">
                                <Logout/>
                            </div>
                        </div>
                    </div>
                    {cv ? (
                        <div
                            className="h-[1500px] w-[70%]  bg-[#1E1F25] rounded-[8px] p-10 flex flex-col justify-center items-center overflow-scroll">
                            <h2 className="font-bold text-[30px] mb-6">Upload another cv</h2>
                            <div>
                                <UploadButton/>
                            </div>
                            <a href={`${cv}`} target="_blank">Link</a>
                            <iframe src={`${cv}#toolbar=0`} width="100%" height="100%"/>
                        </div>
                    ) : (
                        <div
                            className="w-[70%] h-[calc(100vh-180px)] bg-[#1E1F25] flex flex-col justify-center items-center rounded-[6px]">
                            <h2 className="font-bold text-[30px] mb-6">You not upload cv yet, do it right now!</h2>
                            <UploadButton/>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}