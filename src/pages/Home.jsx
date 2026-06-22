import { useEffect } from "react";
import SectionOne from "../components/SectionOne";
import Hero from "../components/Hero";
import Lenis from "lenis";
import { motion } from "motion/react";

export default function Home() {

    useEffect(() => {
        // 최신 패키지('lenis') 기준 공식 초기화
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
            cancelAnimationFrame(rafId); // RAF까지 확실하게 클린업 해주면 완벽합니다.
        };
    }, []);

   return (
       <>   
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full h-full">
                <Hero />
                <SectionOne />
            </motion.div>
       </>
   )
}