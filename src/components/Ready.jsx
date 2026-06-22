import beforeImage from "../assets/modelHead4.png";
import angleLight from "../assets/img/angle-light.svg";
import lightbulbFilamentLight from "../assets/img/lightbulb-filament-light.svg";
import scanSmileyLight from "../assets/img/scan-smiley-light.svg";
import imageSquare from "../assets/img/image-square.svg";
import HologramOverlay from "./HologramOverlay";

export default function Ready() {
   return (
       <>
        <div className="w-full h-[50vh]">
            <div className="flex gap-8 w-full h-full text-[#3D2E35]/75">

                <div className="glass flex flex-1 flex-col h-full font-gmarket rounded-2xl p-10 border border-[#FDFAF7]/10">
                    <HologramOverlay />
                    <div className="flex flex-row gap-1 items-center">
                        <img src={scanSmileyLight} className="w-7 h-7" />
                        <p className="text-xl font-medium pt-1">예제</p>
                    </div>
                    <div className="flex flex-1 items-center justify-center min-h-0">
                        <img src={beforeImage} className="h-full w-full object-cover rounded-2xl bg-[#FDFAF7]/50 z-10" />
                    </div>
                </div>

                <div className="glass flex flex-1 flex-col gap-10 font-gmarket rounded-2xl h-full p-10 border border-[#FDFAF7]/10">
                    <HologramOverlay />
                    <div className="flex flex-row gap-1 items-center">
                        <img src={imageSquare} className="w-7 h-7" />
                        <p className="text-xl font-medium pt-1">사진</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4 text-[#3D2E35]/75">
                        <li className="font-light">핸드폰 카메라 기본 비율(9:16)로 촬영해주세요.</li>
                        <li className="font-light">필터 없는 사진으로 준비해주세요.</li>
                        <li className="font-light">화장은 최대한 지운 상태가 정확해요.</li>
                        <li className="font-light">머리카락이 얼굴을 가리지 않게 해주세요.</li>
                        <li className="font-light">안경, 액세서리는 빼주세요.</li>
                    </div>
                </div>

                <div className="glass flex flex-1 flex-col gap-10 font-gmarket rounded-2xl h-full p-10 border border-[#FDFAF7]/10">
                    <HologramOverlay />
                    <div className="flex flex-row gap-1 items-center">
                        <img src={angleLight} className="w-7 h-7" />
                        <p className="text-xl font-medium pt-1">구도</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4 text-[#3D2E35]/75">
                        <li className="font-light">정면을 바라보고 촬영해주세요.</li>
                        <li className="font-light">얼굴 전체가 프레임 안에 들어오게 해주세요.</li>
                        <li className="font-light">배경은 흰색이나 단색이 좋습니다.</li>
                    </div>
                </div>

                <div className="glass flex flex-1 flex-col gap-10 font-gmarket rounded-2xl h-full p-10 border border-[#FDFAF7]/10">
                    <HologramOverlay />
                    <div className="flex flex-row gap-1 items-center">
                        <img src={lightbulbFilamentLight} className="w-7 h-7" />
                        <p className="text-xl font-medium pt-1">조명</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4 text-[#3D2E35]/75">
                        <li className="font-light">자연광이나 밝은 조명 아래서 촬영해주세요.</li>
                        <li className="font-light">역광이나 그림자가 지는 환경은 피해주세요.</li>
                        <li className="font-light">노란빛 조명은 분석 정확도를 떨어뜨릴 수 있어요.</li>
                    </div>
                </div>
                

            </div>
        </div>
       </>
   )
}