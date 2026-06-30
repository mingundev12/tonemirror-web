import HalfMakeupCard from "./HalfMakeupCard";
import ProductCard from "./ProductCard";

export default function MakeUpContent({motion, products, userToneStatus, beforeSrc, afterSrc, isRecoloring, onSelectFoundation}) {
   return (
       <>
           <div className="flex md:flex-row flex-col md:items-stretch items-stretch gap-5 w-full h-auto md:h-[60%]">
                {/* 메이크업 비교 (before: 업로드 원본 / after: 서버 합성 이미지) */}
                <motion.div className="w-full h-auto md:w-auto shrink-0 md:h-full" initial={{ y: 200, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.1, delay: 0.1, ease: "easeInOut", type: "spring", damping: 10, stiffness: 50}}>
                    <HalfMakeupCard beforeSrc={beforeSrc} afterSrc={afterSrc} isRecoloring={isRecoloring} />
                </motion.div>

                {/* 제품 추천 (클릭 시 해당 색으로 재합성) */}
                <motion.div className="w-full h-auto md:h-full flex-1 min-w-0" initial={{ y: 200, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.1, delay: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 50}}>
                    <ProductCard products={products} userToneStatus={userToneStatus} onSelect={onSelectFoundation} isRecoloring={isRecoloring} />
                </motion.div>
            </div>
       </>
   )
}
