import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";

import logoSymbol from "../../assets/logo/Logo1.svg"
import logoText from "../../assets/logo/Logo2.svg"
import { useT, useLangCode, setLangCode } from '../../locales'

export default function NavBar() {

    const MotionNavLink = motion(NavLink);

    const t = useT()
    const langCode = useLangCode()
    const [langOpen, setLangOpen] = useState(false)
    
    const languages = [
        { code: "KOR", label: t.navBarConst.languages[0], flag: "kr" },
        { code: "ENG", label: t.navBarConst.languages[1], flag: "gb" },
    ]
    const currentLang = languages.find((l) => l.code === langCode)
    const otherLangs = languages.filter((l) => l.code !== langCode)

    const isDesktop = window.innerWidth >= 768

    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [0, 1])
    const rawMarginLeft = useTransform(scrollY, [0, 300], ["0px", isDesktop ? "48px" : 0])
    const rawMarginRight = useTransform(scrollY, [0, 300], ["0px", isDesktop ? "48px" : 0])

    const marginLeft = useSpring(rawMarginLeft, { stiffness: 100, damping: 20 })
    const marginRight = useSpring(rawMarginRight, { stiffness: 100, damping: 20 })

    return (
    <>      
            <div className="fixed md:w-[80%] px-[10%] md:px-0 w-full left-1/2 -translate-x-1/2 z-[200]">
                <div className="flex flex-row py-6 md:py-8 justify-between font-light font-gmarket">
                    <MotionNavLink
                        style={{marginLeft}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-row gap-4 items-center justify-center z-50 "
                        to="/"
                        >
                        <img src={logoSymbol} className="w-6" />
                        <img src={logoText} className="md:h-5 h-4" />
                    </MotionNavLink>
                    <motion.div
                        style={{marginRight}}
                        transition={{ duration: 0.3, delay: 0, ease: "easeInOut" }}
                        className="flex flex-row md:gap-10 md:py-4 z-50 items-center">
                        <MotionNavLink
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            to="/" className={({ isActive }) => isActive ? "font-medium text-[##3D2E35] md:block hidden pt-1" : "md:block text-[##3D2E35] hidden pt-1"}>{t.navBarConst.links[0]}</MotionNavLink>
                        <MotionNavLink
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            to="/diagnosis" className={({ isActive }) => isActive ? "font-medium text-[##3D2E35] md:block hidden pt-1" : "md:block text-[##3D2E35] hidden pt-1" }>{t.navBarConst.links[1]}</MotionNavLink>
                        <MotionNavLink
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            to="/result" className={({ isActive }) => isActive ? "font-medium text-[##3D2E35] md:block hidden pt-1" : "md:block text-[##3D2E35] hidden pt-1"}>{t.navBarConst.links[2]}</MotionNavLink>
                        
                        <MotionNavLink
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            to="/makeup" className={({ isActive }) => isActive ? "font-medium text-[##3D2E35] md:block hidden pt-1" : "md:block text-[##3D2E35] hidden pt-1"}>{t.navBarConst.links[3]}</MotionNavLink>
                        
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
                    <motion.div 
                        style={{ opacity }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="glass absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full md:h-14 h-full md:rounded-full border border-[#FDFAF7]/10"></motion.div>
                </div>
            </div>
        </>
    )
}