import { useState, useRef } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

import imageSquareLight from "../../assets/img/image-square-light.svg";

import HologramOverlay from "../common/HologramOverlay";

import imageUploadConst from "../../data/diagnosis/imageUploadConst.json";
import imageUploadAlertConst from "../../data/diagnosis/imageUploadAlertConst.json";

export default function ImageUpload({ onImageChange }) {
  const [view, setView] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const files = e.currentTarget.files?.[0];
    if (!files) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(files.type)) {
      toast.error(imageUploadAlertConst);
      return;
    }

    if (view) {
      URL.revokeObjectURL(view);
    }

    setView(URL.createObjectURL(files));
    onImageChange?.(files);
  };

  const resetImage = () => {
    if (view) {
      URL.revokeObjectURL(view);
    }
    setView(null);
    onImageChange?.(null);
  };

  return (
    <div className="flex-1 w-full min-w-0 flex flex-col pb-10 md:pb-0 md:flex-none md:h-[50vh] min-h-0">
      <div className="grid md:grid-cols-4 grid-rows-1 md:gap-8 gap-2 w-full min-w-0 flex-1 min-h-0 font-gmarket items-stretch md:items-center px-1 md:px-0">
        <div className="col-span-1 md:block hidden" />

        <motion.div
          className="col-span-1 md:col-span-2 glass w-full h-full min-h-0 rounded-2xl flex flex-col items-center justify-center relative border border-[#FDFAF7]/10 overflow-hidden cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <HologramOverlay />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={{
              rest: { backgroundColor: "rgba(0,0,0,0)" },
              hover: { backgroundColor: "rgba(0,0,0,0.15)" },
            }}
            transition={{ duration: 0.5 }}
          />

          {view ? (
            <div className="relative w-full h-full p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetImage();
                }}
                className="absolute top-6 right-6 text-2xl z-10"
              >
                {"\u00d7"}
              </button>
              <img src={view} className="w-full h-full object-cover rounded-2xl" alt="" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 md:gap-6 w-full p-3 md:p-6">
              <motion.div
                className="w-16 h-16 md:w-30 md:h-30 bg-gradient-to-br from-[#FFB3A7] to-[#E87AB8] rounded-2xl flex items-center justify-center shadow-lg relative"
                variants={{
                  rest: { filter: "grayscale(0)" },
                  hover: { filter: "grayscale(1)" },
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={imageSquareLight}
                  className="w-10 h-10 md:w-20 md:h-20"
                  variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl leading-none pt-2 md:pt-4 text-[#FDFAF7]"
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </motion.div>

              <motion.p
                className="text-center text-sm md:text-xl z-90"
                variants={{
                  rest: { color: "rgba(61,46,53,0.5)" },
                  hover: { color: "#FDFAF7" },
                }}
                transition={{ duration: 0.5 }}
              >
                {imageUploadConst.pictureUpload}
              </motion.p>
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
