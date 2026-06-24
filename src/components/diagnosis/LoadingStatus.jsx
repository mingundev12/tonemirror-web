import checkLight from "../../assets/img/check-light.svg";

import analysisStatus from "../../data/diagnosis/analysisStatus.json";

export default function LoadingStatus({ progress, mobile = false }) {
    const THRESHOLDS = [23, 52, 76, 92];

    const items = analysisStatus.map((item, i) => {
        const done = progress >= THRESHOLDS[i];
        return (
            <div key={item.label} className="flex flex-row gap-2 items-center">
                <div className={`w-6 h-6 rounded-full shrink-0 ${done ? "bg-[#3D2E35] relative" : "bg-[#3D2E35]/50"}`}>
                    {done && (
                        <img
                            src={checkLight}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${mobile ? "w-3.5 h-3.5" : "w-4 h-4"}`}
                            alt=""
                        />
                    )}
                </div>
                <p className={`whitespace-nowrap font-light text-[#3D2E35] font-gmarket ${mobile ? "pt-0.5 text-sm" : "pt-1 text-xs"}`}>
                    {item.label}
                </p>
            </div>
        );
    });

    if (mobile) {
        return (
            <div className="grid grid-cols-2 gap-3 w-full max-w-120 mx-auto px-2">
                {items}
            </div>
        );
    }

    return (
        <div className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-3 w-full max-w-120 mx-auto px-2">
            {items}
        </div>
    );
}
