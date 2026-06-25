import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import rightArrowWhite from "../../assets/img/arrow-right-white.svg";

import diagNavBtnConst from "../../data/diagnosis/diagNavBtnConst.json";

export default function DiagNavBtn({ direction = "next", variant = "full", onClick }) {
    const [swapped, setSwapped] = useState(false);

    const handleClick = () => {
        setSwapped(false);
        onClick?.();
    };
    return (
        <AnimatePresence>
            <motion.div
                onMouseEnter={() => setSwapped(true)}
                onMouseLeave={() => setSwapped(false)}
                onClick={handleClick}
                className="flex flex-row z-50 pointer-events-auto cursor-pointer"
            >

                {direction === "prev" && variant === "full" ? (
                    <>
                        <motion.div
                            initial={{ scale: 0, width: "0px" }}
                            animate={{ scale: swapped ? 1 : 0, width: swapped ? "56px" : "0px" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:flex hidden relative items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                            <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />
                            <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />
                        </motion.div>

                        <motion.div
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative flex tracking-wider items-center justify-center md:h-14 h-10 w-fit text-[#FDFAF7] pt-[6px] text-left md:px-10 px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                            <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">
                                <img src={rightArrowWhite} className="w-5 z-10 mb-1 rotate-180 md:hidden block" />
                                {diagNavBtnConst.prevStep}
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 1, width: "56px" }}
                            animate={{ scale: swapped ? 0 : 1, width: swapped ? "0px" : "56px" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:flex hidden relative items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                            <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />
                            <img src={rightArrowWhite} className="absolute w-5 rotate-180 z-10" />
                        </motion.div>
                    </>
                ) : direction === "prev" && variant === "simple" ? (
                    <motion.div
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative flex tracking-wider items-center justify-center h-10 w-fit text-[#FDFAF7] pt-[6px] px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                        <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">
                            <img src={rightArrowWhite} className="w-5 z-10 mb-1 rotate-180" alt="" />
                            {diagNavBtnConst.prevStep}
                        </span>
                    </motion.div>
                ) : direction === "next" && variant === "simple" ? (
                    <motion.div
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative flex tracking-wider items-center justify-center h-10 w-fit text-[#FDFAF7] pt-[6px] px-4 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                        <div className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]" style={{ opacity: swapped ? 1 : 0 }} />
                        <span className="relative z-10 font-light font-gmarket flex flex-row gap-2 items-center justify-center">
                            <img src={rightArrowWhite} className="w-5 mb-1 z-10" alt="" />
                            {diagNavBtnConst.nextStep}
                        </span>
                    </motion.div>
                ) : (
                    <>
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
                                {diagNavBtnConst.nextStep}
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
                    </>
                )}

            </motion.div>
        </AnimatePresence>
    );
}
