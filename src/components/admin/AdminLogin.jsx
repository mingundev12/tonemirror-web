import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BlobGradient from "../common/BlobGradient";

// input 필드 메타데이터 (반복문 렌더링용)
const FIELDS = [
    { id: "id", label: "아이디", type: "text", placeholder: "관리자 아이디" },
    { id: "password", label: "비밀번호", type: "password", placeholder: "비밀번호" },
];

const SPRING = { duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100 };

export default function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ id: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // input 변경 핸들러
    const handleChange = (value, id) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (error) setError("");
    };

    // 로그인 버튼 클릭 (API 통신 및 예외 처리)
    const onClickLogin = async () => {
        if (isLoading) return;

        if (!formData.id || !formData.password) {
            setError("아이디와 비밀번호를 모두 입력해주세요");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post("/api/admin/login", {
                id: formData.id,
                password: formData.password,
            });

            if (res.data.token) {
                sessionStorage.setItem("admin_token", res.data.token);
                toast.success("로그인 성공");
                navigate("/admin");
            } else {
                setError(res.data.msg || "로그인 실패했습니다");
            }
        } catch {
            setError("서버 연결 실패. 아이디/비밀번호가 일치하지 않습니다");
        } finally {
            setIsLoading(false);
        }
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
                className="relative z-10 min-h-dvh flex items-center justify-center px-[10%] py-24"
            >
                <div className="glass rounded-2xl p-10 md:p-14 w-full max-w-md flex flex-col gap-8">

                    {/* 타이틀 */}
                    <div className="flex flex-col gap-2 text-center">
                        <p className="font-gmarket text-xs tracking-[0.25em] text-[#3D2E35]/50">ADMIN</p>
                        <h1 className="font-rebecca text-3xl md:text-4xl font-light text-[#3D2E35]">관리자 로그인</h1>
                        <p className="font-gmarket text-sm font-light text-[#3D2E35]/50">관리자 계정으로 로그인 해주세요</p>
                    </div>

                    {/* 입력 필드 */}
                    <div className="flex flex-col gap-5">
                        {FIELDS.map((field) => (
                            <div key={field.id} className="flex flex-col gap-2">
                                <p className="font-gmarket text-xs tracking-wider text-[#3D2E35]/50">{field.label}</p>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.id]}
                                    onChange={(e) => handleChange(e.target.value, field.id)}
                                    onKeyDown={(e) => e.key === "Enter" && onClickLogin()}
                                    className="font-gmarket text-sm text-[#3D2E35] bg-white/50 border border-[#3D2E35]/15 rounded-xl px-4 py-3 outline-none focus:border-[#3D2E35]/40 transition-colors placeholder:text-[#3D2E35]/30 w-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* 에러 메시지 */}
                    {error && (
                        <p className="font-gmarket text-xs text-red-500/80 text-center">{error}</p>
                    )}

                    {/* 로그인 버튼 */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                        transition={SPRING}
                        onClick={onClickLogin}
                        disabled={isLoading}
                        className="font-gmarket font-light text-sm text-[#FDFAF7] bg-[#3D2E35] rounded-full py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
                    >
                        {isLoading ? "로그인 중" : "로그인"}
                    </motion.button>

                </div>
            </motion.div>
        </div>
    );
}
