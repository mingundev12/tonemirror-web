import downloadSimpleLight from "../../assets/img/download-simple-light.svg";
import saveBtnConst from "../../data/makeup/saveBtnConst.json";

export default function SaveBtn({motion, onSave}) {
   return (
       <>
           <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                transition={{ duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100}}
                className="font-medium text-sm text-[#FDFAF7] bg-[#3D2E35] flex flex-row gap-2 items-center justify-end rounded-full w-fit px-10 py-4 cursor-pointer" type="button" onClick={onSave}>
                <img src={downloadSimpleLight} className="w-5 h-5" />
                <p className="font-light pt-1 font-gmarket">{saveBtnConst}</p>
            </motion.button>
       </>
   )
}