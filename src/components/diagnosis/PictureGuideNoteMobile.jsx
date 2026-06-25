import angleLight from "../../assets/img/angle-light.svg";
import lightbulbFilamentLight from "../../assets/img/lightbulb-filament-light.svg";
import imageSquare from "../../assets/img/image-square.svg";

import guideSections from "../../data/diagnosis/guideSections.json";
import readyConst from "../../data/diagnosis/readyConst.json";

const ICONS = {
  "image-square": imageSquare,
  "angle-light": angleLight,
  "lightbulb-filament-light": lightbulbFilamentLight,
};

export default function PictureGuideNoteMobile({ HologramOverlay }) {
  return (
    <>
      <div className="glass flex flex-col h-full min-h-0 w-full min-w-0 rounded-2xl border border-[#FDFAF7]/10 font-gmarket relative p-3">
        
        <HologramOverlay />

        <div className="flex flex-row gap-1.5 items-center shrink-0">
          <p className="text-base font-medium pt-1">{readyConst[1]}</p>
        </div>

        <div className="flex flex-1 flex-col min-h-0 mt-4 justify-between">
          {guideSections.map((item) => (
            <section key={item.title} className="shrink-0">
              <div className="flex flex-row gap-1.5 items-center mb-2.5">
                <img src={ICONS[item.icons]} className="w-5 h-5"/>
                <p className="text-sm font-medium pt-0.5">{item.title}</p>
              </div>
              <ul className="flex flex-col gap-2 ml-3 text-sm leading-snug text-[#3D2E35]/75 break-words">
                {item.text.map((item) => (
                  <li key={item} className="font-light min-w-0">{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
