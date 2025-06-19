import { useEffect, useRef, useState } from "react";

const CursorTrail = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  const [hoverState, setHoverState] = useState(false); // for crosshair effect

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const hovering = !!target.closest(
        "button, a, [role='button'], .interactive"
      );
      isHovering.current = hovering;
      setHoverState(hovering);
    };

    const handleDown = () => {
      isClicking.current = true;
      if (rippleRef.current) {
        rippleRef.current.style.left = `${mouse.current.x - 20}px`;
        rippleRef.current.style.top = `${mouse.current.y - 20}px`;
        rippleRef.current.classList.remove("hidden");
        rippleRef.current.classList.add("animate-ping");
      }
    };

    const handleUp = () => {
      isClicking.current = false;
      rippleRef.current?.classList.add("hidden");
      rippleRef.current?.classList.remove("animate-ping");
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        const el = cursorRef.current;
        el.style.left = `${pos.current.x - 12}px`;
        el.style.top = `${pos.current.y - 12}px`;
        el.style.transform = `
          scale(${isClicking.current ? 0.9 : isHovering.current ? 1.2 : 1})
        `;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[10000] w-6 h-6 transition-transform duration-75 ease-out"
      >
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: hoverState
              ? "rgba(0,255,157,0.8)"
              : "rgba(0,229,255,0.6)",
            boxShadow: `0 0 ${hoverState ? "15px" : "10px"} ${
              hoverState ? "rgba(0,255,157,0.4)" : "rgba(0,229,255,0.3)"
            }`,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: hoverState ? "#00ff9d" : "#00e5ff",
            boxShadow: `0 0 ${hoverState ? "8px" : "6px"} ${
              hoverState ? "rgba(0,255,157,0.6)" : "rgba(0,229,255,0.5)"
            }`,
          }}
        />

        {hoverState && (
          <>
            <div className="absolute top-1/2 left-0 w-full h-px bg-green-400 transform -translate-y-1/2 opacity-60" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-green-400 transform -translate-x-1/2 opacity-60" />
          </>
        )}
      </div>

      <div
        ref={rippleRef}
        className="pointer-events-none fixed z-[9997] w-10 h-10 rounded-full border-2 border-green-400 hidden"
      />
    </>
  );
};

export default CursorTrail;
