import { forwardRef } from "react";

import resultLeftConst from "../../data/result/resultLeftConst.json";
import resultRightConst from "../../data/result/resultRightConst.json";
import resultTipConst from "../../data/result/resultTipConst.json";
import diagAccuracyConst from "../../data/diagnosis/diagAccuracyConst.json";

import logoSymbol from "../../assets/logo/Logo1.svg";
import logoText from "../../assets/logo/Logo2.svg";
import chartRadarFilled from "../../assets/img/chart-radar-filled.svg";
import lightbulbFilamentLight from "../../assets/img/lightbulb-filament-light.svg";
import warningLight from "../../assets/img/warning-light.svg";

const ResultShare = forwardRef(function ResultShare({ personalColorData, userSkinTone }, ref) {
    return (
        <>
            <div
                ref={ref}
                className="w-[800px] flex flex-col gap-6 p-8 bg-[#FDFAF7] border border-[#3D2E35]/10 rounded-2xl overflow-hidden"
            >
                {/* 로고 */}
                <div className="flex flex-row items-center gap-2 justify-center">
                    <img src={logoSymbol} className="w-6"/>
                    <img src={logoText} className="h-5" />
                </div>

                {/* 퍼스널 컬러 진단 결과 */}
                <div className="flex flex-row items-center gap-2">
                    <img src={chartRadarFilled} className="w-6 h-6 opacity-50" alt="" />
                    <p className="text-[#3D2E35]/50 pt-1 font-light font-gmarket">{resultLeftConst.title}</p>
                </div>

                <div className="flex flex-row items-stretch shrink-0 w-[736px] gap-5">
                    <div className="shrink-0 w-[292.5px] rounded-3xl p-8 border border-[#3D2E35]/10 bg-[#FDFAF7] flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-3xl tracking-wider font-bold text-[#3D2E35] leading-tight font-rebecca">{personalColorData.eng}</p>
                            <p className="text-sm text-[#3D2E35] font-gmarket">{personalColorData.name}</p>
                            <p className="text-sm text-[#3D2E35] font-light font-gmarket leading-snug">{personalColorData.description}</p>
                        </div>

                        <hr className="border-[#3D2E35]/20" />

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-1 items-center">
                                    <img src={lightbulbFilamentLight} className="w-5 h-5 shrink-0" alt="" />
                                    <p className="text-sm text-[#3D2E35]/75 font-gmarket pt-1">{resultTipConst.bestTip}</p>
                                </div>
                                <p className="text-sm text-[#3D2E35]/75 font-light font-gmarket leading-snug">{personalColorData.bestTip}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-1 items-center">
                                    <img src={warningLight} className="w-5 h-5 shrink-0" alt="" />
                                    <p className="text-sm text-[#3D2E35]/75 font-gmarket pt-1">{resultTipConst.worstTip}</p>
                                </div>
                                <p className="text-sm text-[#3D2E35]/75 font-light font-gmarket leading-snug">{personalColorData.worstTip}</p>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 w-[423.5px] rounded-3xl p-8 border border-[#3D2E35]/10 bg-[#FDFAF7] flex flex-col gap-6">
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-col gap-2 flex-1">
                                <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">{resultRightConst.mySkinTone}</p>
                                <div className="flex justify-center">
                                    <div className="w-24 h-24 rounded-full border border-[#3D2E35]/10 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full" style={{ backgroundColor: userSkinTone }} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-px self-stretch bg-[#3D2E35]/20" />
                            <div className="flex flex-col gap-2 flex-1">
                                <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">{resultRightConst.diagnosisAccuracy}</p>
                                <div className="flex flex-col items-center justify-center gap-1 flex-1">
                                    <p className="text-5xl font-bold text-[#3D2E35] font-rebecca">{diagAccuracyConst}%</p>
                                    <p className="text-xs text-[#3D2E35] font-light text-center font-gmarket leading-snug">{resultRightConst.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-[#3D2E35]/20" />

                        <div className="flex flex-col gap-2">
                            <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">{resultRightConst.suitableColor}</p>
                            <div className="grid grid-cols-3 gap-3">
                                {personalColorData.bestColor.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center gap-1.5 text-center">
                                        <div className="w-6 h-6 rounded-lg border border-[#3D2E35]/10 flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                        </div>
                                        <p className="text-[#3D2E35] text-xs font-gmarket leading-snug">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[#3D2E35]/75 text-xs font-light font-gmarket">{resultRightConst.unsuitableColor}</p>
                            <div className="grid grid-cols-3 gap-3">
                                {personalColorData.worstColor.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center gap-1.5 text-center">
                                        <div className="w-6 h-6 rounded-lg border border-[#3D2E35]/10 flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                        </div>
                                        <p className="text-[#3D2E35] text-xs font-gmarket leading-snug">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default ResultShare;
