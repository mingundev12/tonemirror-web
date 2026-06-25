import angleLight from "../../assets/img/angle-light.svg";
import lightbulbFilamentLight from "../../assets/img/lightbulb-filament-light.svg";
import imageSquare from "../../assets/img/image-square.svg";

import guideSections from "../../data/diagnosis/guideSections.json";

const ICONS = {
  "image-square": imageSquare,
  "angle-light": angleLight,
  "lightbulb-filament-light": lightbulbFilamentLight,
};

export default function PictureGuideNoteDesktop({ HologramOverlay }) {
  return (
    <>
      {guideSections.map((item) => (
        <div key={item.title} className="glass flex flex-1 flex-col gap-10 font-gmarket rounded-2xl h-full p-10 border border-[#FDFAF7]/10">
          <HologramOverlay />

          <div className="flex flex-row gap-1 items-center">
            <img src={ICONS[item.icons]} className="w-7 h-7"/>
            <p className="text-xl font-medium pt-1">{item.title}</p>
          </div>

          <ul className="flex flex-col gap-2 ml-4">
            {item.text.map((item) => (
              <li key={item} className="font-light">{item}</li>
            ))}
          </ul>

        </div>
      ))}
    </>
  );
}
