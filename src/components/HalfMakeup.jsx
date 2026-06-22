import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useTransform } from "motion/react";
import beforeSrc from "../assets/modelHead1.png";
import afterSrc from "../assets/modelHead2.png";

const HANDLE = 40;
const HALF = HANDLE / 2;

export default function HalfMakeup() {
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
        <div
            className="w-full h-full flex items-center justify-center px-8 py-6"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative w-full h-full rounded-xl border border-[#FDFAF7]/30 bg-[#3D2E35]/20 flex items-center justify-center">
                <div
                    ref={containerRef}
                    className="relative w-full h-full rounded-lg overflow-hidden select-none"
                >
                    <img
                        src={beforeSrc}
                        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
                        draggable={false}
                    />
                    <motion.img
                        src={afterSrc}
                        style={{ clipPath }}
                        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
                        draggable={false}
                    />

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FDFAF7]/80 text-[#3D2E35] text-[10px] pt-1 tracking-wide font-gmarket">BEFORE</span>
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#FDFAF7]/80 text-[#3D2E35] text-[10px] pt-1 tracking-wide font-gmarket">AFTER</span>

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
        </div>
    );
}
