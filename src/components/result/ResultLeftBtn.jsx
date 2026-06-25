import { motion } from "motion/react";
import { Link } from "react-router-dom";

import scanSmiley from "../../assets/img/scan-smiley-white.svg";
import downloadSimpleLight from "../../assets/img/download-simple-light.svg";
import arrowUDownLeftLight from "../../assets/img/arrow-u-down-left-light.svg";

const MotionLink = motion(Link);

export default function ResultLeftBtn({resultLeftConst, onSave}) {
   return (
       <>
           <div className="grid md:grid-cols-3 grid-cols-2 md:gap-0 gap-2 place-items-center w-full">
                
                {/* 가상 메이크업 버튼 */}
                <MotionLink
                    to="/makeup"
                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 rounded-full md:px-10 px-6 py-4 cursor-pointer" type="button" onClick={() => {}}>
                    <img src={scanSmiley} className="w-6 h-6" />
                    <p className="font-light pt-1 font-gmarket">{resultLeftConst.subtitle}</p>
                </MotionLink>
                
                
                {/* 결과 저장 버튼 */}
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 rounded-full md:px-10 px-6 py-4 cursor-pointer" type="button" onClick={onSave}>
                    <img src={downloadSimpleLight} className="w-5 h-5" />
                    <p className="font-light pt-1 font-gmarket">{resultLeftConst.saveBtn}</p>
                </motion.button>
                
                {/* 다시 진단하기 버튼 */}
                <MotionLink
                    to="/diagnosis"
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="md:flex hidden font-medium text-sm flex-row gap-2 items-center opacity-50 text-[#3D2E35] border border-[#3D2E35] rounded-full px-10 py-4 cursor-pointer" type="button" onClick={() => {}}>
                    <img src={arrowUDownLeftLight} className="w-5 h-5" />
                    <p className="pt-1 font-gmarket">{resultLeftConst.retryBtn}</p>
                </MotionLink>
            </div>
       </>
   )
}