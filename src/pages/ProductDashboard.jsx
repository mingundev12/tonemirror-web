import { useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast';

const INIT = {
   id:null,
   brand: "",
   name: "",
   colorCode: "",
   colorName: "IVORY",
   personalColor: "SPRING WARM",
   depth: "",
   rgbCode: "",
   hexCode: ""
}
export default function ProductDashboard() {
    const [isLoading,setIsLoading] = useState(false); 
    const [products, setProducts] = useState([
        {
            id:1,
            brand:"헤라",
            name:"파운데이션",
            colorCode:"PK-21",
            colorName:"IVORY",
            personalColor:"SPRING WARM",
            depth:"21호",
            rgbCode:"",
            hexCode:""
        }
    ]);

    const [product, setProduct] = useState(INIT); 
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/analysis/list"); 
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);  
                }
            }catch (error) {
                console.error("상품 목록 로딩 실패:",error);
            }
          };
          fetchProducts();
        },[]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    }; 

    const handleSelectProduct = (selected) => {
        setProduct(selected);
        setIsEditing(true);

    }; 

    const handleCreate = async () => {
        if (isLoading) return; 
        
        if(!product.brand.trim() || !product.name.trim()) {
            toast.error("브랜드와 상품명을 모두 입력해주세요");
            return;
        }

        setIsLoading(true); // 로딩 시작 
        try {    
            const res = await fetch('/api/analysis/save',{ 
               method:'POST',    
               headers:{'Content-Type': 'application/json'},
               body:JSON.stringify(product)
            });
            
            if(!res.ok) throw new Error("서버 응답 오류");
            const saveData = await res.json();
            // 성공시 
            setProducts((prev) => [
                ...prev, 
                {...product, id:saveData.id}
            ]); 
            setProduct(INIT);
            toast.success("등록되었습니다");
        } catch (error) {
            toast.error("등록에 실패했습니다 다시 시도해 주세요");
        }finally {
            setIsLoading(false); 
        }
    };
    const handleUpdate = async () => { 
      try {
        const res = await fetch(`/api/analysis/${product.id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(product)
      });
      if(res.ok){
        toast.success("수정되었습니다");
        setProducts((prev) =>
            prev.map((p) => (p.id === product.id ? product : p)) 
        );
        setProduct(INIT);
        setIsEditing(false);
      }else {
        toast.error("수정 실패했습니다");
      }
    }catch(error){
        toast.error("서버오류:잠시 후 다시 시도해주세요");
    }finally {
        setIsLoading(false);
    }
    }; 

    const handleDelete = async () => { 
        if(!window.confirm("삭제 하시겠습니까?")) return; 
        try {
            const res = await fetch(`/api/analysis/${product.id}`,{
                method:"DELETE",
            });
            if (res.ok) {
            setProducts((prev) => prev.filter((p) => p.id !== product.id)); 
            setIsEditing(false);
            setProduct(INIT);
            toast.success("삭제되었습니다"); 
            }else{
                toast.error("삭제 실패했습니다");
            }        
        } catch (error) {
            toast.error("서버 오류:잠시 후 다시 시도해주세요");
        }finally{
            setIsLoading(false);
        }
    };
    return (

        <div className="fixed inset-0 flex items-center justify-center gap-15 bg-gradient-to-br from-[#FFD1C9] via-[#FFF9F9] to-[#A8EDEA] p-8">
            <Toaster toastOptions={{duration:2000}}/>
            <div className="w-full max-w-5xl flex flex-col gap-10">

                <h1 className="font-bold mb-12 text-2xl ">상품등록/수정</h1>
                <h2 className="text-lg font-bold mb-12 ">등록된 상품 목록</h2>                    
                <table className="w-full h-30 mb-24 border-t border-b border-gray-300">

                    <thead>
                        <tr className="text-center text-gray-500 h-10">
                            <th className="pb-6 font-normal w-1/4">브랜드</th>
                            <th className="pb-6 font-normal w-1/4">상품명</th>
                            <th className="pb-6 font-normal w-1/4">퍼스널 컬러</th>
                            <th className="pb-6 font-normal text-center w-1/4">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (

                            <tr key={p.id} className="border-t border-gray-200 ">

                                <td className="py-6">{p.brand}</td>
                                <td className="py-6">{p.name}</td>
                                <td className="py-6">{p.personalColor}</td>
                                <td className="py-6 text-center">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => handleSelectProduct(p)}
                                            className="w-24 h-10 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center mx-auto "
                                        >
                                        수정
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

                {/* 신규 상품 등록 / 수정 */}
                          
                <h2 className="text-lg font-bold  mb-10">
                    {isEditing ? "상품 정보 수정" : "신규 상품 등록"}
                </h2>

                <div className="grid grid-cols-4 gap-x-6 gap-y-10 mt-10">

                    <div>
                        <p className="mb-3 text-lg font-semibold">상품 브랜드</p>
                        <input name="brand" value={product.brand} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:A브랜드" />
                    </div>

                    <div>
                        <p className="mb-3 text-lg font-semibold">상품명</p>
                        <input name="name" value={product.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:글로우틴트" />
                    </div>

                    <div>
                        <p className="mb-3 text-lg font-semibold">색상코드</p>
                        <input name="colorCode" value={product.colorCode} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:PK-21" />
                    </div>

                    <div>

                        <p className="mb-3 text-lg font-semibold">색상명</p>

                        <select name="colorName" value={product.colorName} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3">
                            <option>IVORY</option>
                            <option>Warm Vanilla</option>
                            <option>Sand Beige</option>
                        </select>
                    </div>

                    <div>
                        <p className="mb-3 text-lg font-semibold">추천 퍼스널 컬러</p>
                        <select name="personalColor" value={product.personalColor} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3">
                            <option>SPRING WARM</option>
                            <option>SUMMER COOL</option>
                            <option>AUTUMN WARM</option>
                            <option>WINTER COOL</option>
                        </select>

                    </div>

                    <div>
                        <p className="mb-3 text-lg font-semibold">밝기호수</p>
                        <input name="depth" value={product.depth} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3" placeholder="예:21호" />
                    </div>

                    <div>
                        <p className="mb-3 text-lg font-semibold">HEX코드(자동)</p>
                        <input name="hexCode" value={product.hexCode} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50" placeholder="#F0997B" />
                    </div>

                    <div>
                        <p className="mb-3 text-lg font-semibold">RGB코드(자동)</p>
                        <input name="rgbCode" value={product.rgbCode} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50" placeholder="240,153,123" />
                    </div>

                </div>

                <div className="flex justify-end items-center gap-6 mt-20 pb-4 w-full h-20">

                    {isEditing ? (
                        <>
                            <button onClick={handleDelete} disabled={isLoading} className="w-36 h-14 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center">삭제</button>
                            <button onClick={handleUpdate} disabled={isLoading} className="w-36 h-14 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center">저장</button>
                            <button onClick={() =>{ setIsEditing(false); setProduct(INIT);}} 
                                    disabled={isLoading} 
                                    className="w-36 h-14 border border-gray-300 rounded-3xl hover:bg-gray-50 font-extrabold flex items-center justify-center"
                                    >취소</button>
                        </>

                    ) : (
                        <button onClick={handleCreate} disabled={isLoading} className="w-36 h-14 border border-gray-300 rounded-4xl hover:bg-gray-50 font-extrabold flex items-center justify-center"
                        >
                            {isLoading ? "등록중" : "상품 등록"}
                        </button>
                        
                    )}

                </div>

            </div>

        </div>

    );

}