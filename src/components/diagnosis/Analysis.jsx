import { useState } from "react";
import { motion } from "motion/react";

import LoadingMotion from "./LoadingMotion";


import PercentageBar from "./PercentageBar";
import LoadingStatus from "./LoadingStatus";


export default function Analysis() {
    const [progress, setProgress] = useState(0);
    
    return (
        <div className="flex-1 w-full min-h-0 pb-10 md:pb-0 md:flex-none md:h-[50vh] flex flex-col items-center justify-center gap-4 md:gap-10 px-2">

            {/* 로딩 애니메이션 */}
            <LoadingMotion motion={motion} />

            {/* 퍼센티지바 */}
            <PercentageBar motion={motion} setProgress={setProgress}/>

            {/* 상태표시 */}
            <LoadingStatus progress={progress}/>

        </div>
    );
}
