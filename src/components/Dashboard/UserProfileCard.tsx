import React from "react";

interface UserProfile {
    display_name: string;
    images: { url: string }[];
}

export default function UserProfileCard({ profile }: { profile: UserProfile }) {
    return (
        <div className="mb-6 flex items-center gap-4 pb-2">
            {profile.images[0] && (
                <img
                    src={profile.images[0].url}
                    alt="Profile"
                    className="rounded-full w-20 h-20"
                />
            )}
            <h2
                className="
          text-2xl font-bold font-['Helvetica_Neue'] 
          tracking-[5.52px] 
          max-md:text-xl max-md:tracking-[3px] 
          max-sm:text-lg max-sm:tracking-[1.5px]
          max-xs:text-base max-xs:tracking-[1px]
        "
            >
                {profile.display_name}
            </h2>
        </div>
    );
}

