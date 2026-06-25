import { Outlet, useLocation } from "react-router-dom";

import Footer from "./Footer";
import PageBackground from "./PageBackground";

const VARIANT_BY_PATH = {
    "/": "home",
    "/result": "result",
    "/makeup": "makeup",
};

export default function PageLayout() {
    const { pathname } = useLocation();
    const variant = VARIANT_BY_PATH[pathname] ?? "home";

    return (
        <div className="relative w-full bg-[#FDFAF7]">
            <PageBackground variant={variant} />
            <div className="relative z-10">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}
