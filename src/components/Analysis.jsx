import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import checkLight from "../assets/img/check-light.svg";
import BlobGradient from "./BlobGradient";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";

const STATUS_ITEMS = [
    { label: "얼굴 영역 인식" },
    { label: "피부톤 추출" },
    { label: "퍼스널 매칭" },
    { label: "추천 제품 생성" },
];

const THRESHOLDS = [23, 52, 76, 92];
const MOBILE_COLUMNS = [[0, 2], [1, 3]];

export default function Analysis() {
    const [progress, setProgress] = useState(0);
    const loadingPercentage = useMotionValue(0);

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
        <div className="flex-1 w-full min-h-0 pb-10 md:pb-0 md:flex-none md:h-[50vh] md:flex md:flex-col md:items-center md:justify-center">
            {createPortal(
                <div className="md:hidden">
                    <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                            transition={{ scale: { type: "spring", stiffness: 100, damping: 10 } }}
                            className="relative w-28 h-28 shrink-0"
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
                    </div>

                    <div className="fixed left-[10%] right-[10%] top-[calc(50dvh+4.5rem)] z-20 flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center gap-3 w-full">
                            <motion.p className="text-center text-lg text-[#3D2E35]/50 font-gmarket whitespace-nowrap">{loadingText}</motion.p>
                            <div className="relative w-full h-2 bg-[#3D2E35]/15 rounded-full">
                                <motion.div
                                    style={{ width: progressWidth }}
                                    className="absolute h-2 bg-gradient-to-l from-[#7ACFC9] from-0% to-[#7A9EE8] to-100% rounded-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-center gap-x-8 w-full text-sm font-light text-[#3D2E35] font-gmarket px-2">
                            {MOBILE_COLUMNS.map((item) => (
                                <div key={item.join("-")} className="flex flex-col gap-3 items-start">
                                    {item.map((i) => {
                                        const done = progress >= THRESHOLDS[i];
                                        return (
                                            <div key={STATUS_ITEMS[i].label} className="flex flex-row gap-2 items-center">
                                                <div className={`w-6 h-6 rounded-full shrink-0 ${done ? "bg-[#3D2E35] relative" : "bg-[#3D2E35]/50"}`}>
                                                    {done && (
                                                        <img src={checkLight} className="w-3.5 h-3.5 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
                                                    )}
                                                </div>
                                                <p className="pt-0.5 whitespace-nowrap">{STATUS_ITEMS[i].label}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body,
            )}

            <div className="hidden md:flex flex-col items-center gap-10 w-full px-2">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                    transition={{ scale: { type: "spring", stiffness: 100, damping: 10 } }}
                    className="relative w-30 h-30 shrink-0"
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

                <div className="flex flex-col items-center gap-6 w-full max-w-100 px-4">
                    <motion.p className="text-center text-2xl text-[#3D2E35]/50 font-gmarket whitespace-nowrap">{loadingText}</motion.p>
                    <div className="relative w-full h-2 bg-[#3D2E35]/15 rounded-full">
                        <motion.div
                            style={{ width: progressWidth }}
                            className="absolute h-2 bg-gradient-to-l from-[#7ACFC9] from-0% to-[#7A9EE8] to-100% rounded-full"
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-x-3 gap-y-2 text-xs w-full max-w-120 mx-auto font-light text-[#3D2E35] font-gmarket px-2">
                    {STATUS_ITEMS.map((item, i) => {
                        const done = progress >= THRESHOLDS[i];
                        return (
                            <div key={item.label} className="flex flex-row gap-2 items-center">
                                <div className={`w-6 h-6 rounded-full shrink-0 ${done ? "bg-[#3D2E35] relative" : "bg-[#3D2E35]/50"}`}>
                                    {done && (
                                        <img src={checkLight} className="w-4 h-4 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
                                    )}
                                </div>
                                <p className="pt-1">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
