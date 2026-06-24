import { useT } from "../../locales";

export default function Indicator({ diagStatus, isDiagStep }) {
    const t = useT();

   return (
       <>
            <div className={`md:scale-100 scale-90 flex flex-row gap-1.5 md:gap-2 justify-center items-center font-semibold font-roboto max-w-full ${isDiagStep ? "shrink-0 mb-4 md:mb-0" : ""}`}>
                        
                <div className="relative">
                    <p className={`${diagStatus === "ready" ? " bg-[#3D2E35] text-[#FDFAF7]" : "/50 text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>01</p>
                    <p className={`${diagStatus === "ready" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>{t.indicatorConst[0]}</p>
                </div>

                <hr className="border-[#3D2E35]/50 w-14 md:w-28" />
                
                <div className="relative">
                    <p className={`${diagStatus === "upload" ? " bg-[#3D2E35] text-[#FDFAF7]" : "/50 text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>02</p>
                    <p className={`${diagStatus === "upload" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>{t.indicatorConst[1]}</p>
                </div>

                <hr className="border-[#3D2E35]/50 w-14 md:w-28" />

                <div className="relative">
                    <p className={`${diagStatus === "analysis" ? " bg-[#3D2E35] text-[#FDFAF7]" : "/50 text-[#3D2E35]/50"} w-8 aspect-square rounded-full text-center pt-[3px]`}>03</p>
                    <p className={`${diagStatus === "analysis" ? "text-[#3D2E35]" : "text-[#3D2E35]/50"} font-medium absolute left-1/2 -translate-x-1/2 w-max pt-2 text-center text-sm font-gmarket`}>{t.indicatorConst[2]}</p>
                </div>

            </div>
       </>
   )
}