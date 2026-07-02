import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BlobGradient from "../common/BlobGradient";
import adminLoginConst from "../../data/admin/adminLoginConst.json";

const SPRING = { duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100 };

export default function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ id: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (value, id) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (error) setError("");
    };

    const onClickLogin = async () => {
        if (isLoading) return;

        if (!formData.id || !formData.password) {
            setError(adminLoginConst.errors.emptyFields);
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
                toast.success(adminLoginConst.toast.success);
                navigate("/admin");
            } else {
                setError(res.data.msg || adminLoginConst.errors.loginFailed);
            }
        } catch {
            setError(adminLoginConst.errors.serverError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full min-h-dvh bg-[#FDFAF7]">

            <div className="absolute inset-0 min-h-full pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% z-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% z-1" />
                <div className="absolute inset-0 opacity-30">
                    <BlobGradient />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 min-h-dvh flex items-center justify-center px-[10%] py-24"
            >
                <div className="glass rounded-2xl p-10 md:p-14 w-full max-w-md flex flex-col gap-8">

                    <div className="flex flex-col gap-2 text-center">
                        <p className="font-gmarket text-xs tracking-[0.25em] text-[#3D2E35]/50">ADMIN</p>
                        <h1 className="font-rebecca text-3xl md:text-4xl font-light text-[#3D2E35]">{adminLoginConst.title}</h1>
                        <p className="font-gmarket text-sm font-light text-[#3D2E35]/50">{adminLoginConst.subtitle}</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        {adminLoginConst.fields.map((field) => (
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

                    {error && (
                        <p className="font-gmarket text-xs text-red-500/80 text-center">{error}</p>
                    )}

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                        transition={SPRING}
                        onClick={onClickLogin}
                        disabled={isLoading}
                        className="font-gmarket font-light text-sm text-[#FDFAF7] bg-[#3D2E35] rounded-full py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
                    >
                        {isLoading ? adminLoginConst.button.loading : adminLoginConst.button.submit}
                    </motion.button>

                </div>
            </motion.div>
        </div>
    );
}
