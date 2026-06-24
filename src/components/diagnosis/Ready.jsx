import beforeImage from "../../assets/modelHead4.png";
import scanSmileyLight from "../../assets/img/scan-smiley-light.svg";
import angleLight from "../../assets/img/angle-light.svg";
import lightbulbFilamentLight from "../../assets/img/lightbulb-filament-light.svg";
import imageSquare from "../../assets/img/image-square.svg";

import guideSections from "../../data/diagnosis/guideSections.json";

import HologramOverlay from "../common/HologramOverlay";
import PictureDesktop from "./PictureDesktop";
import PictureMobile from "./PictureMobile";

export default function Ready() {
  const ICONS = {
    "image-square": imageSquare,
    "angle-light": angleLight,
    "lightbulb-filament-light": lightbulbFilamentLight,
  };
  
  const GUIDE_SECTIONS = guideSections.map((item) => ({
    ...item,
    icon: ICONS[item.icon],
  }));


  return (
    <>
      <PictureMobile
        HologramOverlay={HologramOverlay} 
        scanSmileyLight={scanSmileyLight} 
        beforeImage={beforeImage} 
        GUIDE_SECTIONS={GUIDE_SECTIONS} 
      />

      <PictureDesktop
        HologramOverlay={HologramOverlay} 
        scanSmileyLight={scanSmileyLight} 
        beforeImage={beforeImage} 
        GUIDE_SECTIONS={GUIDE_SECTIONS}
      />
    </>
  );
}
