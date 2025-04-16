import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function JobPagination({paginationSize,page}) {
    const [paginationPage, setPaginationPage] = useState(1);
    const [pages, setPages] = useState(parseInt(page));

    useEffect(() => {
        if(paginationSize > 30){
            setPaginationPage(Math.ceil(paginationSize / 30));
        }else{
            setPaginationPage(1)
        }
    },[paginationSize]);



    return (
        <div className="w-full flex my-8 justify-center items-center">
            <div className="flex">
                {paginationPage > 1 &&
                    Array.from({length: paginationPage}, (_, i) => (
                        <a href={`/job/search/vacancy/${i+1}`}
                            key={i}
                            className={`py-4 px-5 flex justify-center items-center mr-3 rounded-[2px] ${i+1 === pages ? "bg-[#1E1F25]" : "bg-[#272A34]"
                            }`}
                        >
                            {i + 1}
                        </a>
                    ))}
            </div>
        </div>
    )
}