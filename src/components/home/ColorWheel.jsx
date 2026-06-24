import { useState, useEffect, useRef } from "react"
import { animate, useMotionValue } from "motion/react"

import arrowfilled from "../../assets/img/arrow-circle-down-filled.svg"

import colorWheelColor from "../../data/home/colorWheelColor.json"

export default function ColorWheel({ onSelect, autoRotate = false }) {

    const [selectedId, setSelectedId] = useState(0)
    const [hoveredPathId, setHoveredPathId] = useState(null)
    const rotation = useMotionValue(0)
    const gRef = useRef(null)

    

    const total = colorWheelColor.length
    const cx = 150
    const cy = 150
    const outerR = 120
    const innerR = 50

    useEffect(() => {
        const anglePerSlice = 360 / total
        const unsubscribe = rotation.on("change", (val) => {
            if (gRef.current) {
                gRef.current.setAttribute("transform", `rotate(${val}, 150, 150)`)
            }
            const normalized = ((val % 360) + 360) % 360
            const pointerAngle = (360 - normalized) % 360
            const activeIndex = Math.floor(pointerAngle / anglePerSlice) % total
            onSelect?.(activeIndex)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (!autoRotate) return
        let cancelled = false
        const startRotation = async () => {
            while (!cancelled) {
                await animate(rotation, rotation.get() + 360, {
                    duration: 20,
                    ease: "linear",
                })
            }
        }
        startRotation()
        return () => { cancelled = true }
    }, [autoRotate])

    const handleClick = (i) => {
        const anglePerSlice = 360 / total
        const currentRot = rotation.get()
        const normalized = ((currentRot % 360) + 360) % 360
        const diff = (360 - i * anglePerSlice - normalized + 360) % 360

        animate(rotation, currentRot + diff, {
            duration: 0.8,
            ease: "easeInOut",
            onComplete: () => {
                setSelectedId(i)
                if (autoRotate) {
                    let cancelled = false
                    const continueRotation = async () => {
                        while (!cancelled) {
                            await animate(rotation, rotation.get() + 360, {
                                duration: 20,
                                ease: "linear",
                            })
                        }
                    }
                    continueRotation()
                }
            }
        })
    }

    const getPath = (i, expand = 0) => {
        const angleStep = (2 * Math.PI) / total
        const startAngle = i * angleStep - Math.PI / 2
        const endAngle = startAngle + angleStep + 0.01
        const r = outerR + expand

        const x1 = cx + Math.cos(startAngle) * r
        const y1 = cy + Math.sin(startAngle) * r
        const x2 = cx + Math.cos(endAngle) * r
        const y2 = cy + Math.sin(endAngle) * r
        const x3 = cx + Math.cos(endAngle) * innerR
        const y3 = cy + Math.sin(endAngle) * innerR
        const x4 = cx + Math.cos(startAngle) * innerR
        const y4 = cy + Math.sin(startAngle) * innerR

        return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`
    }

    const getExpand = (i) => {
        if (hoveredPathId === null) return 0
        if (i === hoveredPathId) return 20
        if (i === (hoveredPathId - 1 + total) % total || i === (hoveredPathId + 1) % total) return 10
        return 0
    }

    return (
        <div className="relative" style={{ width: 220, height: 220 }} onClick={(e) => e.stopPropagation()}>
            <svg width="220" height="220" viewBox="-20 -20 340 340" style={{ overflow: "visible" }}>
                <g ref={gRef}>
                    {colorWheelColor.map((color, i) => (
                        <path
                            key={i}
                            d={getPath(i, getExpand(i))}
                            fill={color.hex}
                            style={{ cursor: "pointer", transition: "d 0.15s ease-in-out" }}
                            onMouseEnter={() => setHoveredPathId(i)}
                            onMouseLeave={() => setHoveredPathId(null)}
                            onClick={() => handleClick(i)}
                        />
                    ))}
                </g>
            </svg>
            <img
                src={arrowfilled}
                className="absolute w-8 h-8"
                style={{ cursor: "pointer", top: "10px", left: "94px" }}
            />
        </div>
    )
}