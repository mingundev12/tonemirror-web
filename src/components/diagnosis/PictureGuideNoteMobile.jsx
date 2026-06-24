
export default function PictureGuideNote({HologramOverlay, GUIDE_SECTIONS}) {
    
    

   return (
       <>
        <div className="glass flex flex-col h-full min-h-0 w-full rounded-2xl border border-[#FDFAF7]/10 overflow-hidden font-gmarket relative py-5 px-4">
            <HologramOverlay />
            <div className="flex flex-row gap-1.5 items-center shrink-0">
            <p className="text-base font-medium pt-1">촬영 전 유의사항</p>
            </div>
            <div className="flex flex-1 flex-col min-h-0 mt-4 gap-5">
            {GUIDE_SECTIONS.map((section) => (
                <section key={section.title} className="shrink-0">
                <div className="flex flex-row gap-1.5 items-center mb-2">
                    <img src={section.icon} className="w-5 h-5" alt="" />
                    <p className="text-sm font-medium pt-0.5">{section.title}</p>
                </div>
                <ul className="flex flex-col gap-1.5 ml-3 text-sm leading-tight text-[#3D2E35]/75">
                    {section.items.map((text) => (
                    <li key={text} className="font-light">{text}</li>
                    ))}
                </ul>
                </section>
            ))}
            </div>
        </div> 
       </>
   )
}