import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

import Foundation from "./Foundation";
import HalfMakeup from "./HalfMakeup";
import PersonalColor from "./PersonalColor";
import BlobGradient from "../common/BlobGradient";
import HologramOverlay from "../common/HologramOverlay";

import { useT } from "../../locales";

const defaultRotations = [-8, 0, 8]

export default function SectionOne() {
    const t = useT();

    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [spread, setSpread] = useState(false)
    const [spreadDone, setSpreadDone] = useState(false)
    const [cardW, setCardW] = useState(0)
    const [isMd, setIsMd] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true
    )
    const sectionRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)")
        const handler = (e) => setIsMd(e.matches)
        mq.addEventListener("change", handler)
        return () => mq.removeEventListener("change", handler)
    }, [])

    useEffect(() => {
        if (!isMd) return
        const measure = () => {
            if (containerRef.current) {
                const navW = document.documentElement.clientWidth * 0.8
                const gap = 24
                setCardW((navW - gap * 2) / 3)
            }
        }
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [isMd])

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
        { visual: <PersonalColor motion={motion} />, title: t.sectionOneConst[0], desc: <> {t.sectionOneConst[1][0]}<br /> {t.sectionOneConst[1][1]}</> },
        { visual: <Foundation motion={motion} />, title: t.sectionOneConst[2], desc: <> {t.sectionOneConst[3][0]}<br /> {t.sectionOneConst[3][1]}</> },
        { visual: <HalfMakeup />, title: t.sectionOneConst[4], desc: <> {t.sectionOneConst[5][0]}<br /> {t.sectionOneConst[5][1]}</> },
    ]

    const gap = 24
    const totalW = cardW * 3 + gap * 2
    const startX = -totalW / 2 + cardW / 2

    return (
        <div ref={sectionRef} className="relative w-full min-h-[100dvh] h-auto md:h-screen overflow-hidden bg-[#FDFAF7]">
            <div className="absolute w-full h-full bg-gradient-to-b from-[#FDFAF7] from-50% to-transparent to-90% z-1 pointer-events-none" />
            <div className="absolute inset-0 opacity-30 z-0">
                <BlobGradient/>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-5 md:gap-12 justify-center w-full min-h-[100dvh] md:h-full px-[10%] md:px-0 py-10 md:py-20 font-gmarket">

                <p className="text-[#3D2E35] md:text-5xl text-4xl text-center tracking-wider leading-tight font-rebecca">
                    {t.sectionOneConst[6][0]} <br /> {t.sectionOneConst[6][1]}
                </p>

                {/* 카드 */}
                {isMd ? (
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
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        {cards.map((card, i) => (
                            <motion.div
                                key={i}
                                className="glass flex w-full aspect-square flex-col rounded-2xl border border-[#FDFAF7]/20 overflow-hidden shrink-0"
                                initial={{ opacity: 0, y: 24 }}
                                animate={spread ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: spread ? i * 0.1 : 0,
                                }}
                            >
                                <HologramOverlay />

                                <div className="relative flex-1 flex items-center justify-center">
                                    {card.visual}
                                </div>

                                <div className="flex flex-col items-center gap-1 pb-5 shrink-0">
                                    <p className="text-[#3D2E35] text-base">{card.title}</p>
                                    <p className="text-[#3D2E35]/75 text-center font-light text-xs leading-snug">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}