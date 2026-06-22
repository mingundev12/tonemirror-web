import { useCallback, useState, useRef } from "react";
import { motion } from "motion/react";
import Webcam from "react-webcam";

import imageSquareLight from "../assets/img/image-square-light.svg";
import cameraLight from "../assets/img/camera-light.svg";

import HologramOverlay from "./common/HologramOverlay";


export default function ImageUpload() {

  const [file, setFile] = useState(null);
  const [view, setView] = useState(null);
  const [selectMode, setSelectMode] = useState(null);
  const [isCamActive, setIsCamActive] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleChange = (e) => {
    const files = e.currentTarget.files?.[0];
    if (!files) return;
    const alldwedTypes = ["image/jpeg","image/png","image/jpg"]
    if(!alldwedTypes.includes(files.type)) {
      alert("JPG,PNG 형식의 이미지 파일만 업로드 가능합니다");
      return;
    }
      setFile(files);
      setSelectMode("upload");
      setView(URL.createObjectURL(files));
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setView(imageSrc);
      setSelectMode("camera");
      setIsCamActive(false);
    }
  }, [webcamRef]);

 const resetImage = () => {
  if (view && selectMode === "upload") {
    URL.revokeObjectURL(view);
  }
  setView(null);
  setSelectMode(null);
  setIsCamActive(false);
 };

  const overlayVar = { rest: { backgroundColor: "rgba(0,0,0,0)" }, hover: { backgroundColor: "rgba(0,0,0,0.15)" } };
  const iconBoxVar = { rest: { filter: "grayscale(0)" }, hover: { filter: "grayscale(1)" } };
  const imgVar = { rest: { opacity: 1 }, hover: { opacity: 0 } };
  const plusVar = { rest: { opacity: 0 }, hover: { opacity: 1 } };
  const textVar = { rest: { color: "rgba(61,46,53,0.5)" }, hover: { color: "#FDFAF7" } };

  return (

    <div className="flex-1 w-full flex flex-col pb-10 md:pb-0 md:flex-none md:h-[50vh] min-h-0">
      <div className="grid md:grid-cols-4 md:grid-rows-1 grid-rows-[1fr_1fr] md:gap-8 gap-2 w-full flex-1 min-h-0 font-gmarket items-stretch md:items-center">
        <div className="col-span-1 md:block hidden" />

          {/* 왼쪽: 사진 업로드 카드 */}
          <motion.div className="col-span-1 glass w-full h-full min-h-0 rounded-2xl flex flex-col items-center justify-center relative border border-[#FDFAF7]/10 overflow-hidden cursor-pointer" onClick={() => fileInputRef.current?.click()} initial="rest" animate="rest" whileHover="hover" >
            <HologramOverlay />
            <motion.div className="absolute inset-0 pointer-events-none" variants={overlayVar} transition={{ duration: 0.5 }} />
            {selectMode === "upload" && view ? (
              <div className="relative w-full h-full p-4">
                <button onClick={resetImage} className="absolute top-6 right-6 text-2xl z-10">✕</button>
                <img src={view} className="w-full h-full object-cover rounded-2xl" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 md:gap-6 w-full p-3 md:p-6">

                <motion.div className="w-16 h-16 md:w-30 md:h-30 bg-gradient-to-br from-[#FFB3A7] to-[#E87AB8] rounded-2xl flex items-center justify-center shadow-lg relative" variants={iconBoxVar} transition={{ duration: 0.5 }}>

                  <motion.img src={imageSquareLight} className="w-10 h-10 md:w-20 md:h-20" variants={imgVar} transition={{ duration: 0.3 }} />

                  <motion.span className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl leading-none pt-2 md:pt-4 text-[#FDFAF7]" variants={plusVar} transition={{ duration: 0.3 }}>+</motion.span>

                </motion.div>



                <motion.p className="text-center text-sm md:text-xl z-90" variants={textVar} transition={{ duration: 0.5 }}>사진을 업로드해주세요.</motion.p>

              </div>

            )}

          </motion.div>



          {/* 오른쪽: 카메라 촬영 카드 */}

          <motion.div className="col-span-1 glass w-full h-full min-h-0 rounded-2xl flex flex-col items-center justify-center relative border border-[#FDFAF7]/10 overflow-hidden cursor-pointer" onClick={() => setIsCamActive(true)} initial="rest" animate="rest" whileHover="hover" >

            <HologramOverlay />

            <motion.div className="absolute inset-0 pointer-events-none" variants={overlayVar} transition={{ duration: 0.5 }} />

            {selectMode === "camera" && view ? (

              <div className="relative w-full h-full p-4">

                <button onClick={resetImage} className="absolute top-6 right-6 text-2xl z-10">✕</button>

                <img src={view} className="w-full h-full object-cover rounded-2xl" />

              </div>

            ) : isCamActive ? (

              <div className="w-full h-full min-h-0 p-2 md:p-4 flex flex-col gap-2">

                <Webcam audio={false} ref={webcamRef} className="w-full flex-1 min-h-0 object-cover rounded-[30px]" />

                <button onClick={capture} className="w-full py-3 md:py-5 shrink-0 bg-[#FFD1C9] text-[#FDFAF7] rounded-full font-bold text-base md:text-lg">촬영하기</button>

              </div>

            ) : (

              <div className="flex flex-col items-center gap-2 md:gap-6 w-full p-3 md:p-6">

                <motion.div className="w-16 h-16 md:w-30 md:h-30 bg-gradient-to-br from-[#7ACFC9] to-[#7AB8E8] rounded-2xl flex items-center justify-center shadow-lg relative" variants={iconBoxVar} transition={{ duration: 0.5 }}>

                  <motion.img src={cameraLight} className="w-10 h-10 md:w-20 md:h-20" variants={imgVar} transition={{ duration: 0.3 }} />

                  <motion.span className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl leading-none pt-2 md:pt-4 text-[#FDFAF7]" variants={plusVar} transition={{ duration: 0.3 }}>+</motion.span>

                </motion.div>



                <motion.p className="text-center text-sm md:text-xl z-90" variants={textVar} transition={{ duration: 0.5 }}>사진을 촬영해주세요.</motion.p>

              </div>

            )}

          </motion.div>



        <div className="col-span-1 md:block hidden" />



        <input 

        type="file" 

        ref={fileInputRef} 

        className="hidden" 

        onChange={handleChange} 

        accept="image/jpeg, image/png, image/jpg"

        />

      </div>

    </div>

  );

}

