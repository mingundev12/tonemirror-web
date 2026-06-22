import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import beforeImage from "../assets/modelHead4.png";
import angleLight from "../assets/img/angle-light.svg";
import lightbulbFilamentLight from "../assets/img/lightbulb-filament-light.svg";
import scanSmileyLight from "../assets/img/scan-smiley-light.svg";
import imageSquare from "../assets/img/image-square.svg";
import HologramOverlay from "./common/HologramOverlay";

const GUIDE_SECTIONS = [
  {
    icon: imageSquare,
    title: "사진",
    items: [
      "핸드폰 카메라 기본 비율(9:16)로 촬영해주세요.",
      "필터 없는 사진으로 준비해주세요.",
      "화장은 최대한 지운 상태가 정확해요.",
      "머리카락이 얼굴을 가리지 않게 해주세요.",
      "안경, 액세서리는 빼주세요.",
    ],
  },
  {
    icon: angleLight,
    title: "구도",
    items: [
      "정면을 바라보고 촬영해주세요.",
      "얼굴 전체가 프레임 안에 들어오게 해주세요.",
      "배경은 흰색이나 단색이 좋습니다.",
    ],
  },
  {
    icon: lightbulbFilamentLight,
    title: "조명",
    items: [
      "자연광이나 밝은 조명 아래서 촬영해주세요.",
      "역광이나 그림자가 지는 환경은 피해주세요.",
      "노란빛 조명은 분석 정확도를 떨어뜨릴 수 있어요.",
    ],
  },
];

const MOBILE_SLIDES = [
    { key: "guide", label: "촬영 가이드" },
    { key: "example", label: "예제" },
];

export default function Ready() {
  const [page, setPage] = useState(0);

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
        <motion.div
          className="flex-1 min-h-0 h-full w-full font-gmarket"
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
                <div className="glass flex flex-col h-full min-h-0 w-full rounded-2xl border border-[#FDFAF7]/10 overflow-hidden font-gmarket relative p-3">
                  <HologramOverlay />
                  <div className="flex flex-row gap-1.5 items-center shrink-0">
                    <img src={scanSmileyLight} className="w-6 h-6" alt="" />
                    <p className="text-base font-medium pt-1">예제</p>
                  </div>
                  <div className="flex flex-1 flex-col min-h-0 mt-2">
                    <div className="flex flex-1 items-center justify-center min-h-0">
                      <img src={beforeImage} className="h-full w-full object-cover rounded-xl bg-[#FDFAF7]/50 z-10" alt="예제" />
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

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
      </div>

      <div className="hidden md:block w-full h-[50vh]">
        <div className="flex flex-row gap-8 w-full h-full text-[#3D2E35]/75">
          <div className="glass flex flex-1 flex-col h-full font-gmarket rounded-2xl p-10 border border-[#FDFAF7]/10">
            <HologramOverlay />
            <div className="flex flex-row gap-1 items-center">
              <img src={scanSmileyLight} className="w-7 h-7" alt="" />
              <p className="text-xl font-medium pt-1">예제</p>
            </div>
            <div className="flex flex-1 items-center justify-center min-h-0">
              <img src={beforeImage} className="h-full w-full object-cover rounded-2xl bg-[#FDFAF7]/50 z-10" alt="예제" />
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
}
