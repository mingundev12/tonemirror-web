import { useState } from "react";
import { motion } from "motion/react";

import productCardConst from "../../data/makeup/productCardConst.json";

export default function ProductCard({  userToneStatus, products, onSelect, isRecoloring }) {

    const [selectProduct, setSelectProduct] = useState(products[0] ? {name: products[0].name, shadeName: products[0].shadeName} : {name: "", shadeName: ""})

    const arrAdd = (item) => {
        if (isRecoloring) return;
        setSelectProduct({name: item.name, shadeName: item.shadeName})
        onSelect?.(item)
    };

    const selectProductText = "선택된 제품: "
    
    return (
        <div className="glass w-full h-full min-w-0 rounded-3xl p-8 border border-[#FDFAF7]/30 flex flex-col gap-4">
            
            <div className="flex md:flex-row flex-col md:items-center justify-between">
                <div className="md:block hidden">
                    <p className="text-lg text-[#3D2E35] font-gmarket">{productCardConst.title}</p>
                    <p className="text-sm font-light text-[#3D2E35]/60 font-gmarket">{userToneStatus}{productCardConst.subtitle}</p>
                </div>
                <div className="flex md:flex-row flex-col gap-2">
                    <p className="text-lg text-[#3D2E35] font-gmarket">{selectProductText}</p>
                    <p className="md:text-lg text-sm text-[#3D2E35] font-light font-gmarket md:whitespace-nowrap">{selectProduct.name} <br className="md:hidden block" /> {selectProduct.shadeName}</p>
                </div>
            </div>
            
            <div className="md:hidden grid md:grid-cols-3 grid-cols-2 gap-4 flex-1">
                {products.map((item) => {
                    const isSelected = selectProduct.shadeName === item.shadeName;
                    return (
                    <div key={item.brand} className="flex items-center justify-center rounded-2xl border border-[#FDFAF7]/30 p-4 flex-1 glass" onClick={()=> arrAdd(item)}>
                        <div className="w-full aspect-square rounded-xl z-10" style={{ background: item.swatch }} />    
                        <motion.div
                        whileHover={{opacity: 0}}
                        className={`${isSelected ? "hidden" : "block"} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full bg-black/15 rounded-2xl`}></motion.div>
                    </div>
                )})}
            </div>

            <div className="hidden md:grid md:grid-cols-3 grid-cols-1 gap-4 flex-1">
                {products.map((item) => {
                    const isSelected = selectProduct.shadeName === item.shadeName;
                    
                    return (
                    
                    <div key={item.brand} className="relative flex items-center gap-4 rounded-2xl border border-[#FDFAF7]/30 p-4 flex-1 glass cursor-pointer" onClick={() => arrAdd(item)}>
                        <div className="w-20 h-full rounded-xl shrink-0 z-10" style={{ background: item.swatch }} />
                        
                        <motion.div
                        whileHover={{opacity: 0}}
                        className={`${isSelected ? "hidden" : "block"} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full bg-black/15 rounded-2xl`}></motion.div>

                        <div className="flex flex-col gap-1">
                            <p className="text-sm tracking-wide text-[#3D2E35]/50 font-gmarket">{item.brandName}</p>
                            <p className="text-[#3D2E35] md:text-xl text-xs font-gmarket whitespace-pre-line">{item.name}</p>
                            <div className="flex items-center gap-2">
                                <span className="font-light text-[#3D2E35]/50 md:text-base text-xs font-gmarket">{item.shadeName} / {item.shade}{productCardConst.text}</span>
                            </div>
                        </div>
                    </div>
                )})}
            </div>

        </div>
    );
}
