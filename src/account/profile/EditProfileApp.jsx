import { Header } from "../../Header.jsx";
import { useAuth } from "../../AuthContext.jsx";
import { Upload } from "lucide-react";
import {useEffect, useState} from "react";
import api from "../../axiosInstance.js";
import {useNavigate} from "react-router-dom";
import {LoadingSpinner} from "../../LoadingSpinner.jsx";

export function EditProfileApp() {
    const { isAuthenticated, user, isCompany, loading, lastName, firstName, email } = useAuth();

    const [username, setUsername] = useState(user);
    const [firstname, setFirstname] = useState(firstName);
    const [lastname, setLastname] = useState(lastName);
    const [emailToChange, setEmail] = useState(email);
    const [filename, setFilename] = useState("Choose file...");
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!loading) {
            setUsername(user || "");
            setFirstname(firstName || "");
            setLastname(lastName || "");
            setEmail(email || "");
        }
    }, [user, firstName, lastName, email, loading]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

            if (!allowedTypes.includes(selectedFile.type)) {
                setError("Please select a jpeg, jpg or png!");
                setFilename("Select jpeg, jpg, or png!");
                setFile(null);
                return;
            }

            setError("");
            setFile(selectedFile);
            setFilename(selectedFile.name);
        }
    };


    const getInputClass = (value, defaultValue) => {
        return value === defaultValue ? "text-gray-500" : "text-white";
    };

    const formData = new FormData();

    formData.append("username", username);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("filename", filename);
    if(file){
        formData.append("photo", file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.put('account/profile/edit/',
                formData, {
                    headers: { "Content-Type": "multipart/form-data" }}
            )

            if(response.status === 200){
                navigate(`/account/profile/${username}/`);
            }

        }catch(e){
            console.log(e.message);
            setError("Something went wrong!");
        }
    }



    return (
        <>
            <Header />
            <div className="w-screen h-[calc(100vh-120px)] bg-[#131517] mt-[120px] min-h-[650px] flex justify-center items-center p-10">
                <div className="w-[60%] bg-[#1E1F25] rounded-[4px] p-6">
                    <div className="w-full flex items-center justify-center my-4">
                        <h2 className="font-bold text-[30px]">Edit Profile</h2>
                    </div>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col items-center gap-6">
                            {/* Company Name */}
                            <div className="w-[60%]">
                                <label htmlFor="username" className="mb-2 text-[#CFD3DA] block">
                                    Company name <span className="text-[#FC4747]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className={`w-full px-4 py-2 border border-gray-600 rounded-[2px] bg-transparent ${getInputClass(username, user)}`}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* First Name */}
                            <div className="w-[60%]">
                                <label htmlFor="firstname" className="mb-2 text-[#CFD3DA] block">
                                    First name <span className="text-[#FC4747]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    className={`w-full px-4 py-2 border border-gray-600 rounded-[2px] bg-transparent ${getInputClass(firstname, firstName)}`}
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="w-[60%]">
                                <label htmlFor="lastname" className="mb-2 text-[#CFD3DA] block">
                                    Last name <span className="text-[#FC4747]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    className={`w-full px-4 py-2 border border-gray-600 rounded-[2px] bg-transparent ${getInputClass(lastname, lastName)}`}
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="w-[60%]">
                                <label htmlFor="email" className="mb-2 text-[#CFD3DA] block">
                                    Email <span className="text-[#FC4747]">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full px-4 py-2 border border-gray-600 rounded-[2px] bg-transparent ${getInputClass(emailToChange, email)}`}
                                    value={emailToChange}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* File Upload */}
                            <div className="w-[60%]">
                                <input type="file" id="file-upload" className="hidden" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                                <label
                                    htmlFor="file-upload"
                                    className="w-full px-4 py-2 flex items-center justify-between bg-gray-800 text-gray-300 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700 transition"
                                >
                                    <span>{filename}</span>
                                    <Upload className="w-5 h-5 text-gray-400" />
                                </label>
                            </div>


                            {error && <h2 className="text-[#F74E2C] text-[14px] my-2">{error}</h2>}

                            <button
                                type="submit"
                                className="w-[50%] bg-[#1B70F1] rounded-[4px] shadow-md hover:shadow-xl hover:bg-[#1B70F9] active:scale-95 transition-all py-2 text-white"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
