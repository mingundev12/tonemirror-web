import { useState } from "react";
import { motion } from "motion/react";

import LoadingMotion from "./LoadingMotion";
import PercentageBar from "./PercentageBar";
import LoadingStatus from "./LoadingStatus";


export default function Analysis({handleAnalysisComplete, readyToFinish}) {
    const [progress, setProgress] = useState(0);
    
    return (
        <div className="flex-1 w-full relative min-h-0 pb-10 md:pb-0 md:flex-none md:h-[50vh] flex flex-col md:items-center md:justify-center md:gap-10 px-2">

            {/* 모바일: blob + 퍼센티지 — 뷰포트 정중앙 */}
            <div className="fixed left-1/2 top-[50dvh] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 w-full px-[10%] md:static md:translate-x-0 md:translate-y-0 md:z-auto md:w-full md:px-2">
                <div className="relative flex flex-col items-center gap-4 w-full md:contents">
                    <LoadingMotion motion={motion} />
                    <PercentageBar motion={motion} setProgress={setProgress} handleAnalysisComplete={handleAnalysisComplete} readyToFinish={readyToFinish}/>
                    <div className="absolute top-full left-0 right-0 pt-4 w-full md:hidden">
                        <LoadingStatus progress={progress} mobile />
                    </div>
                </div>
            </div>

            {/* 상태표시 */}
            <div className="hidden md:block mt-auto w-full md:mt-0">
                <LoadingStatus progress={progress}/>
            </div>

        </div>
    );
}
