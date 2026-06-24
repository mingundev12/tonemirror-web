import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useTransform } from "motion/react";
import beforeSrc from "../../assets/modelHead1.png";
import afterSrc from "../../assets/modelHead2.png";

const HANDLE = 40;
const HALF = HANDLE / 2;

export default function HalfMakeupCard() {
    const containerRef = useRef(null);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(0);

    useEffect(() => {
        const measure = () => {
            const w = containerRef.current?.offsetWidth ?? 0;
            setWidth(w);
            x.set(w / 2 - HALF);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [x]);

    const pct = useTransform(x, (v) => (width ? ((v + HALF) / width) * 100 : 50));
    const clipPath = useMotionTemplate`inset(0 0 0 ${pct}%)`;
    const left = useMotionTemplate`${pct}%`;

    return (
        <div className="glass aspect-[9/16] w-full h-auto md:w-auto md:h-full shrink-0 rounded-3xl p-8 border border-[#FDFAF7]/30 flex flex-col gap-5">
            {/* 타이틀 */}
            <div>
                <p className="text-lg text-[#3D2E35] font-gmarket">Half Makeup 비교</p>
                <p className="text-sm font-light text-[#3D2E35]/60 font-gmarket">좌우로 드래그해 변화를 확인하세요</p>
            </div>

            {/* 메이크업 비교 */}
            <div className="flex-1 w-full rounded-2xl border border-[#FDFAF7]/30 bg-[#3D2E35]/15 flex items-center justify-center">
                <div
                    ref={containerRef}
                    className="relative w-full h-full max-w-[360px] mx-auto rounded-xl overflow-hidden select-none"
                >
                    <img
                        src={beforeSrc}
                        className="absolute inset-0 w-full h-full object-cover object-[center_40%] pointer-events-none"
                        draggable={false}
                    />
                    <motion.img
                        src={afterSrc}
                        style={{ clipPath }}
                        className="absolute inset-0 w-full h-full object-cover object-[center_40%] pointer-events-none"
                        draggable={false}
                    />

                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FDFAF7]/80 text-[#3D2E35] text-[10px] pt-1 tracking-wide font-gmarket">BEFORE</span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FDFAF7]/80 text-[#3D2E35] text-[10px] pt-1 tracking-wide font-gmarket">AFTER</span>

                    <motion.div className="absolute top-0 bottom-0 w-px bg-[#FDFAF7]/80 pointer-events-none" style={{ left }} />
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: -HALF, right: width - HALF }}
                        dragElastic={0}
                        dragMomentum={false}
                        initial="rest"
                        animate="rest"
                        whileHover="active"
                        whileDrag="active"
                        variants={{ rest: { scale: 0.4 }, active: { scale: 1 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ x }}
                        className="absolute top-1/2 -mt-5 w-10 h-10 rounded-full bg-[#FDFAF7] shadow-md flex items-center justify-center text-[#3D2E35] cursor-ew-resize"
                    >
                        <motion.span variants={{ rest: { opacity: 0 }, active: { opacity: 1 } }} className="text-sm">↔</motion.span>
                    </motion.div>
                </div>
            </div>

            {/* 하단 텍스트 */}
            <div className="flex items-center justify-center text-xs font-light text-[#3D2E35]/50 font-gmarket">
                <span>↔ 드래그하여 비교</span>
            </div>
        </div>
    );
}
