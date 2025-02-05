import "./Styles.css"

export function LoadingSpinner(){
    return (
        <>
            <div className="absolute w-screen h-full top-0 left-0 bg-[#1E1F25] flex justify-center items-center">
                <div className="spinner">
                </div>
            </div>
        </>
    )
}