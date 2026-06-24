
export default function ToneSelect({toneArr, motion, toneSelect, setToneSelect}) {

    
   return (
       <>
           <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10  md:gap-30 w-full h-[50vh]">
                {toneArr.map((item, index) => (
                    <motion.div
                        whileHover={{y: -20}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        key={index}
                        className="glass relative flex flex-col w-full h-full items-center justify-center gap-6 rounded-2xl cursor-pointer border border-[#FDFAF7]/10"
                        onClick={() => toneSelect === index ? setToneSelect(null) : setToneSelect(index)}
                    >
                        {toneSelect === index && (
                            <div className="absolute inset-0 z-0 rounded-2xl bg-[#B8D4E8]/15 pointer-events-none" />
                        )}

                        <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full h-full p-10">
                            <div className="relative w-60 h-60 rounded-full overflow-hidden">
                                <img src={item.src} className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-center items-center gap-2">   
                                    <p className="rounded-full w-6 h-6" style={{backgroundColor: item.code}}></p>
                                    <p className="text-[#222021] font-bold text-center text-sm">{item.code}</p>
                                </div>
                                <p className="text-center text-sm text-[#222021]/75">{item.text[0]} <br/> {item.text[1]}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
       </>
   )
}