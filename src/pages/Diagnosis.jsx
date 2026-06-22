import { useState } from "react"


import rightArrowWhite from "../assets/img/arrow-right-white.svg";
import { motion, AnimatePresence } from "motion/react";
import ImageUpload from "../components/ImageUpload";
import Analysis from "../components/Analysis";
import BlobGradient from "../components/BlobGradient";
import Ready from "../components/Ready";



export default function Diagnosis() {

    const [diagStatus, setDiagStatus] = useState("ready")
    const [swapped, setSwapped] = useState(false);
    const [swapped2, setSwapped2] = useState(false);

   return (
       <>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#FDFAF7] from-40% to-transparent to-70% z-1 pointer-events-none" />
                <div className="absolute w-full h-screen opacity-30 -z-50">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>

                <div className="h-screen relative mx-[10%] pt-30 z-10">

                    <div className="md:scale-100 scale-90 flex flex-row gap-2 justify-center items-center font-semibold font-roboto">
                        <div className="relative">
                            <p className={`${diagStatus === "ready" ? " bg-[#3D2E35] text-[#FDFAF7]" : "/50 text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>01</p>
                            <p className={`${diagStatus === "ready" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>준비</p>
                        </div>
                        <hr className="border-[#3D2E35]/50 w-28" />
                        <div className="relative">
                            <p className={`${diagStatus === "upload" ? " bg-[#3D2E35] text-[#FDFAF7]" : "/50 text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>02</p>
                            <p className={`${diagStatus === "upload" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>이미지 업로드</p>
                        </div>
                        <hr className="border-[#3D2E35]/50 w-28" />
                        <div className="relative">
                            <p className={`${diagStatus === "analysis" ? " bg-[#3D2E35] text-[#FDFAF7]" : "/50 text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>03</p>
                            <p className={`${diagStatus === "analysis" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>분석</p>
                        </div>
                    </div>
                    


                    <div className="grid grid-cols-3 items-center mb-10 mt-20">
                        <div className="flex justify-start">
                            {(diagStatus === "upload" || diagStatus === "analysis") && (
                            <AnimatePresence>
                                <motion.div
                                    onMouseEnter={() => setSwapped2(true)}
                                    onMouseLeave={() => setSwapped2(false)}
                                    onClick={() => {
                                        setSwapped2(false);
                                        setDiagStatus(diagStatus === "upload" ? "ready" : "upload");
                                    }}
                                    className="flex flex-row z-50 pointer-events-auto cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ scale: 0, width: "0px" }}
                                        animate={{ scale: swapped2 ? 1 : 0, width: swapped2 ? "56px" : "0px" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative flex items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />
                                        <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />
                                    </motion.div>

                                    <motion.div
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative flex tracking-wider items-center justify-center h-14 w-fit text-[#FDFAF7] pt-[6px] text-left px-10 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />
                                        <span className="relative z-10 font-light font-gmarket">이전 단계</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ scale: 1, width: "56px" }}
                                        animate={{ scale: swapped2 ? 0 : 1, width: swapped2 ? "0px" : "56px" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative flex items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />
                                        <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                            )}
                        </div>

                        <div className="flex flex-col items-center text-center">
                            {diagStatus === "upload" ? (
                            <>
                                <p className="md:text-4xl text-3xl text-[#3D2E35] font-gmarket">얼굴 사진을 업로드해주세요.</p>
                                <p className="text-lg font-light text-[#3D2E35] font-gmarket">본인 피부색과 가장 가까운 사진을 골라주세요.</p>
                            </>)
                             : diagStatus === "analysis" ? (
                            <>
                                <p className="md:text-4xl text-3xl text-[#3D2E35] font-gmarket">분석 중 입니다.</p>
                                <p className="text-lg font-light text-[#3D2E35] font-gmarket">피부톤과 컬러 데이터를 정밀하게 분석하고 있어요.</p>
                            </>)
                            : diagStatus === "ready" ? (
                                <>
                                    <p className="md:text-4xl text-3xl text-[#3D2E35] font-gmarket">촬영 전 확인해주세요.</p>
                                    <p className="text-lg font-light text-[#3D2E35] font-gmarket">정확한 진단을 위해 아래 사항을 확인해주세요.</p>
                                </>)
                            : ""}
                        </div>

                        <div className="flex justify-end">
                            {(diagStatus === "ready" || diagStatus === "upload") && (
                            <AnimatePresence>
                                <motion.div
                                    onMouseEnter={() => setSwapped(true)}
                                    onMouseLeave={() => setSwapped(false)}
                                    onClick={() => {
                                        setSwapped(false);
                                        setDiagStatus(diagStatus === "ready" ? "upload" : "analysis");
                                    }}
                                    className="flex flex-row z-50 pointer-events-auto cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ scale: 1, width: "56px" }}
                                        animate={{ scale: swapped ? 0 : 1, width: swapped ? "0px" : "56px" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative flex items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />
                                        <img src={rightArrowWhite} className="absolute w-5 z-10" />
                                    </motion.div>

                                    <motion.div
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative flex tracking-wider items-center justify-center h-14 w-fit text-[#FDFAF7] pt-[6px] text-left px-10 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />
                                        <span className="relative z-10 font-light font-gmarket">다음 단계</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ scale: 0, width: "0px" }}
                                        animate={{ scale: swapped ? 1 : 0, width: swapped ? "56px" : "0px" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative flex items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />
                                        <img src={rightArrowWhite} className="absolute w-5 z-10" />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                            )}
                        </div>
                    </div>
                    
                    {diagStatus === "upload" ? 
                        <ImageUpload />
                        : diagStatus === "analysis" ? <Analysis /> : diagStatus === "ready" ? <Ready /> : ""
                        
                    }                       
                    
                    


                </div>
           </motion.div>
       </>
   )
}