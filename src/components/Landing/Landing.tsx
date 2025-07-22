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
            <main className="flex flex-col min-h-screen bg-black border border-solid border-neutral-900 w-screen">
                <div
                    className="flex-grow mt-20 max-w-[90vw] w-full max-md:mt-12 max-sm:mt-16
             flex flex-col items-center gap-10 max-sm:gap-1 overflow-x-visible
             mx-auto"
                >
                    <Title />
                    <Subtitle />
                    <LoginSection />
                </div>

                <Footer />
            </main>

        </>
    );
}

export default Landing;