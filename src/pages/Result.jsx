import { motion } from "motion/react";

import BlobGradient from "../components/common/BlobGradient";
import ResultRight from "../components/result/ResultRight";
import ResultLeft from "../components/result/ResultLeft";
import ResultLeftBtn from "../components/result/ResultLeftBtn";

import { useT } from "../locales";

export default function Result({userToneStatus, userSkinTone}) {
    const t = useT();

    const personalColorData = t.resultPersonalColor.find((p) => p.eng === userToneStatus) ?? null;

   return (
       <>   
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                <div className="absolute w-full h-screen opacity-30 -z-50">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>

                <div className="w-full md:h-screen h-full relative z-50">
                    <div className="absolute mx-[10%] h-full flex flex-col mt-30 md:mt-0 md:justify-center gap-10 z-[100]">
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10">
                            <ResultLeft personalColorData={personalColorData} />

                            <motion.div
                                initial={{ y: 200 }}
                                animate={{ y: 0}}
                                transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                                className="md:block hidden"
                            >
                                <ResultRight personalColorData={personalColorData} userSkinTone={userSkinTone} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 300 }}
                                whileInView={{ opacity: 1, y: 0}}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 20, stiffness: 100}}
                                className="md:hidden block"
                            >
                                <ResultRight personalColorData={personalColorData} userSkinTone={userSkinTone} />
                            </motion.div>

                            <div className="md:hidden block">
                                <ResultLeftBtn />
                            </div>
                        </div>
                    </div>
                </div>
                
            </motion.div>
       </>
   )
}
