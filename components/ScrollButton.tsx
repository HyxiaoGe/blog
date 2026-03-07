"use client";

import { useEffect, useState } from "react";

export function ScrollButton() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      setVisible(scrollY > 400);
      setAtBottom(scrollY + windowH >= docH - 100);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="scroll-btn"
      aria-label={atBottom ? "Back to top" : "Scroll to bottom"}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        width: 40,
        height: 40,
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        zIndex: 50,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: atBottom ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 200ms ease",
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
