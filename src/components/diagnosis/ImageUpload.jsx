import { useCallback, useState, useRef } from "react";
import { motion } from "motion/react";
import Webcam from "react-webcam";

import imageSquareLight from "../../assets/img/image-square-light.svg";
import cameraLight from "../../assets/img/camera-light.svg";

import HologramOverlay from "../common/HologramOverlay";

import imageUploadConst from "../../data/diagnosis/imageUploadConst.json";
import imageUploadAlertConst from "../../data/diagnosis/imageUploadAlertConst.json";

export default function ImageUpload() {
  // 업로드 파일 / 미리보기 URL / 선택 모드 / 카메라 활성화 상태
  const [file, setFile] = useState(null);
  const [view, setView] = useState(null);
  const [selectMode, setSelectMode] = useState(null);
  const [isCamActive, setIsCamActive] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);

  const handleButtonClick = () => fileInputRef.current?.click();

  // 파일 선택 시 확장자 검증 후 미리보기
  const handleChange = (e) => {
    const files = e.currentTarget.files?.[0];
    if (!files) return;
    const alldwedTypes = ["image/jpeg","image/png","image/jpg"]
    if(!alldwedTypes.includes(files.type)) {
      alert(imageUploadAlertConst);
      return;
    }
      setFile(files);
      setSelectMode("upload");
      setView(URL.createObjectURL(files));
  };

  // 웹캠 스크린샷 촬영
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setView(imageSrc);
      setSelectMode("camera");
      setIsCamActive(false);
    }
  }, [webcamRef]);

  // 선택 이미지·모드 초기화 (업로드 URL revoke 포함)
 const resetImage = () => {
  if (view && selectMode === "upload") {
    URL.revokeObjectURL(view);
  }
  setView(null);
  setSelectMode(null);
  setIsCamActive(false);
 };

  return (

    <div className="flex-1 w-full min-w-0 flex flex-col pb-10 md:pb-0 md:flex-none md:h-[50vh] min-h-0">
      <div className="grid md:grid-cols-4 md:grid-rows-1 grid-rows-[1fr_1fr] md:gap-8 gap-2 w-full min-w-0 flex-1 min-h-0 font-gmarket items-stretch md:items-center px-1 md:px-0">
        <div className="col-span-1 md:block hidden" />

          {/* 사진 업로드 카드 */}
          <motion.div className="col-span-1 glass w-full h-full min-h-0 rounded-2xl flex flex-col items-center justify-center relative border border-[#FDFAF7]/10 overflow-hidden cursor-pointer" onClick={() => fileInputRef.current?.click()} initial="rest" animate="rest" whileHover="hover">
            <HologramOverlay />
            {/* 호버 시 어두운 오버레이 */}
            <motion.div className="absolute inset-0 pointer-events-none" variants={{ rest: { backgroundColor: "rgba(0,0,0,0)" }, hover: { backgroundColor: "rgba(0,0,0,0.15)" } }} transition={{ duration: 0.5 }} />
            {selectMode === "upload" && view ? (

              <div className="relative w-full h-full p-4">
                {/* 업로드된 이미지 미리보기 */}
                <button onClick={resetImage} className="absolute top-6 right-6 text-2xl z-10">{"\u00d7"}</button>
                <img src={view} className="w-full h-full object-cover rounded-2xl" />
              </div>

            ) : (

              <div className="flex flex-col items-center gap-2 md:gap-6 w-full p-3 md:p-6">
                {/* 업로드 전 기본 UI (아이콘 + 안내 문구) */}

                <motion.div className="w-16 h-16 md:w-30 md:h-30 bg-gradient-to-br from-[#FFB3A7] to-[#E87AB8] rounded-2xl flex items-center justify-center shadow-lg relative" variants={{ rest: { filter: "grayscale(0)" }, hover: { filter: "grayscale(1)" } }} transition={{ duration: 0.5 }}>
                  <motion.img src={imageSquareLight} className="w-10 h-10 md:w-20 md:h-20" variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }} transition={{ duration: 0.3 }} />
                  <motion.span className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl leading-none pt-2 md:pt-4 text-[#FDFAF7]" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }}>+</motion.span>
                </motion.div>

                <motion.p className="text-center text-sm md:text-xl z-90" variants={{ rest: { color: "rgba(61,46,53,0.5)" }, hover: { color: "#FDFAF7" } }} transition={{ duration: 0.5 }}>{imageUploadConst.pictureUpload}</motion.p>

              </div>

            )}

          </motion.div>

          {/* 카메라 촬영 카드 */}
          <motion.div className="col-span-1 glass w-full h-full min-h-0 rounded-2xl flex flex-col items-center justify-center relative border border-[#FDFAF7]/10 overflow-hidden cursor-pointer" onClick={() => setIsCamActive(true)} initial="rest" animate="rest" whileHover="hover">

            <HologramOverlay />

            {/* 호버 시 어두운 오버레이 */}
            <motion.div className="absolute inset-0 pointer-events-none" variants={{ rest: { backgroundColor: "rgba(0,0,0,0)" }, hover: { backgroundColor: "rgba(0,0,0,0.15)" } }} transition={{ duration: 0.5 }} />
            {selectMode === "camera" && view ? (

              <div className="relative w-full h-full p-4">
                {/* 촬영된 이미지 미리보기 */}
                <button onClick={resetImage} className="absolute top-6 right-6 text-2xl z-10">{"\u00d7"}</button>
                <img src={view} className="w-full h-full object-cover rounded-2xl" />
              </div>

            ) : isCamActive ? (

              <div className="w-full h-full min-h-0 p-2 md:p-4 flex flex-col gap-2">
                {/* 웹캠 활성화 + 촬영 버튼 */}
                <Webcam audio={false} ref={webcamRef} className="w-full flex-1 min-h-0 object-cover rounded-[30px]" />
                <button onClick={capture} className="w-full py-3 md:py-5 shrink-0 bg-[#FFD1C9] text-[#FDFAF7] rounded-full font-bold text-base md:text-lg">{imageUploadConst.button}</button>
              </div>

            ) : (

              <div className="flex flex-col items-center gap-2 md:gap-6 w-full p-3 md:p-6">
                {/* 촬영 전 기본 UI (아이콘 + 안내 문구) */}
                <motion.div className="w-16 h-16 md:w-30 md:h-30 bg-gradient-to-br from-[#7ACFC9] to-[#7AB8E8] rounded-2xl flex items-center justify-center shadow-lg relative" variants={{ rest: { filter: "grayscale(0)" }, hover: { filter: "grayscale(1)" } }} transition={{ duration: 0.5 }}>
                  <motion.img src={cameraLight} className="w-10 h-10 md:w-20 md:h-20" variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }} transition={{ duration: 0.3 }} />
                  <motion.span className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl leading-none pt-2 md:pt-4 text-[#FDFAF7]" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }}>+</motion.span>
                </motion.div>

                <motion.p className="text-center text-sm md:text-xl z-90" variants={{ rest: { color: "rgba(61,46,53,0.5)" }, hover: { color: "#FDFAF7" } }} transition={{ duration: 0.5 }}>{imageUploadConst.PictureShot}</motion.p>
              </div>

            )}

          </motion.div>

        <div className="col-span-1 md:block hidden" />

        {/* 숨겨진 파일 input (업로드 카드 클릭으로 트리거) */}
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleChange} accept="image/jpeg, image/png, image/jpg"/>

      </div>

    </div>

  );

}
