export default function PictureGuideNoteDesktop({HologramOverlay, GUIDE_SECTIONS}) {
   return (
       <>
           {GUIDE_SECTIONS.map((section) => (
                <div key={section.title} className="glass flex flex-1 flex-col gap-10 font-gmarket rounded-2xl h-full p-10 border border-[#FDFAF7]/10">
                <HologramOverlay />
                <div className="flex flex-row gap-1 items-center">
                    <img src={section.icon} className="w-7 h-7" alt="" />
                    <p className="text-xl font-medium pt-1">{section.title}</p>
                </div>
                <ul className="flex flex-col gap-2 ml-4">
                    {section.items.map((text) => (
                    <li key={text} className="font-light">{text}</li>
                    ))}
                </ul>
                </div>
            ))}
       </>
   )
}