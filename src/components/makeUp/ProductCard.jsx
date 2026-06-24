export default function ProductCard({  userToneStatus, products }) {


    return (
        <div className="glass w-full h-full min-w-0 rounded-3xl p-8 border border-[#FDFAF7]/30 flex flex-col gap-4">
            <div>
                <p className="text-lg text-[#3D2E35] font-gmarket">파운데이션 추천</p>
                <p className="text-sm font-light text-[#3D2E35]/60 font-gmarket">{userToneStatus}톤에 맞춘 제품</p>
            </div>

            <div className="grid grid-cols-3 gap-4 flex-1">
                {products.map((item) => (
                    <div key={item.brand} className="flex items-center gap-4 rounded-2xl border border-[#FDFAF7]/30 p-4 flex-1 glass">
                        <div className="w-20 h-full rounded-xl shrink-0" style={{ background: item.swatch }} />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm tracking-wide text-[#3D2E35]/50 font-gmarket">{item.brandKor}</p>
                            <p className="text-[#3D2E35] text-xl font-gmarket">{item.name[0]} <br/> {item.name[1]}</p>
                            <div className="flex items-center gap-2">
                                <span className="font-light text-[#3D2E35]/50 font-gmarket">{item.shadeName} / {item.shade}호</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
