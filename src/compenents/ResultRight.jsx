import HologramOverlay from "../components/HologramOverlay";

export default function ResultRight({personalColorData, userSkinTone}) {
   return (
       <>
           <div className="glass relative flex flex-col gap-4 items-center justify-center rounded-2xl border border-[#FDFAF7]/10 overflow-hidden p-10">
                <HologramOverlay />
                <div className="grid grid-cols-2 gap-20 w-full h-full relative">
                    <div className="h-full flex flex-col gap-2  justify-center">
                        <p className="text-[#3D2E35]/75 tracking-widest text-left pt-1 text-xs font-light font-gmarket">나의 피부톤</p>
                        <div className="flex justify-center items-center">
                            <div className="w-40 h-40 rounded-full border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                <div className="w-30 h-30 rounded-full" style={{ backgroundColor: userSkinTone}} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[0.1px] h-2/3 -translate-y-1/2 bg-[#3D2E35]/20" />
                    <div className="h-full">
                        <p className="text-[#3D2E35]/75 tracking-widest text-left pt-1 text-xs font-light font-gmarket">진단 정확도</p>
                        <div className="h-full justify-center flex items-center flex-col gap-2">
                            <p className="text-7xl font-bold text-[#3D2E35] font-rebecca">94%</p>
                            <p className="text-[#3D2E35] font-light text-center font-gmarket">AI 피부톤 분석 신뢰도 </p>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="flex flex-col gap-6 w-full">
                <hr className="border-[#3D2E35]/20 h-[0.1px]" />
                    <div className="flex flex-col justify-center gap-2 items-start px-2">
                        <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">어울리는 컬러</p>
                        
                        <div className="flex flex-row justify-between w-full items-center gap-2">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.bestColor[0][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.bestColor[0][0]}</p>
                            </div>    

                            <div className="w-px h-5 bg-[#3D2E35]/20" />

                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.bestColor[1][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.bestColor[1][0]}</p>
                            </div>    

                            <div className="w-px h-5 bg-[#3D2E35]/20" />
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.bestColor[2][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.bestColor[2][0]}</p>
                            </div>    
                            <div className="w-px h-5 bg-[#3D2E35]/20" />
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.bestColor[3][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.bestColor[3][0]}</p>
                            </div>    
                            <div className="w-px h-5 bg-[#3D2E35]/20" />
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.bestColor[4][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.bestColor[4][0]}</p>
                            </div>    


                        </div>
                    
                    </div>
                    
                    <hr className="border-[#3D2E35]/20 h-[0.1px]" />

                    <div className="flex flex-col justify-between w-full items-start gap-2">
                        <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">어울리지 않는 컬러</p>
                        
                        <div className="flex flex-row justify-between w-full items-center gap-2">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.worstColor[0][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.worstColor[0][0]}</p>
                            </div>    

                            <div className="w-px h-5 bg-[#3D2E35]/20" />

                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.worstColor[1][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.worstColor[1][0]}</p>
                            </div>    

                            <div className="w-px h-5 bg-[#3D2E35]/20" />
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.worstColor[2][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.worstColor[2][0]}</p>
                            </div>    
                            <div className="w-px h-5 bg-[#3D2E35]/20" />
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.worstColor[3][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.worstColor[3][0]}</p>
                            </div>    
                            <div className="w-px h-5 bg-[#3D2E35]/20" />
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-6 h-6 rounded-lg border border-[#FDFAF7]/10 glass flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: personalColorData.worstColor[4][1] }} />
                                </div>
                                <p className="text-[#3D2E35] text-sm font-gmarket">{personalColorData.worstColor[4][0]}</p>
                            </div>    


                        </div>
                    
                    </div>

                    
                </div>
            </div>
       </>
   )
}