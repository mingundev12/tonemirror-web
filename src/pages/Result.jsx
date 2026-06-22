import { useEffect, useState } from "react";
import BlobGradient from "../components/BlobGradient";
import ResultRight from "../components/ResultRight";
import ResultLeft from "../components/ResultLeft";
import { motion } from "motion/react";
import Lenis from "lenis";
import ResultLeftBtn from "../components/ResultLeftBtn";

export default function Result({userToneStatus, userSkinTone}) {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
    
        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
    
        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, []);

    const [personalColor, setPersonalColor] = useState([
        {id: 0, kor: "웜 스프링" , eng: "Warm Spring",
            description: "부드럽고 차분한 색조가 당신의 섬세함을 드러냅니다. 라벤더와 로즈 뮤트 톤이 피부를 한층 맑고 우아하게 표현합니다.",
            bestColor: [["파스텔 피치", "#FFD1BA"], ["라이트 코랄", "#FF8E7A"], ["밀키 바나나", "#FFF4A3"], ["애플 그린", "#B2EBF2"], ["골든 허니", "#F5D061"]],
            worstColor: [["로얄 블루", "#4169E1"], ["다크 초콜릿", "#3D2314"], ["차콜 그레이", "#464646"], ["마젠타 핑크", "#FF007F"], ["퓨어 화이트", "#FFFFFF"]],
            bestTip: "밝고 노란 기가 있는 따뜻한 톤과 채도가 높은 맑은 색이 피부를 생기있게 만들어요.",
            worstTip: "차갑고 어둡거나 탁한 색은 피부색을 칙칙하고 그늘져 보이게 만들어요."
        },

        {id: 1, kor: "쿨 섬머" , eng: "Cool Summer",
            description: "깊고 풍성한 어스 톤이 당신의 매력을 완성합니다. 테라코타와 머스터드, 올리브 컬러가 피부에 원숙한 온기를 더합니다.",
            bestColor: [["라벤더", "#E6E6FA"], ["스카이 블루", "#87CEEB"], ["소프트 로즈", "#FFC0CB"], ["민트 코코아", "#BACBB6"], ["파우더 핑크", "#FFD1DC"]],
            worstColor: [["카키 브라운", "#4B5320"], ["머스터드 옐로우", "#E1AD01"], ["오렌지 레드", "#FF4500"], ["딥 버건디", "#800020"], ["카멜", "#C19A6B"]],
            bestTip: "붉은 기가 적고 밝은 부드러운 톤이 피부색을 투명하게 만들어요, 부드럽고 차분한 파스텔 톤을 고르세요.",
            worstTip: "노란 기가 강한 웜톤 컬러나 너무 탁하고 무거운 색은 피부를 누렇게 뜨게 만들어요."
        },
        {id: 2, kor: "웜 어텀" , eng: "Warm Autumn",
            description: "차고 선명한 색조가 피부를 가장 빛나게 합니다. 블루베이스 딥 컬러와 순수한 화이트가 당신의 존재감을 선명하게 각인시킵니다.",
            bestColor: [["올리브 그린", "#6B8E23"], ["테라코타", "#E2725B"], ["머스터드", "#E1AD01"], ["웜 베이지", "#E6D7C3"], ["딥 브릭 레드", "#7C0A1A"]],
            worstColor: [["네온 핑크", "#FF6EC7"], ["스카이 블루", "#87CEEB"], ["라벤더", "#E6E6FA"], ["퓨어 화이트", "#FFFFFF"], ["네이비 블루", "#000080"]],
            bestTip: "깊고 차분한 음영감과 강한 노란 기, 높은 풍부함이 어우러져 고급스럽고 세련된 분위기를 줍니다.",
            worstTip: "차갑고 푸른 기가 도는 쿨톤 파스텔 색상이나 네온 컬러는 피부를 질려 보이게 만듭니다."
        },
        {id: 3, kor: "쿨 윈터" , eng: "Cool Winter",
            description: "따뜻하고 생기 있는 색조가 당신을 빛나게 합니다. 복숭아빛 코랄과 황금빛 베이지가 피부에 자연스러운 광채를 더해줍니다.",
            bestColor: [["퓨어 블랙", "#000000"], ["로얄 블루", "#4169E1"], ["마젠타", "#FF00FF"], ["에메랄드 그린", "#50C878"], ["아이스 바이올렛", "#E0B0FF"]],
            worstColor: [["골드 베이지", "#F5F5DC"], ["오렌지", "#FFA500"], ["카멜 브라운", "#C19A6B"], ["파스텔 피치", "#FFD1BA"], ["모스 그린", "#8A9A86"]],
            bestTip: "선명하고 강렬한 대비가 잘 어울리는 톤입니다. 어둡거나 푸른 기가 도는 선명한 색을 고르세요.",
            worstTip: "따뜻하고 에너지가 빠진 미지근한 오렌지, 카멜 톤은 겨울 쿨톤 특유의 모던함을 해치고 답답해 보입니다."
        },
    ])

    const personalColorData =
        userToneStatus === "Warm Spring" ?personalColor[0]
        : userToneStatus === "Cool Summer" ? personalColor[1]
        : userToneStatus === "Warm Autumn" ? personalColor[2]
        : userToneStatus === "Cool Winter" ? personalColor[3]
        : null;

   return (
       <>   
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                <div className="absolute w-full h-screen opacity-30 -z-50">
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1 pointer-events-none" />
                    <div className="absolute w-full h-[100%] bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1 pointer-events-none" />
                    <BlobGradient />
                </div>

                <div className="w-full md:h-screen h-full relative z-50">
                    <div className="absolute mx-[10%] h-full flex flex-col mt-30 md:mt-0 md:justify-center gap-10 z-[100]">
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10">

                            <ResultLeft personalColorData={personalColorData} />

                            <motion.div
                                initial={{ y: 200 }}
                                animate={{ y: 0}}
                                transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                                className="md:block hidden"
                            >
                                <ResultRight personalColorData={personalColorData} userSkinTone={userSkinTone} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 300 }}
                                whileInView={{ opacity: 1, y: 0}}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, ease: "easeInOut", type: "spring", damping: 20, stiffness: 100}}
                                className="md:hidden block"
                            >
                                <ResultRight personalColorData={personalColorData} userSkinTone={userSkinTone} />
                            </motion.div>

                            <div className="md:hidden block">
                                <ResultLeftBtn />
                            </div>
                        </div>
                    </div>
                </div>
                
            </motion.div>
       </>
   )
}