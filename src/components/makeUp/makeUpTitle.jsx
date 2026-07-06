import makeUpTitleConst from "../../data/makeup/makeUpTitleConst.json";

export default function MakeUpTitle({motion, SaveBtn, onSave}) {
   return (
       <>
            {/* 버튼 */}
            <div className="justify-end md:flex hidden">
                <SaveBtn motion={motion} onSave={onSave} />
            </div>
       </>
   )
}