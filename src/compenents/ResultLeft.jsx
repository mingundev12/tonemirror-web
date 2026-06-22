import chartRadarFilled from "../assets/img/chart-radar-filled.svg"
import downloadSimpleLight from "../assets/img/download-simple-light.svg";
import arrowUDownLeftLight from "../assets/img/arrow-u-down-left-light.svg";
import lightbulbFilamentLight from "../assets/img/lightbulb-filament-light.svg";
import warningLight from "../assets/img/warning-light.svg";
import scanSmiley from "../assets/img/scan-smiley-white.svg";

import { motion } from "motion/react";
export default function ResultLeft({personalColorData}) {
   return (
       <>
           <div className="flex flex-col gap-10 w-full p-10">
                <div className="flex flex-row items-center gap-2">
                    <img src={chartRadarFilled} className="w-6 h-6 opacity-50" />
                    <p className="text-[#3D2E35]/50 pt-1 font-light font-gmarket">퍼스널 컬러 진단 결과</p>
                </div>
                
                
                <div className="grid grid-cols-2 gap-10 relative items-center">
                    
                    <div>
                        <div className="flex flex-col gap-6">                    
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl tracking-wider font-bold text-[#3D2E35] leading-tight font-rebecca">{personalColorData.eng}</p>
                                <p className="text-md text-[#3D2E35] font-gmarket">{personalColorData.kor}</p>
                            </div>
                            <p className="text-md text-[#3D2E35] font-light font-gmarket">{personalColorData.description}</p>
                        </div>
                    </div>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[0.1px] h-full bg-[#3D2E35]/25" />

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-1 items-center">
                                <img src={lightbulbFilamentLight} className="w-5 h-5" />
                                <p className="text-md text-[#3D2E35]/75 font-gmarket pt-1">BEST TIP</p>
                            </div>
                            
                            <p className="text-sm text-[#3D2E35]/75 font-light font-gmarket">{personalColorData.bestTip}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-1 items-center">
                                <img src={warningLight} className="w-5 h-5" />
                                <p className="text-md text-[#3D2E35]/75 font-gmarket pt-1">WORST TIP</p>
                            </div>
                            <p className="text-sm text-[#3D2E35]/75 font-light font-gmarket">{personalColorData.worstTip}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 place-items-center w-full">
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                        transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                        className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 rounded-full px-10 py-4 cursor-pointer" type="button" onClick={() => {}}>
                        <img src={scanSmiley} className="w-6 h-6" />
                        <p className="font-light pt-1 font-gmarket">가상 메이크업</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                        transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                        className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 rounded-full px-10 py-4 cursor-pointer" type="button" onClick={() => {}}>
                        <img src={downloadSimpleLight} className="w-5 h-5" />
                        <p className="font-light pt-1 font-gmarket">결과 저장하기</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                        className="font-medium text-sm flex flex-row gap-2 items-center opacity-50 text-[#3D2E35] border border-[#3D2E35] rounded-full px-10 py-4 cursor-pointer" type="button" onClick={() => {}}>
                        <img src={arrowUDownLeftLight} className="w-5 h-5" />
                        <p className="pt-1 font-gmarket">다시 진단하기</p>
                    </motion.button>
                </div>
            </div>
       </>
   )
}