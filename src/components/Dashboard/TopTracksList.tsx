import React from "react";

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
}

export default function TopTracksList({ tracks }: { tracks: Track[] }) {
    return (
        <div>
            <h3
                className="
          text-xl mb-4 font-['Helvetica_Neue'] 
          tracking-[5.4px]
          max-md:text-lg max-md:tracking-[2.25px] 
          max-sm:text-base max-sm:tracking-[1.5px] 
          max-xs:text-sm max-xs:tracking-[1px]
        "
            >
                Your Top Tracks
            </h3>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-['Helvetica_Neue']">
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-neutral-800 transition"
                    >
                        <img
                            src={track.album.images[0]?.url}
                            alt={track.name}
                            className="w-14 h-14 rounded"
                        />
                        <div>
                            <a
                                href={track.external_urls.spotify}
                                target="_blank"
                                rel="noreferrer"
                                className="
                  font-semibold
                  hover:underline
                "
                            >
                                {track.name}
                            </a>
                            <p className="text-sm text-gray-300">
                                {track.artists.map((artist) => artist.name).join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

