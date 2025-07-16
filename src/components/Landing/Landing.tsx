import * as React from "react";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { LoginSection } from "./LoginSection";
import { Footer } from "./Footer";

function Landing() {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&family=Space+Grotesk:wght@400&display=swap"
                rel="stylesheet"
            />
            <main className="flex overflow-x-hidden relative flex-col justify-end items-center w-screen min-h-screen border border-solid bg-black border-neutral-900">
                <div className="absolute left-2/4 top-[21px] -translate-x-2/4 flex flex-col items-center gap- h-[780px] w-[850px] max-w-[90vw] max-md:top-10 max-md:h-[700px] max-md:w-[90vw] max-sm:top-[60px] max-sm:h-auto max-sm:w-[95vw]">
                    <div className="flex flex-col items-center gap-10 max-sm:gap-1">
                        <Title />
                        <Subtitle />
                    </div>
                    <LoginSection />
                </div>
                <Footer />
            </main>
        </>
    );
}

export default Landing;