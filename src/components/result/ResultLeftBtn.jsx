import { motion } from "motion/react";
import scanSmiley from "../../assets/img/scan-smiley-white.svg";
import downloadSimpleLight from "../../assets/img/download-simple-light.svg";
import arrowUDownLeftLight from "../../assets/img/arrow-u-down-left-light.svg";

import resultLeftConst from "../../data/result/resultLeftConst.json";

export default function ResultLeftBtn() {
   return (
       <>
           <div className="grid md:grid-cols-3 grid-cols-2 md:gap-0 gap-2 place-items-center w-full">
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 rounded-full md:px-10 px-6 py-4 cursor-pointer" type="button" onClick={() => {}}>
                    <img src={scanSmiley} className="w-6 h-6" />
                    <p className="font-light pt-1 font-gmarket">{resultLeftConst[1]}</p>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 rounded-full md:px-10 px-6 py-4 cursor-pointer" type="button" onClick={() => {}}>
                    <img src={downloadSimpleLight} className="w-5 h-5" />
                    <p className="font-light pt-1 font-gmarket">{resultLeftConst[2]}</p>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="md:flex hidden font-medium text-sm flex-row gap-2 items-center opacity-50 text-[#3D2E35] border border-[#3D2E35] rounded-full px-10 py-4 cursor-pointer" type="button" onClick={() => {}}>
                    <img src={arrowUDownLeftLight} className="w-5 h-5" />
                    <p className="pt-1 font-gmarket">{resultLeftConst[3]}</p>
                </motion.button>
            </div>
       </>
   )
}