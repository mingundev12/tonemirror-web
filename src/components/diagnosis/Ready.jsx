import beforeImage from "../../assets/modelHead4.png";
import scanSmileyLight from "../../assets/img/scan-smiley-light.svg";

import HologramOverlay from "../common/HologramOverlay";
import PictureDesktop from "./PictureDesktop";
import PictureMobile from "./PictureMobile";

export default function Ready() {
  return (
    <>
      <PictureMobile
        HologramOverlay={HologramOverlay}
        scanSmileyLight={scanSmileyLight}
        beforeImage={beforeImage}
      />

      <PictureDesktop
        HologramOverlay={HologramOverlay}
        scanSmileyLight={scanSmileyLight}
        beforeImage={beforeImage}
      />
    </>
  );
}
