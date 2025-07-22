import { motion } from "framer-motion";

const spikeHeights = [
    "16px", "80px", "24px", "72px", "32px", "64px", "20px", "78px", "28px", "60px",
    "16px", "80px", "24px", "72px", "32px", "64px", "20px", "78px", "28px", "60px",
    "16px", "80px", "24px", "72px", "32px", "64px", "20px", "78px", "28px", "60px",
    "16px", "80px", "24px", "72px", "32px", "64px", "20px", "78px", "28px", "60px",
];

export function Subtitle() {
    const edgeCount = 2; // number of bars on each edge to keep static

    return (
        <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col items-center">
                <p className="text-center text-white
                     text-2xl tracking-[5.52px]
                     font-normal
                     max-md:text-xl max-md:tracking-[3px]
                     max-sm:text-lg max-sm:tracking-[1.5px] max-sm:mb-4
                     max-xs:text-base max-xs:tracking-[1px]">
                    your aura, generated from your sound.
                </p>

                <div className="h-6" />

                <div className="w-full flex justify-between items-center h-20">
                    {[...Array(40)].map((_, i) => {
                        const centerIndex = 20;
                        const distanceFromCenter = Math.abs(i - centerIndex);

                        const isEdgeBar = i < edgeCount || i >= 40 - edgeCount;

                        return (
                            <motion.div
                                key={i}
                                className="w-[4px] mx-[0.5px] bg-[#1DB954] rounded-full origin-center"
                                animate={
                                    isEdgeBar
                                        ? { height: "5px", opacity: 0.6 } // fixed height and opacity for edges
                                        : {
                                            height: [
                                                spikeHeights[i % spikeHeights.length],
                                                spikeHeights[(i + 3) % spikeHeights.length],
                                                spikeHeights[(i + 6) % spikeHeights.length],
                                                spikeHeights[(i + 9) % spikeHeights.length],
                                                spikeHeights[i % spikeHeights.length],
                                            ],
                                            opacity: [0.4, 1, 0.6, 1, 0.4],
                                        }
                                }
                                transition={
                                    isEdgeBar
                                        ? { duration: 0 } // no animation for edges
                                        : {
                                            repeat: Infinity,
                                            duration: 0.8 + Math.random() * 0.4,
                                            delay: distanceFromCenter * 0.02 + Math.random() * 0.05,
                                            repeatType: "loop",
                                        }
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}