import chartRadarFilled from "../assets/img/chart-radar-filled.svg"
import lightbulbFilamentLight from "../assets/img/lightbulb-filament-light.svg";
import warningLight from "../assets/img/warning-light.svg";
import ResultLeftBtn from "./ResultLeftBtn";

export default function ResultLeft({personalColorData}) {
   return (
       <>
           <div className="flex flex-col gap-10 w-full md:p-10 p-0">
                <div className="flex-row items-center gap-2 flex">
                    <img src={chartRadarFilled} className="w-6 h-6 opacity-50" />
                    <p className="text-[#3D2E35]/50 pt-1 font-light font-gmarket">퍼스널 컬러 진단 결과</p>
                </div>
                
                
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10 relative items-center">
                    
                    <div>
                        <div className="flex flex-col gap-6">                    
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl tracking-wider font-bold text-[#3D2E35] leading-tight font-rebecca">{personalColorData.eng}</p>
                                <p className="text-md text-[#3D2E35] font-gmarket">{personalColorData.kor}</p>
                            </div>
                            <p className="text-md text-[#3D2E35] font-light font-gmarket">{personalColorData.description}</p>
                        </div>
                    </div>

                    <div className="md:block hidden absolute top-0 left-1/2 -translate-x-1/2 w-[0.1px] h-full bg-[#3D2E35]/25" />
                    <hr className="border-[#3D2E35]/25 md:hidden block" />

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-1 items-center">
                                <img src={lightbulbFilamentLight} className="w-5 h-5" />
                                <p className="text-md text-[#3D2E35]/75 font-gmarket pt-1">BEST TIP</p>
                            </div>
                            
                            <p className="text-sm text-[#3D2E35]/75 font-light font-gmarket">{personalColorData.bestTip}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-1 items-center">
                                <img src={warningLight} className="w-5 h-5" />
                                <p className="text-md text-[#3D2E35]/75 font-gmarket pt-1">WORST TIP</p>
                            </div>
                            <p className="text-sm text-[#3D2E35]/75 font-light font-gmarket">{personalColorData.worstTip}</p>
                        </div>
                    </div>
                </div>
                <div className="md:block hidden">
                    <ResultLeftBtn />
                </div>
                
            </div>
       </>
   )
}