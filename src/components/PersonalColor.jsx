import { useState } from "react"
import ColorWheel from "./ColorWheel"

export default function PersonalColor() {

    const colors = [
        { hex: "#7C0A1A", tone: "Warm" },
        { hex: "#FF8E7A", tone: "Warm" },
        { hex: "#E2725B", tone: "Warm" },
        { hex: "#FF4500", tone: "Cool" },
        { hex: "#FFD1BA", tone: "Warm" },
        { hex: "#3D2314", tone: "Warm" },
        { hex: "#C19A6B", tone: "Cool" },
        { hex: "#E6D7C3", tone: "Warm" },
        { hex: "#FFA500", tone: "Cool" },
        { hex: "#F5D061", tone: "Warm" },
        { hex: "#E1AD01", tone: "Cool" },
        { hex: "#FFF4A3", tone: "Warm" },
        { hex: "#F5F5DC", tone: "Cool" },
        { hex: "#4B5320", tone: "Cool" },
        { hex: "#6B8E23", tone: "Warm" },
        { hex: "#8A9A86", tone: "Cool" },
        { hex: "#BACBB6", tone: "Cool" },
        { hex: "#50C878", tone: "Cool" },
        { hex: "#B2EBF2", tone: "Warm" },
        { hex: "#87CEEB", tone: "Cool" },
        { hex: "#4169E1", tone: "Warm" },
        { hex: "#E6E6FA", tone: "Cool" },
        { hex: "#000080", tone: "Warm" },
        { hex: "#E0B0FF", tone: "Cool" },
        { hex: "#FF00FF", tone: "Cool" },
        { hex: "#FF6EC7", tone: "Warm" },
        { hex: "#FF007F", tone: "Warm" },
        { hex: "#800020", tone: "Cool" },
        { hex: "#FFD1DC", tone: "Cool" },
        { hex: "#FFC0CB", tone: "Cool" },
        { hex: "#000000", tone: "Cool" },
        { hex: "#464646", tone: "Warm" },
        { hex: "#FFFFFF", tone: "Warm" },
    ]

    const [selectedId, setSelectedId] = useState(0)
    const active = colors[selectedId]

    return (
        <div className="flex flex-row items-center justify-center p-6 gap-4 w-full h-full" onClick={(e) => e.stopPropagation()}>
            <ColorWheel onSelect={setSelectedId} autoRotate />

            <div className="flex flex-col gap-3 items-start justify-center w-[120px]">
                <p className="text-sm text-[#3D2E35]/50 font-gmarket">
                    {active.tone} Tone
                </p>
                <div className="flex flex-row gap-2 items-center">
                    <div className="glass w-7 h-7 rounded-lg border border-[#FDFAF7]/10 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: active.hex }} />
                    </div>
                    <p className="text-xs font-light text-[#3D2E35]/50 w-[72px] font-gmarket">
                        {active.hex.toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    )
}
