import { useState } from "react"

import ColorWheel from "./ColorWheel"

import colorWheelColor from "../../data/home/colorWheelColor.json"

export default function PersonalColor() {

    const [selectedId, setSelectedId] = useState(0)
    const active = colorWheelColor[selectedId]

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
