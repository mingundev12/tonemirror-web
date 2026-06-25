import { Fragment } from "react";
import indicatorConst from "../../data/diagnosis/indicatorConst.json";

export default function Indicator({ diagStatus, isDiagStep }) {
   return (
       <>
            <div className={`md:scale-100 scale-90 flex flex-row gap-1.5 md:gap-2 justify-center items-center font-semibold font-roboto max-w-full ${isDiagStep ? "shrink-0 mb-4 md:mb-0" : ""}`}>

                {indicatorConst.map((item, i) => (
                    <Fragment key={item.label}>
                        <div className="relative">
                            <p className={`${i=== 0 && diagStatus === "ready" || i=== 1 && diagStatus === "upload" || i=== 2 && diagStatus === "analysis" ? "bg-[#3D2E35] text-[#FDFAF7]" : "text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>{item.label}</p>
                            <p className={`${i=== 0 && diagStatus === "ready" || i=== 1 && diagStatus === "upload" || i=== 2 && diagStatus === "analysis" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>{item.text}</p>
                        </div>
                        {i < 2 && (<hr className="border-[#3D2E35]/50 w-14 md:w-28" />)}
                    </Fragment>
                ))}    

            </div>
       </>
   )
}