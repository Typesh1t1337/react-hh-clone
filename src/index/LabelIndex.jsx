import sfd from "/img_5.png"
import {Link} from "react-router-dom";

export function LabelIndex(){
    return (
        <div className="w-full h-[720px] bg-[#131517] flex justify-center items-center px-20">
            <div className=" w-[100%] h-[380px] bg-[#1E1F25] flex">
                <div className="w-[60%] pt-10 pl-10">
                    <h2 className="text-[54px] font-bold text-white leading-[65px] mb-8">Hurry Up! Apply Now Your Job Role</h2>
                    <h3 className="text-[#ADB3BF] text-justify text-[14px] mb-14">Welcome to Job on Demand, where top
                        companies meet the best talent. Whether you're looking for your next career move or
                        hiring top professionals, we make job searching simple, fast, and effective.</h3>
                    <Link to="/job/search/vacancy/" className="px-20 py-3 bg-[#1B70F1] rounded-[4px] shadow-2xl">Apply</Link>
                </div>
                <div className="w-[40%] overflow-hidden">
                    <img src={sfd}/>
                </div>
            </div>
        </div>
    )
}