import {Link} from "react-router-dom";


export function RegisterApp() {
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-[#131517]">
                <div className="w-[400px] h-[310px] bg-[#1E1F25] pb-[10px]">
                    <div className="w-full h-[100px] flex items-center justify-center">
                        <h2 className="text-[20px]">Sign up</h2>
                    </div>
                    <div className="w-full px-6 h-[190px] flex items-center justify-around flex-col">
                        <Link to="user/" className="bg-[#272A34] w-full py-5 rounded-[4px] text-[17px] flex justify-center items-center">as a User</Link>
                        <Link to="company/" className="bg-[#1B70F1] w-full py-5 rounded-[4px] text-[17px] flex justify-center items-center">as a Company</Link>
                    </div>
                </div>
            </div>
        </>
    )
}