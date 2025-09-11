// components/HeroBackdrop.tsx
// Decorative background for the hero: gradient blobs + subtle grid (pure CSS)
export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Cyan glow blobs */}
      <div className="absolute -top-24 -left-8 h-72 w-72 rounded-full blur-3xl
        bg-[radial-gradient(circle_at_center,rgba(110,231,249,0.35),transparent_60%)]" />
      <div className="absolute top-24 -right-16 h-80 w-80 rounded-full blur-3xl
        bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.25),transparent_60%)]" />
      {/* Subtle grid overlay with radial mask (defined in globals) */}
      <div className="absolute inset-0 bg-grid opacity-70" />
    </div>
  );
}
