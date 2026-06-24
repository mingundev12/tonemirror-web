export default function HologramOverlay({ className = "" }) {
    return <div className={`hologram absolute inset-0 pointer-events-none mix-blend-screen ${className}`} />;
}
