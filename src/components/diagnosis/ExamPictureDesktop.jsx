import { useT } from "../../locales";

export default function ExamPictureDesktop({HologramOverlay, scanSmileyLight, beforeImage}) {
    const t = useT();
   return (
       <>
           <div className="glass flex flex-1 flex-col h-full font-gmarket rounded-2xl p-10 border border-[#FDFAF7]/10">
                <HologramOverlay />
                <div className="flex flex-row gap-1 items-center">
                    <img src={scanSmileyLight} className="w-7 h-7" alt="" />
                    <p className="text-xl font-medium pt-1">{t.readyConst[0]}</p>
                </div>
                <div className="flex flex-1 items-center justify-center min-h-0">
                    <img src={beforeImage} className="h-full w-full object-cover rounded-2xl bg-[#FDFAF7]/50 z-10" />
                </div>
            </div>
       </>
   )
}