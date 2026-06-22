import { motion } from "motion/react";

import SectionOne from "../components/home/SectionOne";
import Hero from "../components/home/Hero";

export default function Home() {

   return (
       <>  
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full h-full">
                <Hero />
                <SectionOne />
            </motion.div>
       </>
   )
}