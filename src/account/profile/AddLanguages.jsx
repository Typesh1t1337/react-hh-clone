
export function AddLanguages({languages,setLanguages}) {

    const handleChangeLanguage = (id,field,value) => {
        const newLanguages = [...languages];
        newLanguages[id][field] = value;
        setLanguages(newLanguages);
    }

    const removeLanguage = (id) => {
        setLanguages(languages.filter((d, index) => index !== id));
    }

    const addLanguage = () => {
        setLanguages([...languages, {language:"", level:""}]);
    }

    return (
        <div className="w-full my-6 flex flex-col items-center">
            {languages.map((item, index) => (
                <div className="w-[60%] my-4">
                    <label htmlFor="title" className="mb-2 text-[#CFD3DA]">
                        Languages <span className="text-[#FC4747]">*</span>
                    </label>
                    <div className="my-3">
                        <label className="text-[#CFD3DA] text-[14px]">
                            Language
                        </label>
                        <input placeholder="Type here"
                               className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                               type="text" onChange={(e) => handleChangeLanguage(index, "language", e.target.value)}
                               value={item.language}/>
                    </div>
                    <div className="my-3">
                        <label className="text-[#CFD3DA] text-[14px]">
                            Level
                        </label>
                        <select
                            className="px-2 border-grey-300 border-[1px] rounded-[2px]  w-full text-[12px] text-[#ADB3BF] rounded-[2px] h-[40px] mt-2"
                            value={item.level} onChange={(e) => handleChangeLanguage(index, "level", e.target.value)}>
                            <option value="" disabled selected>Choose Level</option>
                            <option value="A0">A0</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                        </select>
                    </div>
                    {index!==0 && (
                        <div className="w-full flex justify-end">
                            <h2 className="underline text-[14px] text-[#F74E2C] my-2 cursor-pointer"
                                onClick={() => removeLanguage(index)}>Remove language</h2>
                        </div>
                    )}
                </div>
            ))}
            <div className="w-full my-2 flex justify-center items-center">
                <div className="w-[60%] flex justify-end">
                    <h2 className="text-[#1B70F1] underline text-[14px] cursor-pointer"
                        onClick={() => addLanguage()}>Add one
                        more</h2>
                </div>
            </div>
        </div>
    )
}