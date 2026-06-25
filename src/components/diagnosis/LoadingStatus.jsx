import checkLight from "../../assets/img/check-light.svg";

import analysisStatusConst from "../../data/diagnosis/analysisStatusConst.json";

export default function LoadingStatus({ progress, mobile = false }) {
    const THRESHOLDS = [23, 52, 76, 92];

    return (
        <div className={mobile ? "grid grid-cols-2 gap-x-4 gap-y-3 mt-6 w-full" : "flex flex-row flex-nowrap justify-center gap-x-2  lg:gap-x-3 w-full mx-auto px-2"}>
            {analysisStatusConst.labels.map((item, i) => (
                <div key={item} className="flex flex-row gap-2 items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full shrink-0 ${progress >= THRESHOLDS[i] ? "bg-[#3D2E35] relative" : "bg-[#3D2E35]/50"}`}>
                        {progress >= THRESHOLDS[i] && (
                            <img
                                src={checkLight}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${mobile ? "w-3.5 h-3.5" : "w-4 h-4"}`}
                                alt=""
                            />
                        )}
                    </div>
                    <p className={`font-light text-[#3D2E35] font-gmarket ${mobile ? "pt-0.5 text-sm" : "pt-1 text-xs whitespace-nowrap"}`}>
                        {item}
                    </p>
                </div>
            ))}
        </div>
    );
}
