import HalfMakeupCard from "../components/HalfMakeupCard";
import ProductCard from "../components/ProductCard";
import downloadSimpleLight from "../assets/img/download-simple-light.svg";
import { motion } from "motion/react";
import BlobGradient from "../components/common/BlobGradient";

export default function MakeUp({userToneStatus}) {
    
    const warmSpringFoundationProducts = [
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "17N1 (Ivory)", shade: "17", swatch: "#FDDFC3" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "19N1 (Light Vanilla)", shade: "19", swatch: "#FDD2B9" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "21W1 (Warm Vanilla)", shade: "21", swatch: "#FBD5AE" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "23W1 (Sand Beige)", shade: "23", swatch: "#EEBD92" },
        { brand: "ESPOIR", brandKor: "에스쁘아", name: ["프로 테일러 비 벨벳", "플루이드 파운데이션"], shadeName: "21호 아이보리 (Ivory)", shade: "21", swatch: "#ECD1B6" },
        { brand: "LANCOME", brandKor: "랑콤", name: ["프로 테일러 비 벨벳", "플루이드 파운데이션"], shadeName: "21호 아이보리 (Ivory)", shade: "21", swatch: "#ECD1B6" }
    ];

    const coolSummerFoundationProducts = [
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "17C1 (Petal Ivory)", shade: "17", swatch: "#FED9BF" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "21C1 (Rose Vanilla)", shade: "21", swatch: "#F9CEAD" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "23C1 (Pink Beige)", shade: "23", swatch: "#EEBD9D" },
        { brand: "ESPOIR", brandKor: "에스쁘아", name: ["프로 테일러 비 벨벳", "플루이드 파운데이션"], shadeName: "21호 아이보리 (Ivory)", shade: "21", swatch: "#F9E4D5" },
        { brand: "LANCOME", brandKor: "랑콤", name: ["뗑 이돌 울트라 웨어", "롱웨어 플루이드"], shadeName: "PO-01 (Ecru)", shade: "19", swatch: "#FAE2D2" },
        { brand: "LANCOME", brandKor: "랑콤", name: ["뗑 이돌 울트라 웨어", "롱웨어 플루이드"], shadeName: "PO-02 (Rose Vanilla)", shade: "21", swatch: "#F5D1BC" }
    ];

    const warmAutumnFoundationProducts = [
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "21N1 (Vanilla)", shade: "21", swatch: "#F4CBA8" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "23N1 (Beige)", shade: "23", swatch: "#E5BA96" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "25N1 (Amber)", shade: "25", swatch: "#F4B987" },
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "27N1 (Honey)", shade: "27", swatch: "#D9A87B" },
        { brand: "ESPOIR", brandKor: "에스쁘아", name: ["프로 테일러 비 벨벳", "플루이드 파운데이션"], shadeName: "22호 페탈 (Petal)", shade: "22", swatch: "#EBC4A4" },
        { brand: "LANCOME", brandKor: "랑콤", name: ["프로 테일러 비 벨벳", "플루이드 파운데이션"], shadeName: "23호 베이지 (Beige)", shade: "23", swatch: "#E3BA9C" }
    ];
    
    const coolWinterFoundationProducts = [
        { brand: "HERA", brandKor: "헤라", name: ["실키 스테이 24H", "롱웨어 파운데이션"], shadeName: "13N1 (Porcelain)", shade: "13", swatch: "#FDF3EE" },
        { brand: "ESPOIR", brandKor: "에스쁘아", name: ["프로 테일러 비 벨벳", "플루이드 파운데이션"], shadeName: "13호 포슬린 (Porcelain)", shade: "13", swatch: "#FCEEE7" },
        { brand: "NARS", brandKor: "나스", name: ["네츄럴 래디언트", "롱웨어 파운데이션"], shadeName: "L1 (Oslo)", shade: "13", swatch: "#FCEBE2" },
        { brand: "NARS", brandKor: "나스", name: ["네츄럴 래디언트", "롱웨어 파운데이션"], shadeName: "L2 (Mont Blanc)", shade: "17", swatch: "#FAE3D2" },
        { brand: "DIOR", brandKor: "디올", name: ["포에버 스킨", "글로우 파운데이션"], shadeName: "0CR (Cool Rosy)", shade: "13", swatch: "#FDF0E6" },
        { brand: "DIOR", brandKor: "디올", name: ["포에버 스킨", "글로우 파운데이션"], shadeName: "0N (Neutral)", shade: "13", swatch: "#FDF2EA" },
    ];


    const products =
        userToneStatus === "Warm Spring" ? warmSpringFoundationProducts
        : userToneStatus === "Cool Summer" ? coolSummerFoundationProducts
        : userToneStatus === "Warm Autumn" ? warmAutumnFoundationProducts
        : userToneStatus === "Cool Winter" ? coolWinterFoundationProducts
        : [];
    
   return (
       <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-screen relative overflow-hidden z-50">
                <div className="absolute w-full h-screen opacity-30 -z-50">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>
                <div className="mx-[10%] flex flex-col h-full justify-center items-center gap-10">
                    <div className="grid grid-cols-3 items-center">
                        <div></div>
                        <div>
                            <p className="md:text-4xl text-3xl text-center text-[#3D2E35] font-gmarket">가상 메이크업</p>
                            <p className="text-lg text-center font-light text-[#3D2E35] font-gmarket">퍼스널 컬러 진단 결과를 바탕으로 가상 메이크업을 비교해보세요.</p>
                        </div>
                        <div className="flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                                transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                                className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 items-center justify-end rounded-full w-fit px-10 py-4 cursor-pointer" type="button" onClick={() => {}}>
                                <img src={downloadSimpleLight} className="w-5 h-5" />
                                <p className="font-light pt-1 font-gmarket">가상 메이크업 저장</p>
                            </motion.button>
                        </div>
                        
                    </div>

                    <div className="flex items-stretch gap-5 w-full h-[60%]">
                        <motion.div className="shrink-0 h-full" initial={{ y: 200, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.1, delay: 0.1, ease: "easeInOut", type: "spring", damping: 10, stiffness: 50}}>
                            <HalfMakeupCard />
                        </motion.div>
                        <motion.div className="flex-1 min-w-0 h-full" initial={{ y: 200, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.1, delay: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 50}}>
                            <ProductCard products={products} userToneStatus={userToneStatus}/>
                        </motion.div>
                        {/* <motion.div className="flex-1 min-w-0 h-full" initial={{ y: 200, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.1, delay: 0.3, ease: "easeInOut", type: "spring", damping: 10, stiffness: 50}}>
                            <ProductCard title="립 추천" products={lipProducts} />
                        </motion.div>
                        <motion.div className="flex-1 min-w-0 h-full" initial={{ y: 200, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.1, delay: 0.4, ease: "easeInOut", type: "spring", damping: 10, stiffness: 50}}>
                            <ProductCard title="블러셔 추천" products={blushProducts} />
                        </motion.div> */}
                    </div>
                </div>
            </motion.div>
       </>
   )
}