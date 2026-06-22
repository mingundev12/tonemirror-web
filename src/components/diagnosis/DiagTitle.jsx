export default function DiagTitle({diagStatus}) {
   return (
       <>
           <div className="md:text-4xl text-2xl">
                {diagStatus === "upload" ? (
                    <>
                        <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">얼굴 사진을 업로드해주세요.</p>
                        <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">본인 피부색과 가장 가까운 <br className="md:hidden block"/>  사진을 골라주세요.</p>
                    </>)
                : diagStatus === "analysis" ? (
                    <>
                        <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">분석 중 입니다.</p>
                        <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">피부톤과 컬러 데이터를 <br className="md:hidden block"/> 정밀하게 분석하고 있어요.</p>
                    </>)
                : diagStatus === "ready" ? (
                    <>
                        <p className="text-[#3D2E35] font-gmarket md:mb-0 mb-4">촬영 전 확인해주세요.</p>
                        <p className="text-base md:text-lg font-light text-[#3D2E35] font-gmarket mb-4 md:mb-0">정확한 진단을 위해 <br className="md:hidden block"/> 아래 사항을 확인해주세요.</p>
                    </>)
                : ""}
            </div>
       </>
   )
}