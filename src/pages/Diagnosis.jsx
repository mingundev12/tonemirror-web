import { useEffect, useState } from "react"
import { motion } from "motion/react";

import ImageUpload from "../components/diagnosis/ImageUpload";
import Analysis from "../components/diagnosis/Analysis";
import BlobGradient from "../components/common/BlobGradient";
import Ready from "../components/diagnosis/Ready";
import Indicator from "../components/diagnosis/Indicator";
import DiagNavBtn from "../components/diagnosis/DiagNavBtn";
import DiagTitle from "../components/diagnosis/DiagTitle";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postAnalysis } from "../api/analysis";

export default function Diagnosis({setUserToneStatus, setUserSkinTone, setMakeupData, setSourceImageUrl}) {
    const navigate = useNavigate();

    const [diagStatus, setDiagStatus] = useState("ready")
    const [imageFile, setImageFile] = useState(null);
    const isDiagStep = ["ready", "upload", "analysis"].includes(diagStatus);

    // 분석 완료 시 유저 퍼스널컬러 설정
    const handleAnalysisComplete = () => {
        navigate("/result");
    }

    // 분석 완료 시 페이지 전환
    const [readyToFinish, setReadyToFinish] = useState(false);

    useEffect(() => {
        if (diagStatus !== "analysis") return;
        setReadyToFinish(false);

        if (!imageFile) {
            setDiagStatus("upload");
            return;
        }

        let cancelled = false;

        const runAnalysis = async () => {
            try {
                const data = await postAnalysis(imageFile);
                if (cancelled) return;

                setUserToneStatus(data.personalColor);
                setUserSkinTone(data.skinTone);
                setMakeupData({
                    originalImageId: data.originalImageId,
                    makeupInputs: data.makeupInputs,
                    makeupImageUrl: data.makeupImageUrl,
                });
                setSourceImageUrl(URL.createObjectURL(imageFile)); // before 이미지(업로드 원본)
                setReadyToFinish(true);
            } catch (error) {
                if (cancelled) return;
                console.error("분석 실패:", error);
                toast.error("분석에 실패했습니다. 다시 시도해주세요.");
                setDiagStatus("upload");
            }
        };

        runAnalysis();
        return () => { cancelled = true; };
    }, [diagStatus, imageFile, setUserToneStatus, setUserSkinTone, setMakeupData, setSourceImageUrl]);

   return (
       <>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" style={{ transform: "none" }}>
                {/* 배경 */}
                <div className="absolute w-full h-full bg-gradient-to-b from-[#FDFAF7] from-40% to-transparent to-70% z-1 pointer-events-none" />
                <div className="absolute w-full h-screen -z-50 opacity-30">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>
                
                {/* 컨텐츠 */}
                <div className={`relative mx-[10%] z-10 ${isDiagStep ? "pt-20 md:pt-30 h-dvh md:h-screen flex flex-col md:block" : "pt-30 h-screen"}`}>

                    {/* 인디케이터 */}
                    <Indicator diagStatus={diagStatus} isDiagStep={isDiagStep}/>

                    {/* 버튼 & 타이틀 */}
                    <div className={`flex flex-col md:grid md:grid-cols-3 items-center gap-4 md:gap-0 shrink-0 ${isDiagStep ? "mt-8 mb-4 md:mt-20 md:mb-10" : "mt-20 mb-10"}`}>

                        <div className="hidden md:flex order-2 md:order-1 justify-start">
                            {(diagStatus === "upload" || diagStatus === "analysis") && (
                                <DiagNavBtn
                                    direction="prev"
                                    variant="full"
                                    onClick={() => setDiagStatus(diagStatus === "upload" ? "ready" : "upload")}
                                />
                            )}
                        </div>

                        <div className="order-1 md:order-2 flex flex-col items-center text-center">
                            {/* 타이틀 */}
                            <DiagTitle diagStatus={diagStatus}/>
                            
                            {diagStatus === "ready" && (
                                <div className="md:hidden flex justify-center mt-1 w-full min-h-10">
                                    <DiagNavBtn
                                        direction="next"
                                        variant="simple"
                                        onClick={() => setDiagStatus("upload")}
                                    />
                                </div>
                            )}

                            {diagStatus === "upload" && (
                                <div className="md:hidden flex flex-row gap-2 items-center justify-center mt-1 w-full min-h-10">
                                    <DiagNavBtn
                                        direction="prev"
                                        variant="full"
                                        onClick={() => setDiagStatus("ready")}
                                    />
                                    {imageFile && (
                                        <DiagNavBtn
                                            direction="next"
                                            variant="full"
                                            onClick={() => setDiagStatus("analysis")}
                                        />
                                    )}
                                </div>
                            )}

                            {diagStatus === "analysis" && (
                                <div className="md:hidden flex justify-center mt-1 w-full">
                                    <DiagNavBtn
                                        direction="prev"
                                        variant="simple"
                                        onClick={() => setDiagStatus("upload")}
                                    />
                                </div>
                            )}

                        </div>

                        <div className={`order-3 md:order-3 flex justify-end ${diagStatus === "upload" || diagStatus === "ready" ? "hidden md:flex" : ""}`}>
                            {(diagStatus === "ready" || (diagStatus === "upload" && imageFile)) && (
                                <DiagNavBtn
                                    direction="next"
                                    variant="full"
                                    onClick={() => setDiagStatus(diagStatus === "ready" ? "upload" : "analysis")}/>
                            )}
                        </div>
                    </div>

                    {/* 준비, 이미지 업로드, 분석 화면 */}
                    {diagStatus === "upload" ? 
                        <div className="flex-1 flex flex-col md:contents">
                            <ImageUpload onImageChange={setImageFile} />
                        </div>

                    : diagStatus === "analysis" ? 
                        <div className="flex-1 flex flex-col md:contents">
                            <Analysis handleAnalysisComplete={handleAnalysisComplete} readyToFinish={readyToFinish}/>
                        </div>

                    : diagStatus === "ready" ? 
                        <div className="flex-1 flex flex-col md:contents">
                            <Ready />
                        </div>
                    : ""
                    }                       
                </div>

           </motion.div>

       </>

   )

}
