import { useRef, useCallback } from "react";
import { motion } from "motion/react";
import { toPng } from "html-to-image";

import foundationProducts from "../data/makeup/foundationProducts.json";

import MakeUpTitle from "../components/makeUp/makeUpTitle";
import MakeUpContent from "../components/makeUp/makeUpContent";
import MakeUpShare from "../components/makeUp/MakeUpShare";
import SaveBtn from "../components/makeUp/SaveBtn";

export default function MakeUp({userToneStatus}) {
    const shareRef = useRef(null);
    const products = foundationProducts[userToneStatus] ?? [];

    const handleSave = useCallback(async () => {
        if (!shareRef.current) return;

        await document.fonts.ready;

        const dataUrl = await toPng(shareRef.current, {
            pixelRatio: 2,
            backgroundColor: "#FDFAF7",
            cacheBust: true,
            width: 800,
        });

        const link = document.createElement("a");
        link.download = `tonemirror-makeup-${userToneStatus.replace(/\s+/g, "-").toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
    }, [userToneStatus]);
    
   return (
       <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-dvh md:h-screen relative md:overflow-hidden overflow-auto z-50">

                <div className="mx-[10%] pt-30 md:pt-0 flex flex-col h-auto md:h-full justify-start md:justify-center items-center gap-10 pb-10 md:pb-0">
                    <MakeUpTitle motion={motion} SaveBtn={SaveBtn} onSave={handleSave} />

                    <MakeUpContent motion={motion} products={products} userToneStatus={userToneStatus} />

                    <div className="md:hidden block">
                        <SaveBtn motion={motion} onSave={handleSave} />
                    </div>
                </div>

            </motion.div>
            
            {/* 메이크업 저장 컴포넌트 */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none" aria-hidden="true">
                <MakeUpShare
                    ref={shareRef}
                    products={products}
                    userToneStatus={userToneStatus}
                />
            </div>
       </>
   )
}
