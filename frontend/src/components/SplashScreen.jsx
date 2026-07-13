import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { RiSparklingFill } from 'react-icons/ri';

const FUN_FACTS = [
    { fact: "The first SMS message was sent in 1992", text: "It simply read 'Merry Christmas'." },
    { fact: "Emojis were created in Japan in 1999", text: "The designer wanted to add emotional context to messages." },
    { fact: "The first online chat system was Talkomatic", text: "It was built in 1973 and supported up to 6 people." },
    { fact: "Google was originally named BackRub", text: "It analyzed backlinks to estimate the importance of sites." },
    { fact: "The first webcam monitored a coffee pot", text: "Scientists at Cambridge didn't want to walk to an empty pot." },
    { fact: "The word 'robot' comes from a Czech word", text: "It originates from 'robota', meaning forced labor." },
    { fact: "Over 100 billion chat messages are sent daily", text: "That is more than 12 messages for every person on Earth!" }
];

const SplashScreen = ({ onComplete }) => {
    const [selectedFact, setSelectedFact] = useState({ fact: "", text: "" });

    useEffect(() => {
        const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        setSelectedFact(randomFact);

        // Auto transition after completion
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3600);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#0f1012] text-white p-8 select-none"
        >
            {/* Top Empty Space to center logo */}
            <div className="flex-1" />

            {/* Glowing Icon & Branding Section */}
            <div className="flex flex-col items-center gap-6 flex-1 justify-center">
                {/* Custom Motion-Animated Icon */}
                <div className="relative flex items-center justify-center">
                    {/* Ring 1 - Outermost slow pulse */}
                    <motion.div
                        animate={{
                            scale: [1, 1.25, 1],
                            opacity: [0.15, 0.3, 0.15],
                            rotate: 360
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute w-36 h-36 rounded-full border border-dashed border-blue-500/30"
                    />

                    {/* Ring 2 - Inner fast pulse */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute w-28 h-28 rounded-full bg-blue-500/10 blur-md"
                    />

                    {/* Main Icon Container */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 15,
                            delay: 0.2
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="relative z-10 w-20 h-20 bg-linear-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 border border-white/10"
                    >
                        <IoChatbubblesSharp className="text-4xl text-white drop-shadow-md" />

                        {/* Sparkling detail */}
                        <motion.div
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.8, 1.2, 0.8],
                                y: [-2, 2, -2]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-1 -right-1 text-yellow-300"
                        >
                            <RiSparklingFill className="text-xl" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Brand Name */}
                <div className="text-center mt-2">
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-[26px] font-extrabold tracking-wider bg-linear-to-r from-white via-[#dbdee1] to-gray-500 bg-clip-text text-transparent"
                    >
                        Dismantled Chat
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="text-xs text-[#949ba4] font-medium tracking-widest mt-1 uppercase"
                    >
                        Secure • Fast • Modern
                    </motion.p>
                </div>
            </div>

            {/* Bottom Section: Loading & Fun Fact */}
            <div className="flex-1 flex flex-col justify-end items-center w-full max-w-sm gap-8 pb-10">
                {/* Horizontal Progress bar */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "easeInOut" }}
                        className="h-full bg-linear-to-r from-blue-500 to-indigo-500"
                    />
                </div>

                {/* Fun Fact Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-center px-4"
                >
                    <span className="inline-block text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 mb-3">
                        Fun Fact
                    </span>
                    <p className="text-[#dbdee1] text-[14px] font-semibold leading-snug whitespace-pre-line">
                        {selectedFact.fact}
                    </p>
                    <p className="text-[#949ba4] text-[12px] mt-1.5 font-normal italic leading-relaxed">
                        Did you know? {selectedFact.text}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
