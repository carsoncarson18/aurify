import React, { useState } from "react";
import { fetchWithJwt } from "../../utils/api";

interface AuraRevealProps {
    trackIds: string[];
    setIsAuraRevealing: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuraLoading: React.Dispatch<React.SetStateAction<boolean>>; // new prop
}

export default function AuraReveal({ trackIds, setIsAuraRevealing, setIsAuraLoading }: AuraRevealProps) {
    const [aura, setAura] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        const jwtToken = localStorage.getItem("jwt");
        if (!jwtToken) {
            setError("Session expired. Please log in again.");
            return;
        }

        setLoading(true);
        setError(null);
        setAura(null);
        setIsAuraLoading(true);    // notify parent: loading started
        setIsAuraRevealing(true);  // notify parent: revealing started

        try {
            const data = await fetchWithJwt("https://aurify-backend.onrender.com/api/analyze-aura", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ track_ids: trackIds }),
            });

            setAura(data.aura); // set aura label from backend
        } catch (err: any) {
            if (err.message.toLowerCase().includes("expired")) {
                localStorage.removeItem("jwt");
                setError("Session expired. Redirecting to login...");
                setTimeout(() => (window.location.href = "/"), 3000);
                return;
            }
            setError(err.message);
        } finally {
            setLoading(false);
            setIsAuraLoading(false);  // notify parent: loading finished
        }
    };

    return (
        <div className="text-center mt-10">
            {!aura && !loading && (
                <button
                    onClick={handleClick}
                    className="px-12 py-4 text-xl font-semibold text-white rounded-full shadow-lg 
          transition-all duration-500 ease-in-out 
          font-['Helvetica_Neue'] 
          bg-gradient-to-r from-[#8B2C54] via-[#D63384] to-[#FF0080] 
          bg-[length:200%_200%] bg-left hover:bg-right 
          hover:shadow-pink-500/40 hover:scale-105"
                    disabled={loading}
                >
                    Discover Your Aura
                </button>
            )}

            {loading && <p className="text-white mt-4">Analyzing your aura...</p>}

            {aura && (
                <div className="mt-6 text-2xl font-bold text-white font-['Helvetica_Neue']">
                    Your Aura: <span className="text-[#FF80AB]">{aura}</span>
                </div>
            )}

            {error && (
                <div className="text-red-500 mt-4 font-['Helvetica_Neue']">{error}</div>
            )}
        </div>
    );
}
