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

    const isDiagStep = ["ready", "upload", "analysis"].includes(diagStatus);



   return (

       <>

           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">

                <div className="absolute w-full h-full bg-gradient-to-b from-[#FDFAF7] from-40% to-transparent to-70% z-1 pointer-events-none" />

                <div className="absolute w-full h-screen -z-50 opacity-30">

                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />

                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />

                    <BlobGradient />

                </div>



                <div className={`relative mx-[10%] z-10 ${isDiagStep ? "pt-20 md:pt-30 h-dvh md:h-screen flex flex-col md:block" : "pt-30 h-screen"}`}>



                    <div className={`md:scale-100 scale-90 flex flex-row gap-2 justify-center items-center font-semibold font-roboto ${isDiagStep ? "shrink-0 mb-4 md:mb-0" : ""}`}>

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

                    





                    <div className={`flex flex-col md:grid md:grid-cols-3 items-center gap-4 md:gap-0 shrink-0 ${isDiagStep ? "mt-8 mb-4 md:mt-20 md:mb-10" : "mt-20 mb-10"}`}>

                        <div className="hidden md:flex order-2 md:order-1 justify-start">

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

                                        className="md:flex hidden relative items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />

                                        <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />

                                    </motion.div>



                                    <motion.div

                                        transition={{ duration: 0.3, ease: "easeInOut" }}

                                        className="relative flex tracking-wider items-center justify-center md:h-14 h-10 w-fit text-[#FDFAF7] pt-[6px] text-left md:px-10 px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                        <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">

                                            <img src={rightArrowWhite} className="w-5 z-10 mb-1 rotate-180 md:hidden block" />

                                            이전 단계

                                        </span>

                                    </motion.div>



                                    <motion.div

                                        initial={{ scale: 1, width: "56px" }}

                                        animate={{ scale: swapped2 ? 0 : 1, width: swapped2 ? "0px" : "56px" }}

                                        transition={{ duration: 0.3, ease: "easeInOut" }}

                                        className="md:flex hidden relative items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />

                                        <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />

                                    </motion.div>

                                </motion.div>

                            </AnimatePresence>

                            )}

                        </div>



                        <div className="order-1 md:order-2 flex flex-col items-center text-center">

                            <div className="md:text-4xl text-2xl">

                            {diagStatus === "upload" ? (

                            <>

                                <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">얼굴 사진을 업로드해주세요.</p>

                                <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">본인 피부색과 가장 가까운 <br className="md:hidden block"/>  사진을 골라주세요.</p>

                            </>)

                             : diagStatus === "analysis" ? (

                            <>

                                <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">분석 중 입니다.</p>

                                <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">피부톤과 컬러 데이터를 <br className="md:hidden block"/> 정밀하게 분석하고 있어요.</p>

                            </>)

                            : diagStatus === "ready" ? (

                                <>

                                    <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">촬영 전 확인해주세요.</p>

                                    <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">정확한 진단을 위해 <br className="md:hidden block"/> 아래 사항을 확인해주세요.</p>

                                </>)

                            : ""}

                            </div>

                            {diagStatus === "ready" && (

                                <div className="md:hidden flex justify-center mt-1 w-full min-h-10">

                                    <AnimatePresence>

                                        <motion.div

                                            onMouseEnter={() => setSwapped(true)}

                                            onMouseLeave={() => setSwapped(false)}

                                            onClick={() => {

                                                setSwapped(false);

                                                setDiagStatus("upload");

                                            }}

                                            className="flex flex-row z-50 pointer-events-auto cursor-pointer"

                                        >

                                            <motion.div

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="relative flex tracking-wider items-center justify-center h-10 w-fit text-[#FDFAF7] pt-[6px] px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                                <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">

                                                    <img src={rightArrowWhite} className="w-5 mb-1 z-10" alt="" />

                                                    다음 단계

                                                </span>

                                            </motion.div>

                                        </motion.div>

                                    </AnimatePresence>

                                </div>

                            )}

                            {diagStatus === "upload" && (

                                <div className="md:hidden flex flex-row gap-2 items-center justify-center mt-1 w-full min-h-10">

                                    <AnimatePresence>

                                        <motion.div

                                            onMouseEnter={() => setSwapped2(true)}

                                            onMouseLeave={() => setSwapped2(false)}

                                            onClick={() => {

                                                setSwapped2(false);

                                                setDiagStatus("ready");

                                            }}

                                            className="flex flex-row z-50 pointer-events-auto cursor-pointer"

                                        >

                                            <motion.div

                                                initial={{ scale: 0, width: "0px" }}

                                                animate={{ scale: swapped2 ? 1 : 0, width: swapped2 ? "56px" : "0px" }}

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="md:flex hidden relative items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />

                                                <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />

                                            </motion.div>



                                            <motion.div

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="relative flex tracking-wider items-center justify-center md:h-14 h-10 w-fit text-[#FDFAF7] pt-[6px] text-left md:px-10 px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">

                                                    <img src={rightArrowWhite} className="w-5 z-10 mb-1 rotate-180 md:hidden block" />

                                                    이전 단계

                                                </span>

                                            </motion.div>



                                            <motion.div

                                                initial={{ scale: 1, width: "56px" }}

                                                animate={{ scale: swapped2 ? 0 : 1, width: swapped2 ? "0px" : "56px" }}

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="md:flex hidden relative items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped2 ? 1 : 0 }} />

                                                <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />

                                            </motion.div>

                                        </motion.div>

                                    </AnimatePresence>

                                    <AnimatePresence>

                                        <motion.div

                                            onMouseEnter={() => setSwapped(true)}

                                            onMouseLeave={() => setSwapped(false)}

                                            onClick={() => {

                                                setSwapped(false);

                                                setDiagStatus("analysis");

                                            }}

                                            className="flex flex-row z-50 pointer-events-auto cursor-pointer"

                                        >

                                            <motion.div

                                                initial={{ scale: 1, width: "56px" }}

                                                animate={{ scale: swapped ? 0 : 1, width: swapped ? "0px" : "56px" }}

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="md:flex hidden relative  items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                                <img src={rightArrowWhite} className="absolute w-5 z-10" />

                                            </motion.div>



                                            <motion.div

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="relative flex tracking-wider items-center justify-center md:h-14 h-10 w-fit text-[#FDFAF7] pt-[6px] text-left md:px-10 px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                                <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">

                                                    <img src={rightArrowWhite} className="w-5 mb-1 z-10 md:hidden block" />

                                                    다음 단계

                                                </span>

                                            </motion.div>



                                            <motion.div

                                                initial={{ scale: 0, width: "0px" }}

                                                animate={{ scale: swapped ? 1 : 0, width: swapped ? "56px" : "0px" }}

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="md:flex hidden relative  items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                                <img src={rightArrowWhite} className="absolute w-5 z-10" />

                                            </motion.div>

                                        </motion.div>

                                    </AnimatePresence>

                                </div>

                            )}

                            {diagStatus === "analysis" && (

                                <div className="md:hidden flex justify-center mt-1 w-full">

                                    <AnimatePresence>

                                        <motion.div

                                            onMouseEnter={() => setSwapped2(true)}

                                            onMouseLeave={() => setSwapped2(false)}

                                            onClick={() => {

                                                setSwapped2(false);

                                                setDiagStatus("upload");

                                            }}

                                            className="flex flex-row z-50 pointer-events-auto cursor-pointer"

                                        >

                                            <motion.div

                                                transition={{ duration: 0.3, ease: "easeInOut" }}

                                                className="relative flex tracking-wider items-center justify-center h-10 w-fit text-[#FDFAF7] pt-[6px] px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                                <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">

                                                    <img src={rightArrowWhite} className="w-5 z-10 mb-1 rotate-180" alt="" />

                                                    이전 단계

                                                </span>

                                            </motion.div>

                                        </motion.div>

                                    </AnimatePresence>

                                </div>

                            )}

                        </div>



                        <div className={`order-3 md:order-3 flex justify-end ${diagStatus === "upload" || diagStatus === "ready" ? "hidden md:flex" : ""}`}>

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

                                        className="md:flex hidden relative  items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                        <img src={rightArrowWhite} className="absolute w-5 z-10" />

                                    </motion.div>



                                    <motion.div

                                        transition={{ duration: 0.3, ease: "easeInOut" }}

                                        className="relative flex tracking-wider items-center justify-center md:h-14 h-10 w-fit text-[#FDFAF7] pt-[6px] text-left md:px-10 px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                        <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">

                                            <img src={rightArrowWhite} className="w-5 mb-1 z-10 md:hidden block" />

                                            다음 단계

                                        </span>

                                    </motion.div>



                                    <motion.div

                                        initial={{ scale: 0, width: "0px" }}

                                        animate={{ scale: swapped ? 1 : 0, width: swapped ? "56px" : "0px" }}

                                        transition={{ duration: 0.3, ease: "easeInOut" }}

                                        className="md:flex hidden relative  items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">

                                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />

                                        <img src={rightArrowWhite} className="absolute w-5 z-10" />

                                    </motion.div>

                                </motion.div>

                            </AnimatePresence>

                            )}

                        </div>

                    </div>

                    

                    {diagStatus === "upload" ? 

                        <div className="flex-1 flex flex-col md:contents">

                        <ImageUpload />

                        </div>

                        : diagStatus === "analysis" ? 

                        <div className="flex-1 flex flex-col md:contents">

                        <Analysis />

                        </div>

                        : diagStatus === "ready" ? 

                        <div className="flex-1 flex flex-col md:contents">

                        <Ready />

                        </div>

                        : ""

                        

                    }                       

                    

                    





                </div>

           </motion.div>

       </>

   )

}

