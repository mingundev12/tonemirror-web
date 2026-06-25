import resultRightConst from "../../data/result/resultRightConst.json";
import diagAccuracyConst from "../../data/diagnosis/diagAccuracyConst.json";

import HologramOverlay from "../common/HologramOverlay";
import { Fragment } from "react";

export default function ResultRight({personalColorData, userSkinTone}) {
    
   return (
       <>
           <div className="glass relative flex flex-col gap-4 items-center justify-center rounded-2xl border border-[#FDFAF7]/10 overflow-hidden p-10">
                <HologramOverlay />

                {/* 우측 상단 콘텐츠*/}
                <div className="grid grid-cols-2 md:gap-20 gap-10 w-full h-full relative">

                    {/* 내 피부 톤 */}
                    <div className="h-full flex flex-col gap-2  justify-center">
                        <p className="text-[#3D2E35]/75 tracking-widest text-left pt-1 text-xs font-light font-gmarket">{resultRightConst.mySkinTone}</p>
                        <div className="flex justify-center items-center">
                            <div className="md:w-36 w-24 h-24 md:h-36 aspect-square rounded-full border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                <div className="md:w-30 w-20 h-20 md:h-30 rounded-full" style={{ backgroundColor: userSkinTone}} />
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px md:w-[0.1px] h-full -translate-y-1/2 bg-[#3D2E35]/20" />
                    
                    {/* 진단 정확도 */}
                    <div className="h-full">
                        <p className="text-[#3D2E35]/75 tracking-widest text-left pt-1 text-xs font-light font-gmarket">{resultRightConst.diagnosisAccuracy}</p>
                        <div className="h-full justify-center flex items-center flex-col gap-2">
                            <p className="md:text-7xl text-4xl font-bold text-[#3D2E35] font-rebecca">{diagAccuracyConst}%</p>
                            <p className="text-[#3D2E35] font-light md:text-base text-sm text-center font-gmarket md:whitespace-normal whitespace-pre-wrap">{resultRightConst.subtitle}</p>
                        </div>
                    </div> 

                </div>

                <div className="flex flex-col gap-6 w-full">

                    <hr className="border-[#3D2E35]/20 h-[0.1px]" />

                    <div className="flex flex-col justify-center gap-2 items-start px-2">

                        {/* 어울리는 컬러 */}
                        <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">{resultRightConst.suitableColor}</p>
                        
                        <div className="md:flex md:flex-row grid grid-cols-2 justify-between w-full items-center gap-2">
                            {personalColorData.bestColor.map((item, i) => (
                                <Fragment key={item.name}>
                                    <div className="flex flex-row gap-2 items-center">
                                        <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                        </div>
                                        <p className="text-[#3D2E35] text-sm font-gmarket">{item.name}</p>
                                    </div>
                                    {i < 4 && (<div className="w-px self-stretch bg-[#3D2E35]/20 md:block hidden" />)}
                                </Fragment>
                            ))}
                        </div>
                    
                    </div>
                    
                    <hr className="border-[#3D2E35]/20 h-[0.1px]" />
                    

                    <div className="flex flex-col justify-between w-full items-start gap-2 px-2">

                        {/* 어울리지 않는 컬러 */}
                        <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">{resultRightConst.unsuitableColor}</p>
                        
                        <div className="md:flex md:flex-row grid grid-cols-2 justify-between w-full items-center gap-2">
                            {personalColorData.worstColor.map((item, i) => (
                                <Fragment key={item.name}>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                    </div>
                                    <p className="text-[#3D2E35] text-sm font-gmarket">{item.name}</p>
                                </div>
                                {i < 4 && (<div className="w-px self-stretch bg-[#3D2E35]/20 md:block hidden" />)}
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    
                </div>
            </div>
       </>
   )
}