import { useRef, useCallback, useState, useEffect } from "react";
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

export default function MakeUp({ userToneStatus, diagnosisSession, makeupResult, setMakeupResult, sourceImageUrl }) {
    const shareRef = useRef(null);
    const products = foundationProducts[userToneStatus] ?? [];

    const [isRecoloring, setIsRecoloring] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const initialMakeupRequested = useRef(false);

    const isMakeupLoading = isInitialLoading || isRecoloring;
    const makeupImageUrl = makeupResult?.makeupImageUrl ?? null;

    const requestVirtualMakeup = useCallback(async (targetFoundationHex = null) => {
        if (!diagnosisSession?.original_image_id || !diagnosisSession?.makeup_inputs?.length) {
            throw new Error("메이크업에 필요한 1차 진단 데이터가 없습니다.");
        }
        if (!diagnosisSession?.original_image_url) {
            throw new Error("원본 이미지 URL이 없어 메이크업을 합성할 수 없습니다.");
        }

        const { makeupImageUrl: url } = await postVirtualMakeup({
            originalImageId: diagnosisSession.original_image_id,
            targetFoundationHex,
            files: [
                ...diagnosisSession.makeup_inputs,
                { file_type: "original_image", file_url: diagnosisSession.original_image_url },
            ],
        });

        setMakeupResult({ makeupImageUrl: url });
        return url;
    }, [diagnosisSession, setMakeupResult]);

    // 페이지 진입 시 2차 메이크업을 React에서 FastAPI로 독립 격발
    useEffect(() => {
        if (makeupImageUrl || initialMakeupRequested.current) return;
        if (!diagnosisSession?.original_image_id || !diagnosisSession?.makeup_inputs?.length) return;

        initialMakeupRequested.current = true;
        let cancelled = false;

        const applyInitialMakeup = async () => {
            setIsInitialLoading(true);
            try {
                await requestVirtualMakeup();
            } catch (error) {
                if (cancelled) return;
                initialMakeupRequested.current = false;
                console.error("초기 메이크업 적용 실패:", error);
                toast.error(error.message || "메이크업 적용에 실패했습니다. 다시 시도해주세요.");
            } finally {
                if (!cancelled) setIsInitialLoading(false);
            }
        };

        applyInitialMakeup();
        return () => { cancelled = true; };
    }, [diagnosisSession, makeupImageUrl, requestVirtualMakeup]);

    const handleApplyMakeup = useCallback(async () => {
        if (isMakeupLoading) return;

        setIsInitialLoading(true);
        try {
            await requestVirtualMakeup();
        } catch (error) {
            console.error("메이크업 적용 실패:", error);
            toast.error(error.message || "메이크업 적용에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsInitialLoading(false);
        }
    }, [isMakeupLoading, requestVirtualMakeup]);

    const handleSelectFoundation = useCallback(async (item) => {
        if (isMakeupLoading) return;

        setIsRecoloring(true);
        try {
            await requestVirtualMakeup(item.swatch);
        } catch (error) {
            console.error("메이크업 재합성 실패:", error);
            toast.error(error.message || "메이크업 적용에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsRecoloring(false);
        }
    }, [isMakeupLoading, requestVirtualMakeup]);

    const handleSave = useCallback(async () => {
        if (!shareRef.current || !makeupImageUrl) return;

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
    }, [userToneStatus, makeupImageUrl]);

    // 1차 진단 데이터만 있으면 진입 허용 (2차 메이크업 결과는 필수 아님)
    if (!userToneStatus || !diagnosisSession?.original_image_id || !diagnosisSession?.makeup_inputs?.length) {
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

                            {!makeupImageUrl && !isMakeupLoading && (
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                                    transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100 }}
                                    className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] rounded-full px-8 py-3 cursor-pointer font-gmarket"
                                    onClick={handleApplyMakeup}
                                >
                                    모의 메이크업 적용
                                </motion.button>
                            )}

                            <MakeUpContent
                                motion={motion}
                                products={products}
                                userToneStatus={userToneStatus}
                                beforeSrc={sourceImageUrl ?? diagnosisSession.original_image_url}
                                afterSrc={makeupImageUrl}
                                isRecoloring={isMakeupLoading}
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

            {makeupImageUrl && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none" aria-hidden="true">
                    <MakeUpShare
                        ref={shareRef}
                        products={products}
                        userToneStatus={userToneStatus}
                        afterSrc={makeupImageUrl}
                    />
                </div>
            )}
       </>
   )
}
