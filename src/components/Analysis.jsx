import { useEffect } from "react";
import checkLight from "../assets/img/check-light.svg";

import BlobGradient from "./BlobGradient";

import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";



export default function Analysis() {

    const loadingPercentage = useMotionValue(0)
    useEffect(() => {
       const controls = animate(loadingPercentage, 92, { duration: 5, ease: "easeInOut" })
       return () => {
        controls.stop()
       }
    }, [])

    const rounded = useTransform(loadingPercentage, (item) => Math.round(item))
    const loadingText = useMotionTemplate`${rounded}% 분석 중`

    return (

        <>

            <div className="flex flex-col items-center justify-center gap-10 w-full h-[50vh]">

                <div className="flex flex-col gap-10 w-full items-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                        transition={{ scale: { type: "spring", stiffness: 100, damping: 10 } }}
                        className="relative w-30 h-30">

                        <div className="relative w-full h-full animate-[spin_10s_linear_infinite]">
                            <div className="relative w-30 h-30 aspect-square rounded-full overflow-hidden">
                                <BlobGradient />
                                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "inset 0 0 20px 5px rgba(255,255,255,0.75)" }}/>
                            </div>
                            <div className="absolute inset-0 translate-y-0 scale-110 rounded-full overflow-hidden blur-xl opacity-85 -z-10">
                                <BlobGradient />
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex flex-col items-center justify-center gap-6">
                        <motion.p className="text-center text-2xl text-[#3D2E35]/50 font-gmarket">{loadingText}</motion.p>
                        <div className="relative w-100 h-2 bg-[#3D2E35]/15 rounded-full">
                            <motion.div 
                            style={{ width: useTransform(loadingPercentage, (item) => `${item}%`) }}
                            className="absolute h-2 bg-gradient-to-l from-[#7ACFC9] from-0% to-[#7A9EE8] to-100% rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between text-xs w-120 font-light text-[#3D2E35] font-gmarket">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-[#3D2E35] relative">
                            <img src={checkLight} className="w-4 h-4 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                        </div>
                        <p className="pt-1">얼굴 영역 인식</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-[#3D2E35]/50" />
                        <p className="pt-1">피부톤 추출</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-[#3D2E35]/50" />
                        <p className="pt-1">퍼스널 매칭</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-[#3D2E35]/50" />
                        <p className="pt-1">추천 제품 생성</p>
                    </div>
                </div>

            </div>

        </>

    );

}


