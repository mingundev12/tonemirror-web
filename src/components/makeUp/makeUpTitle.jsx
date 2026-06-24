
export default function MakeUpTitle({motion, SaveBtn}) {
   return (
       <>
            <div className="md:grid md:grid-cols-3 flex flex-col items-center">
                <div className="hidden md:block"></div>
                <div>
                    <p className="md:text-4xl text-3xl text-center text-[#3D2E35] font-gmarket">가상 메이크업</p>
                    <p className="text-lg text-center font-light text-[#3D2E35] font-gmarket">퍼스널 컬러 진단 결과를 바탕으로 <br className="md:hidden block" /> 가상 메이크업을 비교해보세요.</p>
                </div>
                {/* 버튼 */}
                <div className="justify-end md:flex hidden">
                    <SaveBtn motion={motion} />
                </div>
            </div>
       </>
   )
}