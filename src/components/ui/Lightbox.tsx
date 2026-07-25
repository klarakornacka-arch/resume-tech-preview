import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface LightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export default function Lightbox({ src, alt, open, onClose }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [visible, setVisible] = useState(false);

  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const lastDist = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  // Animate in/out
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset when src changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const clampPosition = useCallback((x: number, y: number, s: number) => {
    const maxOffset = Math.max(0, (s - 1) * 150);
    return {
      x: Math.max(-maxOffset, Math.min(maxOffset, x)),
      y: Math.max(-maxOffset, Math.min(maxOffset, y)),
    };
  }, []);

  // Mouse wheel zoom
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      setScale((prev) => {
        const next = Math.max(0.3, Math.min(5, prev + delta));
        setPosition((p) => clampPosition(p.x, p.y, next));
        return next;
      });
    },
    [clampPosition]
  );

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition(clampPosition(dragStart.current.posX + dx, dragStart.current.posY + dy, scale));
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, scale, clampPosition]);

  // Touch gestures
  const touchStart = useRef<{ x: number; y: number; posX: number; posY: number; dist: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const touches = e.touches;
    if (touches.length === 1) {
      touchStart.current = {
        x: touches[0].clientX,
        y: touches[0].clientY,
        posX: position.x,
        posY: position.y,
        dist: 0,
      };
    } else if (touches.length === 2) {
      const dist = Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      );
      touchStart.current = { x: 0, y: 0, posX: position.x, posY: position.y, dist };
      lastDist.current = dist;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touches = e.touches;

    if (touches.length === 1 && scale > 1) {
      const dx = touches[0].clientX - touchStart.current.x;
      const dy = touches[0].clientY - touchStart.current.y;
      setPosition(
        clampPosition(touchStart.current.posX + dx, touchStart.current.posY + dy, scale)
      );
    } else if (touches.length === 2) {
      const dist = Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      );
      if (lastDist.current > 0) {
        const ratio = dist / lastDist.current;
        setScale((prev) => {
          const next = Math.max(0.3, Math.min(5, prev * ratio));
          setPosition((p) => clampPosition(p.x, p.y, next));
          return next;
        });
      }
      lastDist.current = dist;
    }
  };

  const onTouchEnd = () => {
    touchStart.current = null;
    lastDist.current = 0;
  };

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return createPortal(
    <div
      className={`lightbox-overlay ${visible ? "lightbox-visible" : ""}`}
      onClick={onBackdropClick}
    >
      {/* Close button */}
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Image hint */}
      {scale > 1 && (
        <p className="lightbox-zoom-hint">
          {Math.round(scale * 100)}%
        </p>
      )}

      {/* Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`lightbox-image ${isDragging ? "lightbox-dragging" : ""}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
        }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        draggable={false}
      />

      {/* Styles */}
      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(8px);
          opacity: 0;
          transition: opacity 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .lightbox-overlay.lightbox-visible {
          opacity: 1;
        }
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.5);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          backdrop-filter: blur(4px);
        }
        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          color: #fff;
        }
        .lightbox-zoom-hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-family: ui-monospace, monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.05em;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .lightbox-image {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 2px;
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.15s ease-out;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .lightbox-image.lightbox-dragging {
          transition: none;
        }
        @media (max-width: 640px) {
          .lightbox-image {
            max-width: 96vw;
            max-height: 85vh;
          }
          .lightbox-close {
            top: 12px;
            right: 12px;
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
