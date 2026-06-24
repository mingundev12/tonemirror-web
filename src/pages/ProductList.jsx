export default function ProductList ({products,onSelect}){
return(
    <div className="">
        <h2 className="text-lg font-bold mb-8">등록된 상품 목록</h2>
    <table className="w-full mt-10 h-30 mb-24 border-t border-b border-gray-300">
        <thead>
            <tr className="text-gray-500">
                <th className="pb-6 font-normal w-1/4">브랜드</th>
                <th className="pb-6 font-normal w-1/4">상품명</th>
                <th className="pb-6 font-normal w-1/4">퍼스널 컬러</th>
                <th className="pb-6 font-normal text-center w-1/4">관리</th>
            </tr>
        </thead>
        <tbody>
            {products.map(p => (
                <tr key={p.id} className="border-t text-center">
                    <td className="py-4">{p.brand}</td>
                    <td className="py-4">{p.name}</td>
                    <td className="py-4">{p.personalColor}</td>
                    <td className="py-4">
                        <button onClick={() => onSelect(p)} className=" border px-4 py-1 rounded-full"
                            >
                            수정
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
   </div> 
    );
}