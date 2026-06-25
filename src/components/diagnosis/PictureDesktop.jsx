import ExamPictureDesktop from "./ExamPictureDesktop";
import PictureGuideNoteDesktop from "./PictureGuideNoteDesktop";

export default function PictureDesktop({HologramOverlay, scanSmileyLight, beforeImage}) {
   return (
       <>
           <div className="hidden md:block w-full h-[50vh]">
                <div className="flex flex-row gap-8 w-full h-full text-[#3D2E35]/75">
                    
                    {/* 예제 이미지 */}
                    <ExamPictureDesktop HologramOverlay={HologramOverlay} scanSmileyLight={scanSmileyLight} beforeImage={beforeImage} />

                    {/* 촬영 전 주의사항 문구 */}
                    <PictureGuideNoteDesktop HologramOverlay={HologramOverlay} />
                </div>
            </div>
       </>
   )
}