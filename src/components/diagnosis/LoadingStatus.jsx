import checkLight from "../../assets/img/check-light.svg";

import analysisStatus from "../../data/diagnosis/analysisStatus.json";

export default function LoadingStatus({progress}) {
    const THRESHOLDS = [23, 52, 76, 92];
   return (
       <>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-x-3 w-full max-w-120 mx-auto text-sm md:text-xs font-light text-[#3D2E35] font-gmarket px-2">
                {analysisStatus.map((item, i) => {
                    const done = progress >= THRESHOLDS[i];
                    return (
                        <div key={item.label} className="flex flex-row gap-2 items-center">
                            <div className={`w-6 h-6 rounded-full shrink-0 ${done ? "bg-[#3D2E35] relative" : "bg-[#3D2E35]/50"}`}>
                                {done && (
                                    <img src={checkLight} className="w-3.5 h-3.5 md:w-4 md:h-4 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
                                )}
                            </div>
                            <p className="pt-0.5 md:pt-1 whitespace-nowrap md:whitespace-normal">{item.label}</p>
                        </div>
                    );
                })}
            </div>
       </>
   )
}