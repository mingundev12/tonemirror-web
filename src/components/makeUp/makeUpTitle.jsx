import makeUpTitleConst from "../../data/makeup/makeUpTitleConst.json";

export default function MakeUpTitle({motion, SaveBtn, onSave}) {
   return (
       <>
            <div className="w-full flex flex-col md:grid md:grid-cols-3 items-center gap-4 md:gap-0">
                <div className="hidden md:block"></div>
                <div className="flex flex-col items-center text-center">
                    <p className="md:text-4xl text-3xl text-[#3D2E35] font-gmarket">{makeUpTitleConst.title}</p>
                    <p className="text-lg font-light text-[#3D2E35] font-gmarket md:text-nowrap md:whitespace-nowrap whitespace-pre-wrap">{makeUpTitleConst.description}</p>
                </div>
                {/* 버튼 */}
                <div className="justify-end md:flex hidden">
                    <SaveBtn motion={motion} onSave={onSave} />
                </div>
            </div>
       </>
   )
}