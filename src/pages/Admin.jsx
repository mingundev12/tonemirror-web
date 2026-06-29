import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";

import BlobGradient from "../components/common/BlobGradient";
import foundationProducts from "../data/makeup/foundationProducts.json";

const PERSONAL_COLORS = Object.keys(foundationProducts);

// 관리자 인증 헤더 (모든 상품 API 요청에 첨부)
const authHeader = () => ({ Authorization: `Bearer ${sessionStorage.getItem("admin_token")}` });

// 상품 입력 폼 초기값 (foundationProducts.json 스키마)
const INIT = {
    id: null,
    brand: "",
    brandName: "",
    name: "",
    shadeName: "",
    shade: "",
    swatch: "",
    personalColor: PERSONAL_COLORS[0],
};

// 폼 필드 메타데이터 (반복문 렌더링용)
const FORM_FIELDS = [
    { name: "brand", label: "브랜드 (영문)", type: "input", placeholder: "예) HERA" },
    { name: "brandName", label: "브랜드 (한글)", type: "input", placeholder: "예) 헤라" },
    { name: "name", label: "상품명", type: "input", placeholder: "예) 실키 스테이 24H 롱웨어 파운데이션" },
    { name: "shadeName", label: "색상명", type: "input", placeholder: "예) 21W1 (Warm Vanilla)" },
    { name: "shade", label: "호수", type: "input", placeholder: "예) 21" },
    { name: "swatch", label: "스와치 HEX", type: "input", placeholder: "#FBD5AE" },
    { name: "personalColor", label: "추천 퍼스널 컬러", type: "select", options: PERSONAL_COLORS },
];

// 공통 모션 트랜지션 (다른 페이지 톤과 동일)
const SPRING = { duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100 };

