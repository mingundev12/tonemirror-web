import { motion } from "motion/react";

import BlobGradient from "../components/common/BlobGradient";

import warmSpringFoundationProducts from "../data/makeUp/warmSpringFoundationProducts.json";
import coolSummerFoundationProducts from "../data/makeUp/coolSummerFoundationProducts.json";
import warmAutumnFoundationProducts from "../data/makeUp/warmAutumnFoundationProducts.json";
import coolWinterFoundationProducts from "../data/makeUp/coolWinterFoundationProducts.json";
import MakeUpTitle from "../components/makeUp/makeUpTitle";
import MakeUpContent from "../components/makeUp/makeUpContent";

export default function MakeUp({userToneStatus}) {

    const products =
        userToneStatus === "Warm Spring" ? warmSpringFoundationProducts
        : userToneStatus === "Cool Summer" ? coolSummerFoundationProducts
        : userToneStatus === "Warm Autumn" ? warmAutumnFoundationProducts
        : userToneStatus === "Cool Winter" ? coolWinterFoundationProducts
        : [];
    
   return (
       <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-screen relative overflow-hidden z-50">
                {/* 그라데이션 배경 */}
                <div className="absolute w-full h-screen opacity-30 -z-50">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>

                {/* 컨텐츠 */}
                <div className="mx-[10%] flex flex-col h-full justify-center items-center gap-10">
                    {/* 상단 타이틀 */}
                    <MakeUpTitle motion={motion} />

                    {/* 하단 컨텐츠 */}
                    <MakeUpContent motion={motion} products={products} userToneStatus={userToneStatus} />
                </div>

            </motion.div>
       </>
   )
}