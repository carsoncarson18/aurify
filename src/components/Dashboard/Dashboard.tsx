import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import TopTracksList from "./TopTracksList";
import AuraReveal from "./AuraReveal";
import { fetchWithJwt } from "../../utils/api"; // ✅ make sure path is correct

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
}

interface UserProfile {
    display_name: string;
    images: { url: string }[];
}

export default function Dashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isAuraRevealing, setIsAuraRevealing] = useState(false);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const data = await fetchWithJwt("https://aurify-backend.onrender.com/api/user-profile");
                setProfile(data);
            } catch (err: any) {
                if (err.message.includes("expired")) {
                    localStorage.removeItem("jwt");
                    setError("Session expired. Redirecting to login...");
                    setTimeout(() => (window.location.href = "/"), 3000);
                } else {
                    setError("Failed to fetch user profile");
                }
            }
        }

        async function fetchTopTracks() {
            try {
                const data = await fetchWithJwt("https://aurify-backend.onrender.com/api/top-tracks");
                setTopTracks(data.items);
            } catch (err: any) {
                if (err.message.includes("expired")) {
                    localStorage.removeItem("jwt");
                    setError("Session expired. Redirecting to login...");
                    setTimeout(() => (window.location.href = "/"), 3000);
                } else {
                    setError("Failed to fetch top tracks");
                }
            }
        }

        const jwtToken = localStorage.getItem("jwt");
        if (!jwtToken) {
            setError("Session expired. Redirecting to login...");
            setTimeout(() => window.location.href = "/", 3000);
            return;
        }

        fetchUserProfile();
        fetchTopTracks();
    }, []);

    if (error) {
        return (
            <div className="text-red-500 p-4 font-['Helvetica_Neue']">
                {error}
            </div>
        );
    }

    if (!profile || !topTracks.length) {
        return (
            <div className="bg-black text-white flex justify-center items-center min-h-screen font-['Helvetica_Neue']">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="flex relative flex-col justify-center items-center w-screen min-h-screen border border-solid bg-black border-neutral-900">
            <div className="px-4 pt-8 pb-16 text-white sm:px-8 sm:pt-10 md:px-16 md:pt-12 lg:pt-6">
                <UserProfileCard profile={profile} />

                {/* hide TopTracksList while aura is revealing */}
                {!isAuraRevealing && <TopTracksList tracks={topTracks} />}

                {/* pass setter so AuraReveal can notify parent */}
                <AuraReveal
                    trackIds={topTracks.map(track => track.id)}
                    setIsAuraRevealing={setIsAuraRevealing}
                />
            </div>
        </div>
    );
}
