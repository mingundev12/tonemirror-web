import head from "../assets/modelHead1.png";
import head2 from "../assets/modelHead2.png";
import rightArrowWhite from "../assets/img/arrow-right-white.svg";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import logoSymbol from "../assets/logo/Logo1White.svg"
import logoText from "../assets/logo/Logo2White.svg"
import { Link } from "react-router-dom";
import BlobGradient from "./BlobGradient";

const vw = () => document.documentElement.clientWidth;
const vh = () => document.documentElement.clientHeight;

export default function Hero() {

    const [swapped, setSwapped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const glassPos = useRef({ x: null, y: null });
    const dragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef(null);
    const blurAmount = useRef(6);
    const blurAnimRef = useRef(null);
    const [glassDivPos, setGlassDivPos] = useState({ x: 0, y: 0 });
    const [glassSize, setGlassSize] = useState({ w: 400, h: 520 });
    const GLASS_R = 16;
    const MARGIN = 80;

    const getGlassSize = () => {
        const isMobile = vw() < 768;
        return {
            w: isMobile ? Math.min(vw() * 0.5, 220) : 400,
            h: isMobile ? Math.min(vh() * 0.4, 320) : 520,
        };
    };

    const getInitialPos = () => {
        const { h } = getGlassSize();
        const isMobile = vw() < 768;

        if (isMobile) {
            const imgW = vh() * 0.40;
            const imgH = imgW * 1.2;
            const imgX = vw() / 2 - imgW / 2;
            const imgTop = vh() - imgH;
            return {
                x: imgX + imgW / 2,
                y: imgTop + imgH * 0.25,
            };
        }

        return {
            x: vw() / 2,
            y: vh() / 2 - h / 2 + 40,
        }
    };

    const clamp = (pos) => {
        const { w, h } = getGlassSize();
        return {
            x: Math.max(0, Math.min(vw() - w, pos.x)),
            y: Math.max(MARGIN, Math.min(vh() - h - MARGIN, pos.y)),
        };
    };

    const drawCanvas = (img1, img2, pos, blurVal = 6) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = vw();
        canvas.height = vh();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { x, y } = pos;
        const { w, h } = getGlassSize();

        const isMobile = vw() < 768;
        const imgW = isMobile ? vh() * 0.50 : vh() * 0.75;
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
        if (blurVal > 0.1) {
            ctx.filter = `blur(${blurVal}px)`;
        }
        ctx.drawImage(img2, imgX - 10, imgY - 10, imgW + 20, imgH + 20);
        ctx.filter = "none";
        ctx.restore();
    };

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

    useEffect(() => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = head;
        img2.src = head2;

        Promise.all([
            new Promise(r => { img1.onload = r; }),
            new Promise(r => { img2.onload = r; }),
        ]).then(() => {
            const isMobile = vw() < 768;
            const imgW = isMobile ? vh() * 0.50 : vh() * 0.75;
            const actualImgH = img1.naturalHeight * (imgW / img1.naturalWidth);
            const imgTop = vh() - actualImgH;

            const init = isMobile ? {
                x: vw() / 2,
                y: imgTop + actualImgH * 0.25,
            } : getInitialPos();

            glassPos.current = init;
            setGlassDivPos(init);
            setGlassSize(getGlassSize());
            blurAmount.current = 6;
            drawCanvas(img1, img2, init, 6);
        });

        const onResize = () => {
            const init = getInitialPos();
            glassPos.current = init;
            setGlassDivPos(init);
            setGlassSize(getGlassSize());
            drawCanvas(
                Object.assign(new Image(), { src: head }),
                Object.assign(new Image(), { src: head2 }),
                init,
                blurAmount.current
            );
        };
        window.addEventListener("resize", onResize);

        const wrapper = wrapperRef.current;

        const isInGlass = (cx, cy) => {
            const { x, y } = glassPos.current;
            const { w, h } = getGlassSize();
            return cx >= x && cx <= x + w && cy >= y && cy <= y + h;
        };

        const onMouseDown = (e) => {
            if (isInGlass(e.clientX, e.clientY)) {
                dragging.current = true;
                setIsDragging(true);
                if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
                dragOffset.current = {
                    x: e.clientX - glassPos.current.x,
                    y: e.clientY - glassPos.current.y,
                };
                wrapper.style.cursor = "grabbing";
                animateBlur(img1, img2, 0);
            }
        };

        const onMouseMove = (e) => {
            if (!dragging.current) {
                wrapper.style.cursor = isInGlass(e.clientX, e.clientY) ? "grab" : "default";
                return;
            }
            const newPos = clamp({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
            glassPos.current = newPos;
            setGlassDivPos({ ...newPos });
            drawCanvas(img1, img2, newPos, blurAmount.current);
        };

        const onMouseUp = () => {
            if (!dragging.current) return;
            dragging.current = false;
            setIsDragging(false);
            wrapper.style.cursor = "default";
            animateBlur(img1, img2, 6);
            springBack(img1, img2);
        };

        const onTouchStart = (e) => {
            const t = e.touches[0];
            if (isInGlass(t.clientX, t.clientY)) {
                dragging.current = true;
                setIsDragging(true);
                if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
                dragOffset.current = {
                    x: t.clientX - glassPos.current.x,
                    y: t.clientY - glassPos.current.y,
                };
                animateBlur(img1, img2, 0);
            }
        };

        const onTouchMove = (e) => {
            if (!dragging.current) return;
            const t = e.touches[0];
            const newPos = clamp({
                x: t.clientX - dragOffset.current.x,
                y: t.clientY - dragOffset.current.y,
            });
            glassPos.current = newPos;
            setGlassDivPos({ ...newPos });
            drawCanvas(img1, img2, newPos, blurAmount.current);
        };

        const onTouchEnd = () => {
            if (!dragging.current) return;
            dragging.current = false;
            setIsDragging(false);
            animateBlur(img1, img2, 6);
            springBack(img1, img2);
        };

        wrapper.addEventListener("mousedown", onMouseDown);
        wrapper.addEventListener("mousemove", onMouseMove);
        wrapper.addEventListener("mouseup", onMouseUp);
        wrapper.addEventListener("mouseleave", onMouseUp);
        wrapper.addEventListener("touchstart", onTouchStart);
        wrapper.addEventListener("touchmove", onTouchMove);
        wrapper.addEventListener("touchend", onTouchEnd);

        return () => {
            wrapper.removeEventListener("mousedown", onMouseDown);
            wrapper.removeEventListener("mousemove", onMouseMove);
            wrapper.removeEventListener("mouseup", onMouseUp);
            wrapper.removeEventListener("mouseleave", onMouseUp);
            wrapper.removeEventListener("touchstart", onTouchStart);
            wrapper.removeEventListener("touchmove", onTouchMove);
            wrapper.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const springBack = (img1, img2) => {
        const target = getInitialPos();
        const stiffness = 0.12;
        const damping = 0.75;
        let vx = 0, vy = 0;

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

    const glassBase = {
        left: glassDivPos.x,
        top: glassDivPos.y,
        width: glassSize.w,
        height: glassSize.h,
        borderRadius: GLASS_R,
    };

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-t from-[#FDFAF7] from-2% to-transparent to-10% md:to-20% z-20 pointer-events-none" />
                <div className="absolute w-full h-full bg-gradient-to-t from-[#FDFAF7] from-40% to-transparent to-10% md:to-100% z-1 pointer-events-none" />
                <div className="absolute mx-[10%] h-full flex flex-col mt-40 md:mt-0 md:justify-center gap-10 z-[100] pointer-events-none">
                    <div className="gap-2">
                        <p className="md:text-6xl text-5xl tracking-wider leading-tight text-[#3D2E35] font-rebecca">당신의 컬러를 <br/> 정확하게.</p>
                        <p className="text-lg text-[#3D2E35] font-light font-gmarket">사진 한 장으로 끝내는 퍼스널 컬러와 맞춤 뷰티</p>
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
                            className="relative flex items-center justify-center h-14 aspect-square rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                            <div
                                className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]"
                                style={{ opacity: swapped ? 1 : 0 }}
                            />
                            <img src={rightArrowWhite} className="absolute w-5 z-10" />
                        </motion.div>

                        <Link to="/diagnosis">
                            <motion.div
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="relative flex tracking-wider items-center justify-center text-[#FDFAF7] h-14 w-fit pt-[6px] px-10 rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                                <div
                                    className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]"
                                    style={{ opacity: swapped ? 1 : 0 }}
                                />
                                <span className="relative z-10 font-light font-gmarket">
                                    진단 시작하기
                                </span>
                            </motion.div>

                        </Link>

                        <motion.div
                            initial={{ scale: 1, width: "56px" }}
                            animate={{ scale: swapped ? 0 : 1, width: swapped ? "0px" : "56px" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative flex items-center justify-center h-14 aspect-square backdrop-blur-xl  rounded-full overflow-hidden bg-[#3D2E35] mask-circle">
                            <div
                                className="absolute inset-0 transition-opacity duration-300 bg-[#5C4650]"
                                style={{ opacity: swapped ? 1 : 0 }}
                            />
                            <img src={rightArrowWhite} className="absolute w-5 z-10" />
                        </motion.div>
                    </div>

                </div>              

                <div ref={wrapperRef} className="absolute inset-0 z-10" />
                <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

                {/* 방사형 마스크 blur - 항상 on */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        ...glassBase,
                        zIndex: 21,
                        backdropFilter: "blur(16px) saturate(180%)",
                        WebkitBackdropFilter: "blur(16px) saturate(180%)",
                        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, black 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, black 100%)",
                    }}
                />

                {/* 유리 본체 */}
                <div
                    className="absolute pointer-events-none border border-[#FDFAF7]/10"
                    style={{
                        ...glassBase,
                        zIndex: 22,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.16) 100%)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.85), inset 0 -1px 1px rgba(255,255,255,0.12), inset 1px 0 1px rgba(255,255,255,0.35), inset 0 0 24px rgba(255,255,255,0.10), 0 12px 40px rgba(180,140,150,0.22), 0 2px 10px rgba(180,140,150,0.10)",
                    }}
                />

                {/* 유리 카드 내부 콘텐츠 영역 */}
                <div
                    className="absolute pointer-events-none flex items-center justify-center"
                    style={{
                        ...glassBase,
                        zIndex: 24,
                        opacity: isDragging ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                >
                    <p className="text-[#FDFAF7]/50 text-center text-xl font-gmarket">
                        박스를 얼굴로 <br /> 드래그 해주세요.
                    </p>
                </div>

                {/* 로고 - 항상 보임 */}
                <div
                    className="absolute pointer-events-none flex items-end justify-center pb-8"
                    style={{
                        ...glassBase,
                        zIndex: 25,
                    }}
                >
                    <div className="flex flex-row gap-2 opacity-50">
                        <img src={logoSymbol} className="w-4" />
                        <img src={logoText} className="h-3" />
                    </div>
                </div>

                {/* 홀로그램 빗금 */}
                <div
                    className="hologram absolute pointer-events-none mix-blend-screen"
                    style={{ ...glassBase, zIndex: 23 }}
                />

                <div className="absolute w-full h-[60%] opacity-30 -z-50">
                    <BlobGradient />
                </div>
            </div>
        </>
    );
}