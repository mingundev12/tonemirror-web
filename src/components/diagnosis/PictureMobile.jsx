import { useCallback, useState } from "react";

import PageNation from "./PageNation";
import PictureMobileContent from "./PictureMobileContent";

import { useT } from "../../locales";

export default function PictureMobile({HologramOverlay, scanSmileyLight, beforeImage, GUIDE_SECTIONS}) {
    const t = useT();
    const [page, setPage] = useState(0);

    const MOBILE_SLIDES = [
        { key: "guide", label: t.readyConst[1] },
        { key: "example", label: t.readyConst[0] },
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
           <div className="relative md:hidden flex-1 w-full min-w-0 flex flex-col pb-10 min-h-0">
            <div className="grid grid-rows-[1fr_1fr] gap-2 flex-1 min-h-0 w-full min-w-0 font-gmarket items-stretch px-1">
                <PictureMobileContent HologramOverlay={HologramOverlay} scanSmileyLight={scanSmileyLight} beforeImage={beforeImage} GUIDE_SECTIONS={GUIDE_SECTIONS} onDragEnd={onDragEnd} slide={slide} />
            </div>

                <PageNation MOBILE_SLIDES={MOBILE_SLIDES} goTo={goTo} page={page} />
            </div>
       </>
   )
}
