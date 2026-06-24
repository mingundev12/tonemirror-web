import readyConst from "../../data/diagnosis/readyConst.json";

export default function PictureGuideNoteMobile({HologramOverlay, GUIDE_SECTIONS}) {
   return (
       <>
        <div className="glass flex flex-col h-full min-h-0 w-full min-w-0 rounded-2xl border border-[#FDFAF7]/10 font-gmarket relative p-3">
            <HologramOverlay />
            <div className="flex flex-row gap-1.5 items-center shrink-0">
            <p className="text-base font-medium pt-1">{readyConst[1]}</p>
            </div>
            <div className="flex flex-1 flex-col min-h-0 mt-4 justify-between">
            {GUIDE_SECTIONS.map((section) => (
                <section key={section.title} className="shrink-0">
                <div className="flex flex-row gap-1.5 items-center mb-2.5">
                    <img src={section.icon} className="w-5 h-5" alt="" />
                    <p className="text-sm font-medium pt-0.5">{section.title}</p>
                </div>
                <ul className="flex flex-col gap-2 ml-3 text-sm leading-snug text-[#3D2E35]/75 break-words">
                    {section.items.map((text) => (
                    <li key={text} className="font-light min-w-0">{text}</li>
                    ))}
                </ul>
                </section>
            ))}
            </div>
        </div> 
       </>
   )
}
