import ExamPictureMobile from "./ExamPictureMobile";
import PictureGuideNoteMobile from "./PictureGuideNoteMobile";
import { motion, AnimatePresence } from "motion/react";

export default function PictureMobileContent({HologramOverlay, scanSmileyLight, beforeImage, GUIDE_SECTIONS, onDragEnd, slide}) {
   return (
       <>
           <motion.div
            className="row-span-2 min-h-0 h-full w-full min-w-0 font-gmarket"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            >

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                    key={slide.key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="h-full w-full"
                    >
                    {slide.key === "example" ? (
                        
                        // 예제 이미지 컴포넌트
                        <ExamPictureMobile HologramOverlay={HologramOverlay} scanSmileyLight={scanSmileyLight} beforeImage={beforeImage} />
                    ) : (
                        // 촬영 전 주의사항 문구 컴포넌트
                        <PictureGuideNoteMobile HologramOverlay={HologramOverlay} GUIDE_SECTIONS={GUIDE_SECTIONS} />
                    )}
                    </motion.div>
                </AnimatePresence>
            
            </motion.div>
       </>
   )
}