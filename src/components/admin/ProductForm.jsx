export default function ProductForm({
    product,
    isEditing,
    onChange,
    onSave,
    onDelete,
    onCancel,
    isLoading
}) {
 return(
    <div className=" p-6 rounded-lg ">
         <h2 className="text-lg font-bold  mb-10">
                    {isEditing ? "상품 정보 수정" : "신규 상품 등록"}
         </h2>

         <div className="grid grid-cols-4 gap-x-6 gap-y-10 mt-10">
            <div>
                <p className="mb-3 text-lg font-semibold">상품 브랜드</p>
                <input name="brand" value={product.brand} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:A브랜드" />
            </div>

            <div>
                <p className="mb-3 text-lg font-semibold">상품명</p>
                <input name="name" value={product.name} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:글로우틴트" />
            </div>

            <div>
                <p className="mb-3 text-lg font-semibold">색상코드</p>
                <input name="colorCode" value={product.colorCode} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:PK-21" />
            </div>

            <div>
                <p className="mb-3 text-lg font-semibold">색상명</p>
                <select name="colorName" value={product.colorName} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3">
                    <option>IVORY</option>
                    <option>Warm Vanilla</option>
                    <option>Sand Beige</option>
                </select>
            </div>
            <div>
                <p className="mb-3 text-lg font-semibold">추천 퍼스널 컬러</p>
                <select name="personalColor" value={product.personalColor} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3">
                    <option>SPRING WARM</option>
                    <option>SUMMER COOL</option>
                    <option>AUTUMN WARM</option>
                    <option>WINTER COOL</option>
                </select>
            </div>
            <div>
                <p className="mb-3 text-lg font-semibold">밝기호수</p>
                <input name="depth" value={product.depth} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:21호" />
            </div>

            <div>
                <p className="mb-3 text-lg font-semibold">HEX코드(자동)</p>
                <input name="hexCode" value={product.hexCode} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50" placeholder="#F0997B" />
            </div>

            <div>
                <p className="mb-3 text-lg font-semibold">RGB코드(자동)</p>
                <input name="rgbCode" value={product.rgbCode} onChange={onChange} className="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50" placeholder="240,153,123" />
            </div>

          </div>
           {/*수정 모드일 때는 [삭제/저장/취소],등록 모드일 때는 [등록] 버튼을 조건부 렌더링 */}
            <div className="flex justify-end items-center gap-6 mt-20 pb-4 w-full h-20">
                {isEditing ? (
                    <>
                        <button onClick={onDelete} disabled={isLoading} className="w-36 h-14 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center">삭제</button>
                        <button onClick={onSave} disabled={isLoading} className="w-36 h-14 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center">저장</button>
                        <button onClick={onCancel} 
                                disabled={isLoading} 
                                className="w-36 h-14 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center"
                        >취소</button>
                    </>
                ) : (
                    <button onClick={onSave} disabled={isLoading} className="w-36 h-14 border border-gray-300 rounded-4xl hover:bg-gray-50 font-extrabold flex items-center justify-center">
                            {isLoading ? "등록중" : "상품 등록"}
                    </button>
                    )}
                </div>    
            </div>
      );
}