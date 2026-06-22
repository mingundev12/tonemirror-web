import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Foundation from "./Foundation";
import HalfMakeup from "./HalfMakeup";
import PersonalColor from "./PersonalColor";
import BlobGradient from "./BlobGradient";
import HologramOverlay from "./HologramOverlay";

const defaultRotations = [-8, 0, 8]

export default function SectionOne() {

    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [spread, setSpread] = useState(false)
    const [spreadDone, setSpreadDone] = useState(false)
    const [cardW, setCardW] = useState(0)
    const sectionRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const measure = () => {
    if (containerRef.current) {
        const navW = document.documentElement.clientWidth * 0.8  // NavBar와 동일 기준
        const gap = 24
        setCardW((navW - gap * 2) / 3)  // 3장 + gap 2개가 navW에 딱 맞게
    }
}
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setSpread(true), 300)
                } else {
                    setSpread(false)
                    setSpreadDone(false)
                }
            },
            { threshold: 0.5 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const cards = [
        { visual: <PersonalColor motion={motion} />, title: "01. 퍼스널 컬러 진단", desc: <>AI가 피부톤을 분석해 <br /> 사계절 톤으로 분류</> },
        { visual: <Foundation motion={motion} />, title: "02. 파운데이션 추천", desc: <>진단 결과 기반 <br /> 파운데이션 제품 추천</> },
        { visual: <HalfMakeup />, title: "03. Half Makeup 비교", desc: <>메이크업 전후를 <br /> 한 화면에서 비교</> },
    ]

    const gap = 24
    const totalW = cardW * 3 + gap * 2
    const startX = -totalW / 2 + cardW / 2

    return (
        <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#FDFAF7]">
            <div className="absolute w-full h-full bg-gradient-to-b from-[#FDFAF7] from-50% to-transparent to-10% md:to-90% z-1 pointer-events-none" />
            <div className="absolute inset-0 opacity-30 z-0">
                <BlobGradient/>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-12 justify-center w-full h-full py-20 font-gmarket">

                <p className="text-[#3D2E35] md:text-5xl text-2xl text-center tracking-wider leading-tight font-rebecca">
                    Your Color, <br /> 세 가지 시선으로
                </p>

                <div ref={containerRef} className="relative w-full h-[min(55vh,400px)]">
                    {cardW > 0 && cards.map((card, i) => (
                        <motion.div
                            key={i}
                            className="glass absolute flex flex-col rounded-2xl border border-[#FDFAF7]/20 overflow-hidden cursor-pointer"
                            style={{
                                width: cardW,
                                height: "min(55vh, 400px)",
                                transformOrigin: "bottom center",
                                top: "50%",
                                left: "50vw",
                                marginLeft: -(cardW / 2),
                                marginTop: "calc(min(55vh, 400px) / -2)",
                                zIndex: spreadDone ? (hoveredIndex === i ? 10 : 3 - i) : 3 - i,
                            }}
                            animate={{
                                x: !spread ? 0 : startX + i * (cardW + gap),
                                rotate: !spread
                                    ? defaultRotations[i] * 0.4
                                    : (hoveredIndex === i ? 0 : defaultRotations[i]),
                                y: !spread
                                    ? 0
                                    : (hoveredIndex === i ? (i === 1 ? -12 : 0) : (i === 1 ? 0 : 40)),
                            }}
                            transition={{
                                duration: 2,
                                ease: [0.16, 1, 0.3, 1],
                                delay: spread ? i * 0.12 : 0
                            }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onAnimationComplete={() => { if (i === 2 && spread) setSpreadDone(true) }}
                        >
                            <HologramOverlay />

                            <div className="relative flex-1 flex items-center justify-center">
                                {card.visual}
                            </div>

                            <div className="flex flex-col items-center gap-1 pb-8">
                                <p className="text-[#3D2E35] text-lg">{card.title}</p>
                                <p className="text-[#3D2E35]/75 text-center font-light text-sm">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}