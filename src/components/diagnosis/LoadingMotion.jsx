import BlobGradient from "../common/BlobGradient";
export default function LoadingMotion({motion}) {

   return (
       <>
           <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                transition={{ scale: { type: "spring", stiffness: 100, damping: 10 } }}
                className="relative w-20 h-20 md:w-30 md:h-30 shrink-0"
            >
                <div className="relative w-full h-full animate-[spin_10s_linear_infinite]">
                    <div className="relative w-full h-full aspect-square rounded-full overflow-hidden">
                        <BlobGradient />
                        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "inset 0 0 20px 5px rgba(255,255,255,0.75)" }} />
                    </div>
                    <div className="absolute inset-0 translate-y-0 scale-110 rounded-full overflow-hidden blur-xl opacity-85 -z-10">
                        <BlobGradient />
                    </div>
                </div>
            </motion.div>
       </>
   )
}