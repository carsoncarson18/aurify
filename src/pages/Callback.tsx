import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
    const [error, setError] = useState<string | null>(null);
    const hasFetchedRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        async function fetchAccessToken(code: string) {
            const verifier = localStorage.getItem("verifier");

            if (!verifier) {
                setError("PKCE verifier not found in localStorage.");
                return;
            }

            try {
                const tokenResponse = await fetch("https://aurify-backend.onrender.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code, verifier }),
                });

                const rawText = await tokenResponse.text(); // Get raw response

                if (!tokenResponse.ok) {
                    let errorDetail = rawText;
                    try {
                        const errorData = JSON.parse(rawText);
                        errorDetail = errorData.detail || errorData.error || errorDetail;
                    } catch {
                        // Response wasn't valid JSON
                    }
                    throw new Error(`Token fetch failed: ${tokenResponse.status} ${errorDetail}`);
                }

                // Try to parse the raw response as JSON
                let jwt;
                try {
                    const data = JSON.parse(rawText);
                    jwt = data.jwt;
                } catch {
                    throw new Error("Invalid JSON in token response.");
                }

                localStorage.setItem("jwt", jwt);

                // Clear query params
                window.history.replaceState({}, document.title, "/callback");

                // Navigate to dashboard
                navigate("/dashboard");
            } catch (err: any) {
                setError(err.message);
            }
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            fetchAccessToken(code);
        } else {
            setError("Authorization code not found in URL");
        }
    }, [navigate]);

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    return <div className="p-4 text-white">Logging in...</div>;
}
