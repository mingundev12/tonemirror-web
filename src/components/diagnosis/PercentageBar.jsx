import { animate, useMotionTemplate, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

import percentageBarConst from "../../data/diagnosis/percentageBarConst.json";

export default function PercentageBar({motion, setProgress, handleAnalysisComplete, readyToFinish}) {
    const loadingPercentage = useMotionValue(0);

    // 분석 시작 시 퍼센티지 바 증가
    useEffect(() => {
        const controls = animate(loadingPercentage, 92, {
            duration: 5,
            ease: "easeInOut",
            onUpdate: (item) => setProgress(Math.round(item)),
        });
        return () => controls.stop();
    }, []);

    // 분석 완료 시 퍼센티지 바 증가
    useEffect(() => {
       if(!readyToFinish) return;
       const controls = animate(loadingPercentage, 100, {
        duration: 0.8,
        ease: "easeInOut",
        onUpdate: (item) => setProgress(Math.round(item)),
        onComplete: () => handleAnalysisComplete(),
       });
       return () => controls.stop();
    }, [readyToFinish])


    const rounded = useTransform(loadingPercentage, (item) => Math.round(item));
    const loadingText = useMotionTemplate`${rounded}% ${percentageBarConst}`;
    const progressWidth = useTransform(loadingPercentage, (item) => `${item}%`);

   return (
       <>
           <div className="flex flex-col items-center gap-3 md:gap-6 w-full max-w-100 px-4">
                <motion.p className="text-center text-lg md:text-2xl text-[#3D2E35]/50 font-gmarket whitespace-nowrap">{loadingText}</motion.p>
                <div className="relative w-full h-2 bg-[#3D2E35]/15 rounded-full">
                    <motion.div
                        style={{ width: progressWidth }}
                        className="absolute h-2 bg-gradient-to-l from-[#7ACFC9] from-0% to-[#7A9EE8] to-100% rounded-full"
                    />
                </div>
            </div>
       </>
   )
}