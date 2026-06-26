import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import head from "../../assets/modelHead1.png";
import head2 from "../../assets/modelHead2.png";
import rightArrowWhite from "../../assets/img/arrow-right-white.svg";
import logoSymbol from "../../assets/logo/Logo1White.svg";
import logoText from "../../assets/logo/Logo2White.svg";

import BlobGradient from "../common/BlobGradient";

import heroConst from "../../data/home/heroConst.json";

const vw = () => document.documentElement.clientWidth;
const vh = () => document.documentElement.clientHeight;
const isMobileView = () => vw() < 768;

const GLASS_R = 16;
const GLASS_MARGIN = 80;
const DESKTOP_GLASS = { w: 400, h: 520 };
const MOBILE_GLASS_TOP = 0.25;
const MOBILE_GLASS_CHIN = 0.84;
const BLUR_DEFAULT = 6;

export default function Hero() {

    const [swapped, setSwapped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [glassDivPos, setGlassDivPos] = useState({ x: 0, y: 0 });
    const [glassSize, setGlassSize] = useState(DESKTOP_GLASS);

    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const glassPos = useRef({ x: null, y: null });
    const dragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef(null);
    const blurAmount = useRef(BLUR_DEFAULT);
    const blurAnimRef = useRef(null);
    const imgAspectRef = useRef(null);

    // 모바일 — 이미지 배치 기준값
    const getMobileImageMetrics = (img = null) => {
        const imgW = vh() * 0.50;
        const aspect = img
            ? img.naturalHeight / img.naturalWidth
            : (imgAspectRef.current ?? 1.2);
        const imgH = imgW * aspect;
        const imgTop = vh() - imgH;
        return { imgW, imgH, imgTop };
    };

    // 모바일 — 글래스 위치·크기 (고정, 턱까지)
    const getMobileGlassLayout = (img = null) => {
        const { imgH, imgTop } = getMobileImageMetrics(img);
        const y = imgTop + imgH * MOBILE_GLASS_TOP;
        const chinY = imgTop + imgH * MOBILE_GLASS_CHIN;
        return {
            x: vw() / 2,
            y,
            w: Math.min(vw() * 0.5, 220),
            h: chinY - y,
        };
    };

    const getGlassSize = () => {
        if (isMobileView()) {
            const { w, h } = getMobileGlassLayout();
            return { w, h };
        }
        return DESKTOP_GLASS;
    };

    const getInitialPos = () => {
        const { h } = getGlassSize();

        if (isMobileView()) {
            const { x, y } = getMobileGlassLayout();
            return { x, y };
        }

        return {
            x: vw() / 2,
            y: vh() / 2 - h / 2 + 40,
        };
    };

    const clamp = (pos) => {
        const { w, h } = getGlassSize();
        return {
            x: Math.max(0, Math.min(vw() - w, pos.x)),
            y: Math.max(GLASS_MARGIN, Math.min(vh() - h - GLASS_MARGIN, pos.y)),
        };
    };

    // 캔버스 — before 이미지 + 글래스 영역에 after 이미지 클립
    const drawCanvas = (img1, img2, pos, blurVal = BLUR_DEFAULT) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = vw();
        canvas.height = vh();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { x, y } = pos;
        const { w, h } = isMobileView()
            ? getMobileGlassLayout(img1)
            : getGlassSize();

        const mobile = isMobileView();
        const imgW = mobile ? vh() * 0.50 : vh() * 0.75;
        const blur = mobile ? 0 : blurVal;
        const imgH = img1.naturalHeight * (imgW / img1.naturalWidth);
        const imgX = canvas.width / 2 - imgW / 2;
        const imgY = canvas.height - imgH;

        ctx.drawImage(img1, imgX, imgY, imgW, imgH);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + GLASS_R, y);
        ctx.arcTo(x + w, y, x + w, y + h, GLASS_R);
        ctx.arcTo(x + w, y + h, x, y + h, GLASS_R);
        ctx.arcTo(x, y + h, x, y, GLASS_R);
        ctx.arcTo(x, y, x + w, y, GLASS_R);
        ctx.closePath();
        ctx.clip();

        if (blur > 0.1) ctx.filter = `blur(${blur}px)`;
        ctx.drawImage(img2, imgX - 10, imgY - 10, imgW + 20, imgH + 20);
        ctx.filter = "none";
        ctx.restore();
    };

    // 드래그 시 블러 페이드
    const animateBlur = (img1, img2, targetBlur) => {
        if (blurAnimRef.current) cancelAnimationFrame(blurAnimRef.current);

        const step = () => {
            const diff = targetBlur - blurAmount.current;
            blurAmount.current += diff * 0.08;
            drawCanvas(img1, img2, glassPos.current, blurAmount.current);

            if (Math.abs(diff) > 0.05) {
                blurAnimRef.current = requestAnimationFrame(step);
            } else {
                blurAmount.current = targetBlur;
                drawCanvas(img1, img2, glassPos.current, targetBlur);
            }
        };
        blurAnimRef.current = requestAnimationFrame(step);
    };

    // 드래그 놓으면 초기 위치로 스프링 복귀
    const springBack = (img1, img2) => {
        const target = getInitialPos();
        const stiffness = 0.12;
        const damping = 0.75;
        let vx = 0;
        let vy = 0;

        const animate = () => {
            const { x, y } = glassPos.current;
            const ax = (target.x - x) * stiffness;
            const ay = (target.y - y) * stiffness;
            vx = (vx + ax) * damping;
            vy = (vy + ay) * damping;

            const newPos = { x: x + vx, y: y + vy };
            glassPos.current = newPos;
            setGlassDivPos({ ...newPos });
            drawCanvas(img1, img2, newPos, blurAmount.current);

            if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
                animFrameRef.current = requestAnimationFrame(animate);
            } else {
                glassPos.current = target;
                setGlassDivPos({ ...target });
                drawCanvas(img1, img2, target, blurAmount.current);
            }
        };
        animFrameRef.current = requestAnimationFrame(animate);
    };

    // 글래스 state + 캔버스 동기화 (초기화 / 리사이즈 공용)
    const syncGlass = (img1, img2, blur) => {
        const layout = isMobileView() ? getMobileGlassLayout(img1) : null;
        const pos = layout ? { x: layout.x, y: layout.y } : getInitialPos();
        const size = layout ? { w: layout.w, h: layout.h } : getGlassSize();

        glassPos.current = pos;
        setGlassDivPos(pos);
        setGlassSize(size);
        blurAmount.current = blur;
        drawCanvas(img1, img2, pos, blur);
    };

    useEffect(() => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = head;
        img2.src = head2;

        Promise.all([
            new Promise((r) => { img1.onload = r; }),
            new Promise((r) => { img2.onload = r; }),
        ]).then(() => {
            imgAspectRef.current = img1.naturalHeight / img1.naturalWidth;
            syncGlass(img1, img2, isMobileView() ? 0 : BLUR_DEFAULT);
        });

        const onResize = () => {
            syncGlass(img1, img2, isMobileView() ? 0 : blurAmount.current);
        };
        window.addEventListener("resize", onResize);

        const wrapper = wrapperRef.current;

        const isInGlass = (cx, cy) => {
            const { x, y } = glassPos.current;
            const { w, h } = getGlassSize();
            return cx >= x && cx <= x + w && cy >= y && cy <= y + h;
        };

        const startDrag = (clientX, clientY) => {
            dragging.current = true;
            setIsDragging(true);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            dragOffset.current = {
                x: clientX - glassPos.current.x,
                y: clientY - glassPos.current.y,
            };
            wrapper.style.cursor = "grabbing";
            animateBlur(img1, img2, 0);
        };

        const moveDrag = (clientX, clientY) => {
            const newPos = clamp({
                x: clientX - dragOffset.current.x,
                y: clientY - dragOffset.current.y,
            });
            glassPos.current = newPos;
            setGlassDivPos({ ...newPos });
            drawCanvas(img1, img2, newPos, blurAmount.current);
        };

        const endDrag = () => {
            if (!dragging.current) return;
            dragging.current = false;
            setIsDragging(false);
            wrapper.style.cursor = "default";
            animateBlur(img1, img2, BLUR_DEFAULT);
            springBack(img1, img2);
        };

        const onMouseDown = (e) => {
            if (isMobileView()) return;
            if (isInGlass(e.clientX, e.clientY)) startDrag(e.clientX, e.clientY);
        };

        const onMouseMove = (e) => {
            if (isMobileView()) return;
            if (!dragging.current) {
                wrapper.style.cursor = isInGlass(e.clientX, e.clientY) ? "grab" : "default";
                return;
            }
            moveDrag(e.clientX, e.clientY);
        };

        const onTouchStart = (e) => {
            if (isMobileView()) return;
            const t = e.touches[0];
            if (isInGlass(t.clientX, t.clientY)) startDrag(t.clientX, t.clientY);
        };

        const onTouchMove = (e) => {
            if (isMobileView()) return;
            if (!dragging.current) return;
            const t = e.touches[0];
            moveDrag(t.clientX, t.clientY);
        };

        wrapper.addEventListener("mousedown", onMouseDown);
        wrapper.addEventListener("mousemove", onMouseMove);
        wrapper.addEventListener("mouseup", endDrag);
        wrapper.addEventListener("mouseleave", endDrag);
        wrapper.addEventListener("touchstart", onTouchStart);
        wrapper.addEventListener("touchmove", onTouchMove);
        wrapper.addEventListener("touchend", endDrag);

        return () => {
            wrapper.removeEventListener("mousedown", onMouseDown);
            wrapper.removeEventListener("mousemove", onMouseMove);
            wrapper.removeEventListener("mouseup", endDrag);
            wrapper.removeEventListener("mouseleave", endDrag);
            wrapper.removeEventListener("touchstart", onTouchStart);
            wrapper.removeEventListener("touchmove", onTouchMove);
            wrapper.removeEventListener("touchend", endDrag);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const glassBase = {
        left: glassDivPos.x,
        top: glassDivPos.y,
        width: glassSize.w,
        height: glassSize.h,
        borderRadius: GLASS_R,
    };

    return (
        <div className="w-full h-screen relative overflow-hidden">

            {/* 배경 그라데이션 */}
            <div className="absolute w-full h-full bg-gradient-to-t from-[#FDFAF7] from-2% to-transparent to-10% md:to-20% z-20 pointer-events-none" />
            <div className="absolute w-full h-full bg-gradient-to-t from-[#FDFAF7] from-40% to-transparent to-50% md:to-100% z-1 pointer-events-none" />

            {/* 타이틀 + CTA */}
            <div className="absolute mx-[10%] h-full flex flex-col mt-40 md:mt-0 md:justify-center gap-10 z-[100] pointer-events-none">
                <div className="gap-2">
                    <p className="md:text-6xl text-4xl tracking-wider leading-tight text-[#3D2E35] font-rebecca whitespace-pre-wrap">
                        {heroConst.title}
                    </p>
                    <p className="text-base md:text-lg text-[#3D2E35] font-light font-gmarket whitespace-pre-wrap md:whitespace-nowrap">
                        {heroConst.subTitle}
                    </p>
                </div>

                <div
                    onMouseEnter={() => setSwapped(true)}
                    onMouseLeave={() => setSwapped(false)}
                    className="flex flex-row z-50 pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0, width: "0px" }}
                        animate={{ scale: swapped ? 1 : 0, width: swapped ? "56px" : "0px" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative flex items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle"
                    >
                        <div
                            className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]"
                            style={{ opacity: swapped ? 1 : 0 }}
                        />
                        <img src={rightArrowWhite} className="absolute w-5 z-10" />
                    </motion.div>

                    <Link to="/diagnosis">
                        <motion.div
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative flex tracking-wider items-center justify-center text-[#FDFAF7] h-14 w-fit pt-[6px] px-10 rounded-full overflow-hidden bg-[#3D2E35] mask-circle"
                        >
                            <div
                                className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]"
                                style={{ opacity: swapped ? 1 : 0 }}
                            />
                            <span className="relative z-10 font-light font-gmarket">
                                {heroConst.titleBtn}
                            </span>
                        </motion.div>
                    </Link>

                    <motion.div
                        initial={{ scale: 1, width: "56px" }}
                        animate={{ scale: swapped ? 0 : 1, width: swapped ? "0px" : "56px" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative flex items-center justify-center h-14 aspect-square backdrop-blur-xl rounded-full overflow-hidden bg-[#3D2E35] mask-circle"
                    >
                        <div
                            className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]"
                            style={{ opacity: swapped ? 1 : 0 }}
                        />
                        <img src={rightArrowWhite} className="absolute w-5 z-10" />
                    </motion.div>
                </div>
            </div>

            {/* 캔버스 + 드래그 히트영역 */}
            <div ref={wrapperRef} className="absolute inset-0 z-10" />
            <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

            {/* 글래스 — backdrop blur (데스크톱) */}
            <div
                className="absolute pointer-events-none hidden md:block"
                style={{
                    ...glassBase,
                    zIndex: 21,
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, black 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, black 100%)",
                }}
            />

            {/* 글래스 — 보더 / 하이라이트 */}
            <div
                className="absolute pointer-events-none border border-[#FDFAF7]/10"
                style={{
                    ...glassBase,
                    zIndex: 22,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.16) 100%)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.85), inset 0 -1px 1px rgba(255,255,255,0.12), inset 1px 0 1px rgba(255,255,255,0.35), inset 0 0 24px rgba(255,255,255,0.10), 0 12px 40px rgba(180,140,150,0.22), 0 2px 10px rgba(180,140,150,0.10)",
                }}
            />

            {/* 글래스 — 안내 텍스트 (데스크톱) */}
            <div
                className="absolute pointer-events-none hidden md:flex items-center justify-center"
                style={{
                    ...glassBase,
                    zIndex: 24,
                    opacity: isDragging ? 0 : 1,
                    transition: "opacity 0.3s ease",
                }}
            >
                <p className="text-[#FDFAF7]/50 text-center text-xl font-gmarket whitespace-pre-wrap">
                    {heroConst.glassText}
                </p>
            </div>

            {/* 글래스 — 로고 */}
            <div
                className="absolute pointer-events-none flex items-end justify-center pb-8"
                style={{ ...glassBase, zIndex: 25 }}
            >
                <div className="flex flex-row gap-2 opacity-50">
                    <img src={logoSymbol} className="w-4" />
                    <img src={logoText} className="h-3" />
                </div>
            </div>

            {/* 글래스 — 홀로그램 */}
            <div
                className="hologram absolute pointer-events-none mix-blend-screen"
                style={{ ...glassBase, zIndex: 23 }}
            />

            {/* 배경 Blob */}
            <div className="absolute w-full h-screen md:h-[60%] opacity-30 -z-50">
                <BlobGradient />
            </div>
        </div>
    );
}
