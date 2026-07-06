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

export default function Diagnosis({
    setUserToneStatus,
    setUserSkinTone,
    setDiagnosisConfidence,
    setDiagnosisSession,
    setMakeupResult,
    setSourceImageUrl,
}) {
    const navigate = useNavigate();

    const [diagStatus, setDiagStatus] = useState("ready")
    const [imageFile, setImageFile] = useState(null);
    const [readyToFinish, setReadyToFinish] = useState(false);
    const isDiagStep = ["ready", "upload", "analysis"].includes(diagStatus);

    const handleAnalysisComplete = () => {
        navigate("/result");
    }

    const startAnalysis = () => {
        if (!imageFile) return;
        setReadyToFinish(false);
        setDiagStatus("analysis");
    };

    useEffect(() => {
        if (diagStatus !== "analysis" || !imageFile) return;

        let cancelled = false;

        const runAnalysis = async () => {
            try {
                const data = await postAnalysis(imageFile);
                if (cancelled) return;

                if (!data.personal_color || !data.detected_skin_hex) {
                    throw new Error("1차 진단 결과가 불완전합니다.");
                }
                if (!data.original_image_id || !data.makeup_inputs?.length) {
                    throw new Error("메이크업 준비 데이터(ROI)가 없습니다.");
                }

                setUserToneStatus(data.personal_color);
                setUserSkinTone(data.detected_skin_hex);
                setDiagnosisConfidence(data.diagnosis_confidence);
                setDiagnosisSession({
                    original_image_id: data.original_image_id,
                    original_image_url: data.original_image_url,
                    makeup_inputs: data.makeup_inputs,
                    makeup_image_url: data.makeup_image_url,
                    personal_color: data.personal_color,
                });
                setMakeupResult(data.makeup_image_url ? { makeupImageUrl: data.makeup_image_url } : null);
                setSourceImageUrl(URL.createObjectURL(imageFile));
                setReadyToFinish(true);
            } catch (error) {
                if (cancelled) return;
                console.error("분석 실패:", error);
                toast.error(error.message || "분석에 실패했습니다. 다시 시도해주세요.");
                setDiagStatus("upload");
            }
        };

        runAnalysis();
        return () => { cancelled = true; };
    }, [diagStatus, imageFile, setUserToneStatus, setUserSkinTone, setDiagnosisConfidence, setDiagnosisSession, setMakeupResult, setSourceImageUrl]);

   return (
       <>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" style={{ transform: "none" }}>
                <div className="absolute w-full h-full bg-gradient-to-b from-[#FDFAF7] from-40% to-transparent to-70% z-1 pointer-events-none" />
                <div className="absolute w-full h-screen -z-50 opacity-30">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>

                <div className={`relative mx-[10%] z-10 ${isDiagStep ? "pt-20 md:pt-30 h-dvh md:h-screen flex flex-col md:block" : "pt-30 h-screen"}`}>

                    <Indicator diagStatus={diagStatus} isDiagStep={isDiagStep}/>

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
                                            onClick={startAnalysis}
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
                                    onClick={() => (diagStatus === "ready" ? setDiagStatus("upload") : startAnalysis())}/>
                            )}
                        </div>
                    </div>

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
