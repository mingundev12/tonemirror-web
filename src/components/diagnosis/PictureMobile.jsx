import { useCallback, useState } from "react";

import PageNation from "./PageNation";
import PictureMobileContent from "./PictureMobileContent";

export default function PictureMobile({HologramOverlay, scanSmileyLight, beforeImage, GUIDE_SECTIONS}) {
    const [page, setPage] = useState(0);

    const MOBILE_SLIDES = [
        { key: "guide", label: "guideNote" },
        { key: "example", label: "examplePicture" },
    ];

    const goTo = useCallback((idx) => {
    setPage(Math.max(0, Math.min(idx, MOBILE_SLIDES.length - 1)));
    }, []);

    const onDragEnd = useCallback((_, info) => {
    if (info.offset.x < -50) goTo(page + 1);
    else if (info.offset.x > 50) goTo(page - 1);
    }, [goTo, page]);

    const slide = MOBILE_SLIDES[page];
    return (
       <>
           <div className="relative md:hidden flex-1 w-full flex flex-col pb-10 min-h-0">
            
                {/* 컨텐츠 */}
                <PictureMobileContent HologramOverlay={HologramOverlay} scanSmileyLight={scanSmileyLight} beforeImage={beforeImage} GUIDE_SECTIONS={GUIDE_SECTIONS} onDragEnd={onDragEnd} slide={slide} />

                {/* 페이지네이션 */}
                <PageNation MOBILE_SLIDES={MOBILE_SLIDES} goTo={goTo} page={page} />
            </div>
       </>
   )
}