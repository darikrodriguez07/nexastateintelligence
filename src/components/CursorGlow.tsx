import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // ✅ Detectar móvil por ancho de pantalla
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        }
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ❌ No renderizar en móvil
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={{ transform: "translate(0px, 0px)" }}
    >
      <div className="w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/100 blur-md" />
    </div>
  );
};

export default CursorGlow;