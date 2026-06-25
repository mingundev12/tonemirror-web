import BlobGradient from "./BlobGradient";

export default function PageBackground({ variant }) {
    return (
        <div className="absolute inset-0 min-h-full opacity-30 pointer-events-none">
            {variant === "home" && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#FDFAF7] from-50% to-transparent to-90% pointer-events-none" />
            )}
            {variant === "result" && (
                <>
                    <div className="absolute w-full h-[50%] bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% pointer-events-none" />
                </>
            )}
            {variant === "makeup" && (
                <>
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FDFAF7]/75 from-40% to-transparent to-100% pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF7] from-0% to-transparent to-50% pointer-events-none" />
                </>
            )}
            <BlobGradient />
        </div>
    );
}
