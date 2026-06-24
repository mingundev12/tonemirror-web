import { useT } from "../../locales";

export default function DiagTitle({diagStatus}) {
    const t = useT();

   return (
       <>
           <div className="md:text-4xl text-2xl md:text-nowrap">
                {diagStatus === "upload" ? (
                    <>
                        <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">{t.diagTitleConst[0]}</p>
                        <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">{t.diagTitleConst[1][0]} <br className="md:hidden block"/> {t.diagTitleConst[1][1]}</p>
                    </>)
                : diagStatus === "analysis" ? (
                    <>
                        <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">{t.diagTitleConst[2]}</p>
                        <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">{t.diagTitleConst[3][0]} <br className="md:hidden block"/> {t.diagTitleConst[3][1]}</p>
                    </>)
                : diagStatus === "ready" ? (
                    <>
                        <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">{t.diagTitleConst[4]}</p>
                        <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">{t.diagTitleConst[5][0]} <br className="md:hidden block"/> {t.diagTitleConst[5][1]}</p>
                    </>)
                : ""}
            </div>
       </>
   )
}