import { useT } from "../../locales";

export default function ExamPictureMobile({HologramOverlay, scanSmileyLight, beforeImage}) {
    const t = useT();

   return (
       <>
        <div className="glass flex flex-col h-full min-h-0 w-full min-w-0 rounded-2xl border border-[#FDFAF7]/10 font-gmarket relative p-3">
            <HologramOverlay />

            <div className="flex flex-row gap-1.5 items-center shrink-0">
                <img src={scanSmileyLight} className="w-6 h-6" alt="" />
                <p className="text-base font-medium pt-1">{t.readyConst[0]}</p>
            </div>

            <div className="flex flex-1 flex-col min-h-0 mt-2 overflow-hidden rounded-xl">
                <div className="flex flex-1 items-center justify-center min-h-0">
                <img src={beforeImage} className="h-full w-full object-cover rounded-xl bg-[#FDFAF7]/50 z-10"/>
                </div>
            </div>
            
        </div>  
       </>
   )
}
