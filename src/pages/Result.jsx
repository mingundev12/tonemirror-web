import { useRef, useCallback } from "react";
import { motion } from "motion/react";
import { toPng } from "html-to-image";

import ResultRight from "../components/result/ResultRight";
import ResultLeft from "../components/result/ResultLeft";
import ResultLeftBtn from "../components/result/ResultLeftBtn";
import ResultShare from "../components/result/ResultShare";

import resultPersonalColor from "../data/result/resultPersonalColor.json";
import resultLeftConst from "../data/result/resultLeftConst.json";

export default function Result({userToneStatus, userSkinTone}) {

    const shareRef = useRef(null);
    const personalColorData = resultPersonalColor.find((p) => p.eng === userToneStatus) ?? null;

    const handleSave = useCallback(async () => {
        if (!shareRef.current || !personalColorData) return;

        await document.fonts.ready;

        const dataUrl = await toPng(shareRef.current, {
            pixelRatio: 2,
            backgroundColor: "#FDFAF7",
            cacheBust: true,
            width: 800,
        });

        const link = document.createElement("a");
        link.download = `tonemirror-${personalColorData.eng.replace(/\s+/g, "-").toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
    }, [personalColorData]);

   return (
       <>   
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">

                <div className="w-full min-h-dvh md:h-screen relative z-50">
                    <div className="relative md:absolute mx-[10%] md:h-full flex flex-col pt-30 md:pt-0 md:mt-0 md:justify-center gap-10 pb-10 md:pb-0 z-[100]">
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10">
                            
                            {/* 왼쪽 컨텐츠 */}
                            <ResultLeft personalColorData={personalColorData} onSave={handleSave} />

                            {/* 데스크탑 오른쪽 컨텐츠 */}
                            <motion.div
                                initial={{ y: 200 }}
                                animate={{ y: 0}}
                                transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                                className="md:block hidden"
                            >
                                <ResultRight personalColorData={personalColorData} userSkinTone={userSkinTone} />
                            </motion.div>

                            {/* 모바일 오른쪽 컨텐츠 */}
                            <motion.div
                                initial={{ opacity: 0, y: 300 }}
                                whileInView={{ opacity: 1, y: 0}}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 20, stiffness: 100}}
                                className="md:hidden block"
                            >
                                <ResultRight personalColorData={personalColorData} userSkinTone={userSkinTone} />
                            </motion.div>

                            {/* 모바일 버튼 */}
                            <div className="md:hidden block">
                                <ResultLeftBtn resultLeftConst={resultLeftConst} onSave={handleSave} />
                            </div>

                        </div>
                    </div>
                </div>
                
            </motion.div>
            
            {/* 결과 저장 컴포넌트 */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none" aria-hidden="true">
                <ResultShare
                    ref={shareRef}
                    personalColorData={personalColorData}
                    userSkinTone={userSkinTone}
                />
            </div>
       </>
   )
}
