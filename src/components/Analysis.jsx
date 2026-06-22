import { useEffect, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";

import checkLight from "../assets/img/check-light.svg";

import BlobGradient from "./common/BlobGradient";

import analysisStatus from "../data/analysisStatus.json";



export default function Analysis() {
    const [progress, setProgress] = useState(0);
    const loadingPercentage = useMotionValue(0);
    const THRESHOLDS = [23, 52, 76, 92];

    useEffect(() => {
        const controls = animate(loadingPercentage, 92, {
            duration: 5,
            ease: "easeInOut",
            onUpdate: (v) => setProgress(Math.round(v)),
        });
        return () => controls.stop();
    }, [loadingPercentage]);

    const rounded = useTransform(loadingPercentage, (v) => Math.round(v));
    const loadingText = useMotionTemplate`${rounded}% 분석 중`;
    const progressWidth = useTransform(loadingPercentage, (v) => `${v}%`);

    return (
        <div className="flex-1 w-full min-h-0 pb-10 md:pb-0 md:flex-none md:h-[50vh] flex flex-col items-center justify-center gap-4 md:gap-10 px-2">

            {/* 로딩 애니메이션 */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                transition={{ scale: { type: "spring", stiffness: 100, damping: 10 } }}
                className="relative w-28 h-28 md:w-30 md:h-30 shrink-0"
            >
                <div className="relative w-full h-full animate-[spin_10s_linear_infinite]">
                    <div className="relative w-full h-full aspect-square rounded-full overflow-hidden">
                        <BlobGradient />
                        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "inset 0 0 20px 5px rgba(255,255,255,0.75)" }} />
                    </div>
                    <div className="absolute inset-0 translate-y-0 scale-110 rounded-full overflow-hidden blur-xl opacity-85 -z-10">
                        <BlobGradient />
                    </div>
                </div>
            </motion.div>

            {/* 퍼센티지바 */}
            <div className="flex flex-col items-center gap-3 md:gap-6 w-full max-w-100 px-4">
                <motion.p className="text-center text-lg md:text-2xl text-[#3D2E35]/50 font-gmarket whitespace-nowrap">{loadingText}</motion.p>
                <div className="relative w-full h-2 bg-[#3D2E35]/15 rounded-full">
                    <motion.div
                        style={{ width: progressWidth }}
                        className="absolute h-2 bg-gradient-to-l from-[#7ACFC9] from-0% to-[#7A9EE8] to-100% rounded-full"
                    />
                </div>
            </div>

            {/* 상태표시 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-x-3 w-full max-w-120 mx-auto text-sm md:text-xs font-light text-[#3D2E35] font-gmarket px-2">
                {analysisStatus.map((item, i) => {
                    const done = progress >= THRESHOLDS[i];
                    return (
                        <div key={item.label} className="flex flex-row gap-2 items-center">
                            <div className={`w-6 h-6 rounded-full shrink-0 ${done ? "bg-[#3D2E35] relative" : "bg-[#3D2E35]/50"}`}>
                                {done && (
                                    <img src={checkLight} className="w-3.5 h-3.5 md:w-4 md:h-4 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
                                )}
                            </div>
                            <p className="pt-0.5 md:pt-1 whitespace-nowrap md:whitespace-normal">{item.label}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
