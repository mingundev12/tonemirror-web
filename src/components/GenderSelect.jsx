
export default function GenderSelect({motion, genderArr, genderSelect, setGenderSelect}) {
        

    return (
       <>
           <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10  md:gap-30 w-full h-[50vh]">
                {genderArr.map((item, index) => (
                <motion.div
                    whileHover={{y: -20}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="glass relative flex flex-col w-full h-full items-center justify-center gap-6 rounded-2xl cursor-pointer border border-[#FDFAF7]/10"
                    key={index}
                    onClick={()=> genderSelect === index ? setGenderSelect(null) : setGenderSelect(index)}
                >
                    {genderSelect === index && (
                        <div className="absolute inset-0 z-0 rounded-2xl bg-[#B8D4E8]/15 pointer-events-none" />
                    )}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-10 w-full h-full p-10">
                        <img src={item.src} className="inset-0 w-30 object-cover" />
                        <div className="flex flex-col gap-2">
                            <p className="text-center text-2xl text-[#222021] font-gmarket">{item.gender}</p>
                            <p className="text-center font-light text-[#222021] font-gmarket">{item.text}</p>
                        </div>
                    </div>
                </motion.div>
                ))}
            </div>
       </>
   )
}