export default function Admin() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState(INIT);
    const [isEditing, setIsEditing] = useState(false);

    // 상품 목록 불러오기
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/analysis/list", { headers: { ...authHeader() } });
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("상품 목록 로딩 실패:", error);
            }
        };
        fetchProducts();
    }, []);

    // 입력 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    // 목록에서 상품 선택 → 수정 모드 진입
    const handleSelectProduct = (selected) => {
        setProduct(selected);
        setIsEditing(true);
    };

    // 신규 등록
    const handleCreate = async () => {
        if (isLoading) return;

        if (!product.brand.trim() || !product.brandName.trim() || !product.name.trim()) {
            toast.error("브랜드, 브랜드명(한글), 상품명을 모두 입력해주세요");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/analysis/save", {
                method: "POST",
                headers: { "Content-Type": "application/json", ...authHeader() },
                body: JSON.stringify(product),
            });

            if (!res.ok) throw new Error("서버 응답 오류");
            const saveData = await res.json();

            setProducts((prev) => [...prev, { ...product, id: saveData.id }]);
            setProduct(INIT);
            toast.success("등록되었습니다");
        } catch {
            toast.error("등록에 실패했습니다 다시 시도해 주세요");
        } finally {
            setIsLoading(false);
        }
    };

    // 수정
    const handleUpdate = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/analysis/${product.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", ...authHeader() },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
                setProduct(INIT);
                setIsEditing(false);
                toast.success("수정되었습니다");
            } else {
                toast.error("수정 실패했습니다");
            }
        } catch {
            toast.error("서버 오류: 잠시 후 다시 시도해주세요");
        } finally {
            setIsLoading(false);
        }
    };

    // 삭제
    const handleDelete = async () => {
        if (isLoading) return;
        if (!window.confirm("삭제 하시겠습니까?")) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/analysis/${product.id}`, {
                method: "DELETE",
                headers: { ...authHeader() },
            });

            if (res.ok) {
                setProducts((prev) => prev.filter((p) => p.id !== product.id));
                setProduct(INIT);
                setIsEditing(false);
                toast.success("삭제되었습니다");
            } else {
                toast.error("삭제 실패했습니다");
            }
        } catch {
            toast.error("서버 오류: 잠시 후 다시 시도해주세요");
        } finally {
            setIsLoading(false);
        }
    };

    // 로그아웃 (토큰 제거 후 로그인 페이지로)
    const handleLogout = () => {
        sessionStorage.removeItem("admin_token");
        navigate("/adminLogin", { replace: true });
    };

    return (
        <div className="relative w-full min-h-dvh bg-[#FDFAF7]">

            {/* 배경 */}
            <div className="absolute inset-0 min-h-full pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1" />
                <div className="absolute inset-0 opacity-30">
                    <BlobGradient />
                </div>
            </div>

            {/* 컨텐츠 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 mx-[10%] pt-30 pb-24 flex flex-col gap-16"
            >

                {/* 타이틀 */}
                <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-gmarket text-xs tracking-[0.25em] text-[#3D2E35]/50">ADMIN</p>
                        <h1 className="font-rebecca text-3xl md:text-4xl font-light text-[#3D2E35]">상품 등록 / 수정</h1>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05, opacity: 1 }}
                        transition={SPRING}
                        onClick={handleLogout}
                        className="font-gmarket font-light text-sm text-[#3D2E35] border border-[#3D2E35] opacity-50 rounded-full px-6 py-2 cursor-pointer shrink-0"
                    >
                        로그아웃
                    </motion.button>
                </div>

                {/* 등록된 상품 목록 */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-gmarket text-sm tracking-wider text-[#3D2E35]">등록된 상품 목록</h2>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-gmarket text-xs tracking-wider text-[#3D2E35]/50 border-b border-[#3D2E35]/10">
                                <th className="font-light text-left pb-4">브랜드</th>
                                <th className="font-light text-left pb-4">상품명</th>
                                <th className="font-light text-left pb-4">색상명</th>
                                <th className="font-light text-left pb-4">퍼스널 컬러</th>
                                <th className="font-light text-right pb-4">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="font-gmarket text-sm text-[#3D2E35] border-b border-[#3D2E35]/5">
                                    <td className="py-5">{p.brandName ?? p.brand}</td>
                                    <td className="py-5 whitespace-pre-line">{p.name}</td>
                                    <td className="py-5">{p.shadeName ?? p.colorName}</td>
                                    <td className="py-5">{p.personalColor}</td>
                                    <td className="py-5 text-right">
                                        <motion.button
                                            whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                                            transition={SPRING}
                                            onClick={() => handleSelectProduct(p)}
                                            className="font-light text-[#FDFAF7] bg-[#3D2E35] rounded-full px-6 py-2 cursor-pointer"
                                        >
                                            수정
                                        </motion.button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 신규 등록 / 수정 폼 */}
                <div className="flex flex-col gap-8">
                    <h2 className="font-gmarket text-sm tracking-wider text-[#3D2E35]">
                        {isEditing ? "상품 정보 수정" : "신규 상품 등록"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
                        {FORM_FIELDS.map((field) => (
                            <div key={field.name} className="flex flex-col gap-2">
                                <p className="font-gmarket text-xs tracking-wider text-[#3D2E35]/50">{field.label}</p>

                                {field.type === "select" ? (
                                    <select
                                        name={field.name}
                                        value={product[field.name] ?? ""}
                                        onChange={handleChange}
                                        className="font-gmarket text-sm text-[#3D2E35] bg-white/50 border border-[#3D2E35]/15 rounded-xl px-4 py-3 outline-none focus:border-[#3D2E35]/40 transition-colors"
                                    >
                                        {field.options.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        name={field.name}
                                        value={product[field.name] ?? ""}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        className="font-gmarket text-sm text-[#3D2E35] bg-white/50 border border-[#3D2E35]/15 rounded-xl px-4 py-3 outline-none focus:border-[#3D2E35]/40 transition-colors placeholder:text-[#3D2E35]/30"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 액션 버튼 */}
                    <div className={`flex items-center gap-3 mt-4 ${isEditing ? "justify-end" : "justify-center"}`}>
                        {isEditing ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05, opacity: 1 }}
                                    transition={SPRING}
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                    className="font-gmarket font-light text-sm text-[#3D2E35] border border-[#3D2E35] opacity-50 rounded-full px-8 py-3 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    삭제
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, opacity: 1 }}
                                    transition={SPRING}
                                    onClick={() => { setIsEditing(false); setProduct(INIT); }}
                                    disabled={isLoading}
                                    className="font-gmarket font-light text-sm text-[#3D2E35] border border-[#3D2E35] opacity-50 rounded-full px-8 py-3 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    취소
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                                    transition={SPRING}
                                    onClick={handleUpdate}
                                    disabled={isLoading}
                                    className="font-gmarket font-light text-sm text-[#FDFAF7] bg-[#3D2E35] rounded-full px-8 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "저장중" : "저장"}
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                                transition={SPRING}
                                onClick={handleCreate}
                                disabled={isLoading}
                                className="font-gmarket font-light text-sm text-[#FDFAF7] bg-[#3D2E35] rounded-full px-8 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "등록중" : "상품 등록"}
                            </motion.button>
                        )}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
