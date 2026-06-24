import { motion } from "motion/react";

import BlobGradient from "../components/common/BlobGradient";

import { useT } from "../locales";

import MakeUpTitle from "../components/makeUp/makeUpTitle";
import MakeUpContent from "../components/makeUp/makeUpContent";
import SaveBtn from "../components/makeUp/SaveBtn";

export default function MakeUp({userToneStatus}) {
    const t = useT();

    const products = t.foundationProducts[userToneStatus] ?? [];
    
   return (
       <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-dvh md:h-screen relative md:overflow-hidden overflow-auto z-50">
                <div className="absolute inset-0 min-h-dvh opacity-30 -z-50">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% pointer-events-none z-10" />
                    <BlobGradient />
                </div>

                <div className="mx-[10%] pt-30 md:pt-0 flex flex-col h-auto md:h-full justify-start md:justify-center items-center gap-10 pb-10 md:pb-0">
                    <MakeUpTitle motion={motion} SaveBtn={SaveBtn} />

                    <MakeUpContent motion={motion} products={products} userToneStatus={userToneStatus} />

                    <div className="md:hidden block">
                        <SaveBtn motion={motion} />
                    </div>
                </div>

            </motion.div>
       </>
   )
}
