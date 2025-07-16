import React from "react";

const CLIENT_ID = "6ddfacb3430f483fa2bb108913bffb7e";
const REDIRECT_URI = "https://aurify.vercel.app/callback"; // Redirect URL after login
const SCOPES = ["user-read-email", "user-read-private", "user-top-read"]; // Permissions requested

// generate random string for OAuth PKCE code verifier
function generateCodeVerifier(length = 128) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function base64urlencode(str: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(str)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// generate code challenge from the verifier
async function generateCodeChallenge(verifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64urlencode(digest);
}

export function LoginSection() {
    // trigger Spotify OAuth login flow
    const handleLogin = async () => {
        const code_verifier = generateCodeVerifier(128); // Create verifier
        const code_challenge = await generateCodeChallenge(code_verifier); // Hash verifier to create challenge

        localStorage.setItem("verifier", code_verifier);

        // build Spotify authorization URL with required parameters
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: "code",
            redirect_uri: REDIRECT_URI,
            scope: SCOPES.join(" "),
            code_challenge_method: "S256",
            code_challenge,
        });

        // redirect to Spotify's authorization endpoint
        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    return (
        <section
            className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 pt-10"
            style={{ minHeight: "180px" }}
        >
            <div
                className="text-white"
                style={{
                    fontSize: "clamp(24px, 28vw, 230px)",
                    lineHeight: 1,
                    marginTop: "0.1em",
                    width: "0.22em",
                    textAlign: "center",
                }}
            >
                [
            </div>

            <button
                onClick={handleLogin}
                className="bg-white text-neutral-900 font-normal tracking-widest flex items-center justify-center hover:bg-[#1ED760] transition duration-300 ease-in-out"
                style={{
                    fontSize: "clamp(16px, 1.8vw, 36px)",
                    height: "clamp(120px, 15vw, 280px)",
                    width: "clamp(120px, 15vw, 280px)",
                    borderRadius: "9999px",
                    textAlign: "center",
                }}
            >
                Login
            </button>

            <div
                className="text-white"
                style={{
                    fontSize: "clamp(24px, 28vw, 230px)",
                    lineHeight: 1,
                    marginBottom: "0.4em",
                    width: "0.2em",
                    textAlign: "center",
                    transform: "scaleX(-1)",
                }}
            >
                [
            </div>
        </section>
    );
}
