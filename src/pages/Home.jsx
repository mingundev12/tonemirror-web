import { motion } from "motion/react";

import BlobGradient from "../components/common/BlobGradient";
import SectionOne from "../components/home/SectionOne";
import Hero from "../components/home/Hero";
import Footer from "../components/common/Footer";

export default function Home() {

   return (
       <>  
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full h-full">
                <Hero />
                <div className="relative w-full bg-[#FDFAF7]">
                    <div className="absolute inset-0 min-h-full pointer-events-none">
                        <div className="absolute inset-0 opacity-30">
                            <BlobGradient />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <SectionOne />
                        <Footer />
                    </div>
                </div>
            </motion.div>
       </>
   )
}
