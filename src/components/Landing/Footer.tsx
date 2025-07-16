import * as React from "react";


export function Footer() {
    return (
        <footer className="w-full bg-white border-t border-black py-6 px-4 text-center text-sm text-neutral-900 font-['Helvetica_Neue'] max-sm:text-xs max-sm:py-4">
            <p className="max-w-lg mx-auto">
                Due to Spotify's new API regulations, full access to this site must be requested.
            </p>
            <p className="mt-2">
                Carson Davie — <a href="mailto:carsondavie18@gmail.com" className="underline hover:text-pink-600">carsondavie18@gmail.com</a>
            </p>
        </footer>
    );
}

