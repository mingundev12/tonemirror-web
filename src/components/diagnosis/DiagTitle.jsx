import diagTitleConst from "../../data/diagnosis/diagTitleConst.json";

export default function DiagTitle({diagStatus}) {
   return (
       <>
            <div className="md:text-4xl text-2xl md:text-nowrap">
                <>
                    <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">{diagStatus === "upload" ? diagTitleConst.title[0] : diagStatus === "analysis" ? diagTitleConst.title[1] : diagTitleConst.title[2]}</p>
                    <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0 md:whitespace-normal whitespace-pre-wrap">{diagStatus === "upload" ? diagTitleConst.description[0] : diagStatus === "analysis" ? diagTitleConst.description[1] : diagTitleConst.description[2]}</p>
                </>
            </div>
       </>
   )
}