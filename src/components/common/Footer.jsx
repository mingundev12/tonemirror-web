import { Link } from "react-router-dom";
import { motion } from "motion/react";

import longArrow from "../../assets/img/right-long-arrow.svg";
import contactIcon from "../../assets/img/paper-plane-tilt-light.svg";
import serviceIcon from "../../assets/img/toolbox-light.svg";

export default function Footer() {
    
    const MotionLink = motion(Link);

   return (
        <div className="box-border px-[10%] md:px-0 md:mx-[10%] flex flex-col h-auto md:h-screen md:justify-end min-w-0 pb-10">

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 min-w-0">

                <div className="md:h-90 h-60 flex flex-col justify-between p-10 glass rounded-2xl">
                    <div className="flex flex-row items-center gap-2">
                        <img src={contactIcon} className="w-5 h-5" />
                        <p className="font-gmarket text-sm font-light text-[#3D2E35] tracking-wider">CONTACT</p>
                    </div>
                    <motion.p
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                    className="font-rebecca md:text-4xl text-lg font-light text-[#3D2E35] break-all">tonemirror@gmail.com</motion.p>
                </div>

                <div className="flex flex-col md:h-90 h-60 justify-between p-10 glass rounded-2xl">
                    <div className="flex flex-col md:gap-8 gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <img src={serviceIcon} className="w-5 h-5" />
                            <p className="font-gmarket text-sm font-light text-[#3D2E35] tracking-wider">SERVICE</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-1 md:gap-4 gap-2">
                            <p className="font-gmarket md:text-sm text-xs font-light text-[#3D2E35] tracking-wider">진단</p>
                            <p className="font-gmarket md:text-sm text-xs font-light text-[#3D2E35] tracking-wider">퍼스널 컬러</p>
                            <p className="font-gmarket md:text-sm text-xs font-light text-[#3D2E35] tracking-wider">가상 메이크업</p>
                        </div>
                    </div>
                    <MotionLink
                        to="/diagnosis"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                        className="flex flex-row items-center gap-4"
                    >
                        <p className="font-rebecca md:text-4xl text-lg font-light text-[#3D2E35]">Go to Diagnosis</p>
                        <img src={longArrow} className="w-10 h-10" />
                    </MotionLink>
                </div>

            </div>

            <div className="flex md:flex-row flex-col md:items-baseline items-center justify-between mt-10 gap-2 text-xs text-[#3D2E35]">
                <p className="font-gmarket order-2 md:order-1">© 2025 ToneMirror. All rights reserved.</p>
                <MotionLink
                    to="/admin"
                    whileHover={{ fontWeight: "normal" }}
                    transition={{ duration: 0.2, ease: "easeInOut"}}
                    className="font-gmarket font-light md:order-2 order-1">관리자 페이지</MotionLink>
                <p className="font-gmarket order-3">Designed & Developed by ToneMirror</p>
            </div>

        </div>
   )
}
