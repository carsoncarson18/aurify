export function Title() {
    return (
        <header
            className="relative w-full h-[263px] max-md:h-[230px] max-sm:h-[190px] -mt-10 pt-8 max-md:pt-4 max-sm:pt-2 
                 flex justify-center items-start px-4 max-w-full overflow-hidden"
        >
            <h1
                className="absolute font-bold text-white 
                   text-[165px] tracking-[40.25px] 
                   max-md:text-[96px] max-md:tracking-[20px] 
                   max-sm:text-[64px] max-sm:tracking-[10px] 
                   font-['Helvetica_Neue'] leading-none
                   whitespace-nowrap"
                style={{ left: "50%", transform: "translateX(-50%)" }}
            >
                AURIFY
            </h1>
            <h1
                className="absolute font-bold text-stroke-white 
                   text-[165px] tracking-[40.25px] top-[80px] 
                   max-md:text-[96px] max-md:tracking-[20px] 
                   max-sm:text-[64px] max-sm:top-[40px] max-sm:tracking-[10px] 
                   font-['Helvetica_Neue'] leading-none
                   whitespace-nowrap"
                style={{ left: "50%", transform: "translateX(-50%)" }}
            >
                AURIFY
            </h1>
        </header>
    );
}
