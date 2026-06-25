import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useMotionValue, animate } from "motion/react";

import logoSymbol from "../../assets/logo/Logo1.svg"
import logoText from "../../assets/logo/Logo2.svg"
import menuIco from "../../assets/img/list-light.svg"

import navBarConst from "../../data/common/navBarConst.json"


export default function NavBar() {
    
    const languages = navBarConst.languages

    const MotionNavLink = motion(NavLink);

    const [langCode, setLangCode] = useState("KOR")
    const [langOpen, setLangOpen] = useState(false)

    const currentLang = languages.find((l) => l.code === langCode)
    const otherLangs = languages.filter((l) => l.code !== langCode)

    const isDesktop = window.innerWidth >= 768

    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [0, 1])
    const rawMarginLeft = useTransform(scrollY, [0, 300], ["0px", isDesktop ? "48px" : 0])
    const rawMarginRight = useTransform(scrollY, [0, 300], ["0px", isDesktop ? "48px" : 0])

    const marginLeft = useSpring(rawMarginLeft, { stiffness: 100, damping: 20 })
    const marginRight = useSpring(rawMarginRight, { stiffness: 100, damping: 20 })

    const menuGlass = useMotionValue(0)
    const glassOpacity = useTransform(
        [opacity, menuGlass],
        ([scrollOp, menuOp]) => Math.max(scrollOp, menuOp)
    )

    const [menuOpen, setMenuOpen] = useState(false)

    const openMenu = () => {
        animate(menuGlass, 1, { duration: 0.5, ease: "easeInOut" })
        setMenuOpen(true)
    }

    const closeMenu = () => {
        animate(menuGlass, 0, { duration: 0.5, ease: "easeInOut" })
        setMenuOpen(false)
    }


    return (
    <>      
            <div className="fixed md:w-[80%] px-[10%] md:px-0 w-full left-1/2 -translate-x-1/2 z-200">
                <div className="flex flex-row py-6 md:py-8 justify-between items-center font-light font-gmarket ">
                    
                    {/* 네비바 로고 */}
                    <MotionNavLink
                        style={{marginLeft}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-row gap-4 items-center justify-center z-50"
                        to="/"
                        >
                        <img src={logoSymbol} className="w-6" />
                        <img src={logoText} className="md:h-5 h-4" />
                    </MotionNavLink>

                    <motion.div
                        style={{marginRight}}
                        transition={{ duration: 0.3, delay: 0, ease: "easeInOut" }}
                        className="flex flex-row md:gap-10 md:py-4 z-50 items-center">
                        
                        <div className="md:hidden block cursor-pointer">
                            <img src={menuIco} className="w-6" onClick={() => menuOpen ? closeMenu() : openMenu()} />
                        </div>
                        
                        {/* 네비바 링크 */}
                        {navBarConst.links.map((item) => (
                            <MotionNavLink
                                key={item.linkName}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                to={item.linkPath}
                                end={item.linkPath === "/"}
                                className={({ isActive }) => isActive ? "font-medium text-[#3D2E35] md:block hidden pt-1" : "md:block text-[#3D2E35] hidden pt-1"}>
                                    {item.linkName}
                            </MotionNavLink>
                        ))}
                        
                        {/* 언어 전환 버튼 */}
                        <div className="relative z-50 font-gmarket md:block hidden ">
                            <button
                                type="button"
                                onClick={() => setLangOpen((v) => !v)}
                                className="glass flex flex-row items-center gap-2 text-[#3D2E35] px-4 py-1.5 rounded-full cursor-pointer border border-[#FDFAF7]/10">
                                <span className={`fi fi-${currentLang.flag} fis rounded-full w-4 h-4`}></span>
                                <span className="text-sm font-medium">{currentLang.label}</span>
                                <motion.svg
                                    animate={{ rotate: langOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1">
                                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="glass absolute top-full mt-2 left-0 w-full rounded-2xl overflow-hidden p-1 border border-[#FDFAF7]/10">
                                        {otherLangs.map((lang) => (
                                            <button
                                                key={lang.code}
                                                type="button"
                                                onClick={() => { setLangCode(lang.code); setLangOpen(false) }}
                                                className="flex flex-row items-center gap-2 w-full text-left text-[#3D2E35] px-3 py-2 rounded-xl hover:bg-[#3D2E35]/5 cursor-pointer">
                                                <span className={`fi fi-${lang.flag} fis rounded-full w-4 h-4`}></span>
                                                <span className="text-sm font-medium">{lang.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* 모바일 메뉴 */}
                    <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`${menuOpen ? "block" : "hidden"} absolute top-0 left-0 w-screen h-screen bg-[#FDFAF7] -z-100`}>
                            <div className="px-10 pt-18">
                                {navBarConst.links.map((item) => (
                                    <MotionNavLink
                                        key={item.linkName}
                                        className={({isActive }) => isActive ? "flex flex-col my-10 gap-14 text-2xl font-medium text-[#3D2E35]" :"flex flex-col my-10 gap-14 text-2xl text-[#3D2E35]"}
                                        to={item.linkPath}
                                        end={item.linkPath === "/"}
                                        onClick={closeMenu}
                                        >
                                        {item.linkName}
                                    </MotionNavLink>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    <motion.div 
                        style={{ opacity: glassOpacity }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="glass absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full md:h-14 h-full md:rounded-full border border-[#FDFAF7]/10"></motion.div>
                </div>
            </div>
        </>
    )
}
