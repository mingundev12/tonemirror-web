export default function PageNation({MOBILE_SLIDES, goTo, page}) {
   return (
       <>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                {MOBILE_SLIDES.map((item, idx) => (
                    <button
                    key={item.key}
                    type="button"
                    aria-label={`${item.label} 슬라이드`}
                    onClick={() => goTo(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${page === idx ? "w-5 bg-[#3D2E35]" : "w-1.5 bg-[#3D2E35]/30"}`}
                    />
                ))}
            </div> 
       </>
   )
}