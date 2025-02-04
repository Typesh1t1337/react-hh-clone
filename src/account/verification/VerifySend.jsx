import {useState} from "react";
import api from "../../axiosInstance.js";
import {Link, useNavigate} from "react-router-dom";

function isNumericNumber(code) {
    const num = Number(code);
    return Number.isInteger(num);
}

export function VerifySend({countDown}) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const[success, setSuccess] = useState("");
    const navigate = useNavigate();

    const reloadPage = () => {
        window.location.reload();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isNumericNumber(code)) {
            setError("Invalid code");
            return;
        }
        if (!code){
            setError("code required");
            return;
        };
        if(code.length !== 6){
            setError("code have to be at least 6 characters long");
            return;
        }
        try{
            const response = await api.post("account/verify/email/", {
                code: code,
            })

            if(response.status === 200){
                setSuccess("Account successfully verified, you will be redirected to your profile.");
                setTimeout(() =>navigate('/account/my_profile/') , 1000);
            }
            if(!response.data.message){
                setError("Code doesn't match with sent code");
            }

        }catch(err){
            console.log(err.message);
            setError("Something went wrong. Please try again later");
        }
    }
    return (
        <form className="w-full h-full flex flex-col justify-between" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="code" className="text-[16px]">Email</label>
                <input
                    className="w-full my-2 p-3 rounded-[4px] border-[1px] text-[#ADB3BF] border-grey-300"
                    placeholder="Type here" id="code" type="text" value={code}
                    onChange={e => setCode(e.target.value)} required/>
            </div>
            <h2 className="text-[#F74E2C] text-[14px] mt-2">{error}</h2>
            {countDown > 0 ?
                <div>
                    <h2 className="text-[#06B470] my-1">Code Successfully sent</h2>
                    <p className="mb-3">0:{countDown} wait to send a new code</p>
                </div>
                :
                <div>
                    <a onClick={reloadPage} className="font-bold mb-3">Send new code</a>
                </div>
            }
            <button className="rounded-[4px]" style={{backgroundColor: "#1c70ed"}} type="submit">Send
            </button>
        </form>
    )
}