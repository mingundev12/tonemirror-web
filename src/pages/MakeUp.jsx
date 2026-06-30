import { useRef, useCallback, useState } from "react";
import { motion } from "motion/react";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";

import BlobGradient from "../components/common/BlobGradient";
import Footer from "../components/common/Footer";

import foundationProducts from "../data/makeup/foundationProducts.json";
import { postVirtualMakeup } from "../api/analysis";

import MakeUpTitle from "../components/makeUp/makeUpTitle";
import MakeUpContent from "../components/makeUp/makeUpContent";
import MakeUpShare from "../components/makeUp/MakeUpShare";
import SaveBtn from "../components/makeUp/SaveBtn";
import { Navigate } from "react-router-dom";

export default function MakeUp({userToneStatus, makeupData, setMakeupData, sourceImageUrl}) {
    const shareRef = useRef(null);
    const products = foundationProducts[userToneStatus] ?? [];

    const [isRecoloring, setIsRecoloring] = useState(false);

    // 컬러칩(파운데이션) 선택 → 해당 색으로 메이크업 재합성 요청
    const handleSelectFoundation = useCallback(async (item) => {
        if (isRecoloring || !makeupData) return;

        setIsRecoloring(true);
        try {
            const { makeupImageUrl } = await postVirtualMakeup({
                originalImageId: makeupData.originalImageId,
                targetFoundationHex: item.swatch,
                files: makeupData.makeupInputs,
            });
            setMakeupData((prev) => ({ ...prev, makeupImageUrl }));
        } catch (error) {
            console.error("메이크업 재합성 실패:", error);
            toast.error("메이크업 적용에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsRecoloring(false);
        }
    }, [isRecoloring, makeupData, setMakeupData]);

    const handleSave = useCallback(async () => {
        if (!shareRef.current) return;

        await document.fonts.ready;

        const dataUrl = await toPng(shareRef.current, {
            pixelRatio: 2,
            backgroundColor: "#FDFAF7",
            cacheBust: true,
            width: 800,
        });

        const link = document.createElement("a");
        link.download = `tonemirror-makeup-${userToneStatus.replace(/\s+/g, "-").toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
    }, [userToneStatus]);

    // 데이터 없으면 진단 페이지로 이동 (메이크업 결과는 진단을 거쳐야 생김)
    if (!userToneStatus || !makeupData) {
        return <Navigate to="/diagnosis" />;
    }
    
   return (
       <>
            <div className="relative w-full bg-[#FDFAF7]">
                <div className="absolute inset-0 min-h-full pointer-events-none">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-10" />
                    <div className="absolute inset-0 opacity-30">
                        <BlobGradient />
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full">
                    <div className="w-full min-h-dvh md:h-screen md:overflow-hidden overflow-auto">
                        <div className="mx-[10%] pt-30 md:pt-0 flex flex-col h-auto md:h-full justify-start md:justify-center items-center gap-10 pb-10 md:pb-0">
                            <MakeUpTitle motion={motion} SaveBtn={SaveBtn} onSave={handleSave} />

                            <MakeUpContent
                                motion={motion}
                                products={products}
                                userToneStatus={userToneStatus}
                                beforeSrc={sourceImageUrl}
                                afterSrc={makeupData.makeupImageUrl}
                                isRecoloring={isRecoloring}
                                onSelectFoundation={handleSelectFoundation}
                            />

                            <div className="md:hidden block">
                                <SaveBtn motion={motion} onSave={handleSave} />
                            </div>
                        </div>
                    </div>

                    <Footer />
                </motion.div>
            </div>

            <div className="fixed left-[-9999px] top-0 pointer-events-none" aria-hidden="true">
                <MakeUpShare
                    ref={shareRef}
                    products={products}
                    userToneStatus={userToneStatus}
                    afterSrc={makeupData.makeupImageUrl}
                />
            </div>
       </>
   )
}
