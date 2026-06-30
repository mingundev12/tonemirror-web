import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";

import BlobGradient from "../components/common/BlobGradient";
import adminConst from "../data/admin/adminConst.json";

const PERSONAL_COLORS = adminConst.personalColors;

const authHeader = () => ({ Authorization: `Bearer ${sessionStorage.getItem("admin_token")}` });

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

const FORM_FIELDS = adminConst.formFields.map((field) =>
    field.type === "select" ? { ...field, options: PERSONAL_COLORS } : field
);

const SPRING = { duration: 0.2, ease: "easeInOut", type: "spring", damping: 10, stiffness: 100 };

export default function Admin() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState(INIT);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectProduct = (selected) => {
        setProduct(selected);
        setIsEditing(true);
    };

    const handleCreate = async () => {
        if (isLoading) return;

        if (!product.brand.trim() || !product.brandName.trim() || !product.name.trim()) {
            toast.error(adminConst.toast.validationError);
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
            toast.success(adminConst.toast.createSuccess);
        } catch {
            toast.error(adminConst.toast.createError);
        } finally {
            setIsLoading(false);
        }
    };

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
                toast.success(adminConst.toast.updateSuccess);
            } else {
                toast.error(adminConst.toast.updateError);
            }
        } catch {
            toast.error(adminConst.toast.serverError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (isLoading) return;
        if (!window.confirm(adminConst.confirmDelete)) return;

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
                toast.success(adminConst.toast.deleteSuccess);
            } else {
                toast.error(adminConst.toast.deleteError);
            }
        } catch {
            toast.error(adminConst.toast.serverError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_token");
        navigate("/adminLogin", { replace: true });
    };

    const [pageTitleLine1, pageTitleLine2] = adminConst.pageTitle.split("\n");

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
                className="relative z-10 mx-[10%] pt-30 pb-24 flex flex-col gap-16"
            >

                <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-gmarket text-xs tracking-[0.25em] text-[#3D2E35]/50">ADMIN</p>
                        <h1 className="font-rebecca text-3xl md:text-4xl font-light text-[#3D2E35]">
                            {pageTitleLine1} <br className="md:hidden" /> {pageTitleLine2}
                        </h1>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05, opacity: 1 }}
                        transition={SPRING}
                        onClick={handleLogout}
                        className="font-gmarket font-light text-sm text-[#3D2E35] border border-[#3D2E35] opacity-50 rounded-full px-6 py-2 cursor-pointer shrink-0"
                    >
                        {adminConst.logout}
                    </motion.button>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="font-gmarket text-sm tracking-wider text-[#3D2E35]">{adminConst.productListTitle}</h2>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-gmarket text-xs tracking-wider text-[#3D2E35]/50 border-b border-[#3D2E35]/10">
                                <th className="font-light text-left pb-4">{adminConst.tableHeaders.brand}</th>
                                <th className="font-light text-left pb-4">{adminConst.tableHeaders.name}</th>
                                <th className="font-light text-left pb-4">{adminConst.tableHeaders.shadeName}</th>
                                <th className="font-light text-left pb-4">{adminConst.tableHeaders.personalColor}</th>
                                <th className="font-light text-right pb-4">{adminConst.tableHeaders.manage}</th>
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
                                            {adminConst.editButton}
                                        </motion.button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-8">
                    <h2 className="font-gmarket text-sm tracking-wider text-[#3D2E35]">
                        {isEditing ? adminConst.formTitle.edit : adminConst.formTitle.create}
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
                                    {adminConst.buttons.delete}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, opacity: 1 }}
                                    transition={SPRING}
                                    onClick={() => { setIsEditing(false); setProduct(INIT); }}
                                    disabled={isLoading}
                                    className="font-gmarket font-light text-sm text-[#3D2E35] border border-[#3D2E35] opacity-50 rounded-full px-8 py-3 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {adminConst.buttons.cancel}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "#5C4650" }}
                                    transition={SPRING}
                                    onClick={handleUpdate}
                                    disabled={isLoading}
                                    className="font-gmarket font-light text-sm text-[#FDFAF7] bg-[#3D2E35] rounded-full px-8 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? adminConst.buttons.saving : adminConst.buttons.save}
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
                                {isLoading ? adminConst.buttons.registering : adminConst.buttons.register}
                            </motion.button>
                        )}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
