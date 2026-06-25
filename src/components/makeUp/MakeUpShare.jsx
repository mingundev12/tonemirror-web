import { forwardRef } from "react";

import logoSymbol from "../../assets/logo/Logo1.svg";
import logoText from "../../assets/logo/Logo2.svg";
import afterSrc from "../../assets/modelHead2.png";
import scanSmileyLight from "../../assets/img/scan-smiley-light.svg";

import makeUpTitleConst from "../../data/makeup/makeUpTitleConst.json";
import productCardConst from "../../data/makeup/productCardConst.json";

const MakeUpShare = forwardRef(function MakeUpShare({ products, userToneStatus }, ref) {
    return (
        <>
            <div
                ref={ref}
                className="w-[800px] flex flex-col gap-6 p-8 bg-[#FDFAF7] border border-[#3D2E35]/10 rounded-2xl overflow-hidden"
            >
                {/* 로고 */}
                <div className="flex flex-row items-center gap-2 justify-center">
                    <img src={logoSymbol} className="w-6" alt="" />
                    <img src={logoText} className="h-5" alt="" />
                </div>

                {/* 가상 메이크업 타이틀 */}
                <div className="flex flex-row items-center gap-2">
                    <img src={scanSmileyLight} className="w-6 h-6 opacity-50" alt="" />
                    <p className="text-[#3D2E35]/50 pt-1 font-light font-gmarket">{makeUpTitleConst.title}</p>
                </div>

                <div className="flex flex-row items-stretch shrink-0 w-[736px] h-[520px] gap-5">
                    {/* 가상 메이크업 */}
                    <div className="shrink-0 w-[292.5px] h-[520px] rounded-3xl p-8 border border-[#3D2E35]/10 bg-[#FDFAF7] flex flex-col gap-5 overflow-hidden">
                        <div>
                            <p className="text-lg text-[#3D2E35] font-gmarket">{makeUpTitleConst.title}</p>
                        </div>

                        <div className="flex-1 min-h-0 w-full rounded-2xl border border-[#3D2E35]/10 bg-[#3D2E35]/15 flex items-center justify-center">
                            <div className="w-full h-full rounded-xl overflow-hidden">
                                <img src={afterSrc} className="w-full h-full object-cover object-[center_40%]"/>
                            </div>
                        </div>
                    </div>

                    {/* 파운데이션 제품 추천 */}
                    <div className="shrink-0 w-[423.5px] h-[520px] rounded-3xl p-8 border border-[#3D2E35]/10 bg-[#FDFAF7] flex flex-col gap-4 overflow-hidden">
                        {/* 타이틀 */}
                        <div className="shrink-0">
                            <p className="text-lg text-[#3D2E35] font-gmarket">{productCardConst.title}</p>
                            <p className="text-sm font-light text-[#3D2E35]/60 font-gmarket">
                                {userToneStatus}{productCardConst.subtitle}
                            </p>
                        </div>

                        {/* 파운데이션 제품 목록 */}
                        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0 w-full">
                            {products.map((item) => (
                                <div
                                    key={`${item.brand}-${item.shade}-${item.shadeName}`}
                                    className="flex flex-col gap-2 rounded-2xl border border-[#3D2E35]/10 bg-[#FDFAF7] p-2"
                                >
                                    <div
                                        className="w-full aspect-square rounded-xl shrink-0"
                                        style={{ background: item.swatch }}
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-[9px] tracking-wide text-[#3D2E35]/50 font-gmarket leading-snug">
                                            {item.brandName}
                                        </p>
                                        <p className="text-[10px] text-[#3D2E35] font-gmarket leading-tight">
                                            {item.name[0]} {item.name[1]}
                                        </p>
                                        <span className="font-light text-[#3D2E35]/50 text-[8px] font-gmarket leading-tight">
                                            {item.shadeName} / {item.shade}{productCardConst.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default MakeUpShare;
