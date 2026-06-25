export default function Footer() {
   return (
        <div className="box-border px-[10%] md:px-0 md:mx-[10%] flex flex-col justify-end min-w-0 py-10 md:py-20">

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 min-w-0">

                <div className="h-90 flex flex-col justify-between p-10 glass rounded-2xl">
                    <p className="font-gmarket text-sm font-light text-[#3D2E35] tracking-wider">CONTACT</p>
                    <p className="font-rebecca md:text-5xl text-lg font-light text-[#3D2E35] break-all">tonemirror@gmail.com</p>
                </div>

                <div className="flex flex-col justify-between p-10 glass rounded-2xl">
                    <div className="flex flex-col md:gap-8 gap-2">
                        <p className="font-gmarket text-sm font-light text-[#3D2E35] tracking-wider">SERVICE</p>
                        <div className="flex flex-col md:gap-4 gap-0">
                            <p className="font-gmarket md:text-sm text-xs font-light text-[#3D2E35] tracking-wider">DIAGNOSIS</p>
                            <p className="font-gmarket md:text-sm text-xs font-light text-[#3D2E35] tracking-wider">PERSONAL COLOR</p>
                            <p className="font-gmarket md:text-sm text-xs font-light text-[#3D2E35] tracking-wider">VIRTUAL MAKEUP</p>
                        </div>
                    </div>
                    <p className="font-rebecca md:text-5xl text-lg font-light text-[#3D2E35]">Go to Diagnosis</p>
                </div>

            </div>

            <div className="flex md:flex-row flex-col justify-between mt-10 gap-2 text-xs text-[#3D2E35]">
                <p className="font-gmarket">© 2025 ToneMirror. All rights reserved.</p>
                <p className="font-gmarket">Designed & Developed by ToneMirror</p>
            </div>

        </div>
   )
}
