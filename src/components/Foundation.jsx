import { useState } from "react"

const coolFoundationColors = [
    "#FDF3EE", "#FCEEE7", "#FAE9DF", "#F9E4D8", "#F7DFD1",
    "#F6DAC9", "#F5D5C2", "#F3D0BA", "#F2CBB3", "#F1C6AB",
    "#EFC1A4", "#EEBD9D",
]

const warmFoundationColors = [
    "#FDDFC3", "#FDD2B9", "#FBD5AE", "#F7CFAC", "#F5CAA5",
    "#F2C59E", "#EFC097", "#ECBB91", "#E8B68B", "#E4B185",
    "#E0AC7F", "#D9A87B",
]

export function FoundationRow({ label, colors, motion }) {
    const [hoveredId, setHoveredId] = useState(null)

    const getY = (i) => {
        if (hoveredId === null) return 0
        if (i === hoveredId) return -40
        if (i === hoveredId - 1 || i === hoveredId + 1) return -20
        return 0
    }

    const last = Math.max(colors.length - 1, 1)

    return (
        <div className="relative w-full h-full flex flex-col">
            <p className="text-[#3D2E35]/50 text-sm font-gmarket">{label}</p>
            <div className="relative w-full h-20 overflow-hidden">
                {colors.map((color, i) => (
                    <motion.div
                        key={color}
                        animate={{ y: getY(i) }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        onMouseEnter={() => setHoveredId(i)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            backgroundColor: color,
                            zIndex: i,
                            left: `${(i / last) * 65}%`,
                            width: "35%",
                        }}
                        className="absolute -translate-x-0 -translate-y-1/2 top-20 rounded-t-2xl inset-0 w-20 h-20 object-cover"
                    />
                ))}
            </div>
        </div>
    )
}

export default function Foundation({ motion }) {
    return (
        <div className="grid grid-rows-2 h-full w-full place-items-center px-10 py-8 gap-4">
            <FoundationRow label="Cool Foundation" colors={coolFoundationColors} motion={motion} />
            <FoundationRow label="Warm Foundation" colors={warmFoundationColors} motion={motion} />
        </div>
    )
}
