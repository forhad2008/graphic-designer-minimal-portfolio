import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  shape: 'dot' | 'sparkle' | 'ring';
}

export const ButterflyCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [rotation, setRotation] = useState(0);
  const [bankAngle, setBankAngle] = useState(0);
  const [pitchAngle, setPitchAngle] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSuppressed, setIsSuppressed] = useState(false); // Suppressed over round function icons
  const [particles, setParticles] = useState<Particle[]>([]);
  const [flapDuration, setFlapDuration] = useState(0.38);

  const prevPos = useRef({ x: -200, y: -200 });
  const targetAngle = useRef(0);
  const currentAngle = useRef(0);
  const currentBank = useRef(0);
  const currentPitch = useRef(0);
  const lastMoveTime = useRef(Date.now());
  const stationaryTimer = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);
  const isSuppressedRef = useRef(false);

  useEffect(() => {
    // Only activate on devices with mouse pointer
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) {
      return;
    }

    const spawnParticles = (x: number, y: number, count: number = 1, isBurst: boolean = false) => {
      if (isSuppressedRef.current) return; // Never spawn particles when over round function buttons

      const colors = ['#00E6BB', '#00F0FF', '#38BDF8', '#FFFFFF', '#A7F3D0', '#67E8F9'];
      const shapes: ('dot' | 'sparkle' | 'ring')[] = ['sparkle', 'dot', 'sparkle', 'ring'];
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isBurst ? Math.random() * 2.8 + 1.2 : Math.random() * 1.0 + 0.2;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        newParticles.push({
          id: particleIdRef.current++,
          x: x + (Math.random() - 0.5) * (isBurst ? 24 : 12),
          y: y + (Math.random() - 0.5) * (isBurst ? 24 : 12) + 6,
          size: isBurst ? Math.random() * 4 + 1.6 : Math.random() * 3.2 + 1.4,
          color: randomColor,
          opacity: isBurst ? 1 : 0.85,
          vx: Math.cos(angle) * speed * 0.75,
          vy: Math.sin(angle) * speed * 0.75 + 0.35,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 6,
          shape: randomShape,
        });
      }

      setParticles((prev) => [...prev.slice(-24), ...newParticles]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(16, now - lastMoveTime.current);
      lastMoveTime.current = now;

      const newX = e.clientX;
      const newY = e.clientY;

      const dx = newX - prevPos.current.x;
      const dy = newY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (!isVisible && dist > 0) {
        setIsVisible(true);
      }

      // Check if mouse is over any message window, modal, dialog, round function icon, or suppressed region
      const target = e.target as HTMLElement | null;
      let suppressed = false;

      if (target) {
        suppressed = Boolean(
          target.closest('[data-no-butterfly="true"]') ||
          target.closest('[data-round-icon="true"]') ||
          target.closest('[data-visual-window="true"]') ||
          target.closest('[data-modal="true"]') ||
          target.closest('[role="dialog"]') ||
          target.closest('[role="alertdialog"]') ||
          target.closest('[aria-modal="true"]') ||
          target.closest('.no-butterfly') ||
          target.closest('.visual-window') ||
          target.closest('.chat-window') ||
          target.closest('.modal-window') ||
          target.closest('dialog')
        );
      }

      // Deep stack check with elementsFromPoint in case event bubbling is trapped
      if (!suppressed && typeof document.elementsFromPoint === 'function') {
        const elementsUnderCursor = document.elementsFromPoint(newX, newY);
        for (const el of elementsUnderCursor) {
          if (
            el.matches?.('[data-no-butterfly="true"], [data-round-icon="true"], [data-visual-window="true"], [data-modal="true"], [role="dialog"], [role="alertdialog"], [aria-modal="true"], .no-butterfly, .visual-window, .chat-window, .modal-window') ||
            el.closest?.('[data-no-butterfly="true"], [data-round-icon="true"], [data-visual-window="true"], [data-modal="true"], [role="dialog"], [role="alertdialog"], [aria-modal="true"], .no-butterfly, .visual-window, .chat-window, .modal-window')
          ) {
            suppressed = true;
            break;
          }
        }
      }

      isSuppressedRef.current = suppressed;
      setIsSuppressed(suppressed);

      if (suppressed) {
        // Clear particles when entering suppressed window so none linger on the window surface
        setParticles([]);
      }

      if (stationaryTimer.current) clearTimeout(stationaryTimer.current);
      stationaryTimer.current = setTimeout(() => {
        setFlapDuration(0.72); // smooth, gentle 3D breathing flutter when resting
        currentPitch.current = 0;
      }, 350);

      // Calculate 3D flight heading, banking, and pitch angles
      if (dist > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        targetAngle.current = angle;

        // Dynamic flap speed based on flight velocity
        const speed = dist / dt;
        const dynamicFlap = Math.max(0.12, Math.min(0.5, 0.38 - speed * 0.12));
        setFlapDuration(dynamicFlap);

        // 3D Bank tilt into turns
        const angularDelta = (angle - currentAngle.current + 540) % 360 - 180;
        currentBank.current = Math.max(-28, Math.min(28, angularDelta * 0.45));
        setBankAngle(currentBank.current);

        // 3D Pitch forward/backward with speed
        currentPitch.current = Math.min(22, Math.max(-12, speed * 12));
        setPitchAngle(currentPitch.current);

        // Spawn magical fairy dust trail (only if not suppressed)
        if (!suppressed && Math.random() > 0.38) {
          spawnParticles(newX, newY, Math.random() > 0.75 ? 2 : 1, false);
        }
      }

      prevPos.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });

      // Check if hovering over interactive elements (excluding suppressed round buttons)
      if (target && !suppressed) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.getAttribute('role') === 'tab' ||
          window.getComputedStyle(target).cursor === 'pointer';

        setIsHovering(isClickable);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isSuppressedRef.current) return;
      setIsClicking(true);
      spawnParticles(e.clientX, e.clientY, 8, true);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Particle update and smooth 3D rotation animation loop
    let animId: number;
    const updateLoop = () => {
      // Smooth 3D yaw interpolation
      let diff = targetAngle.current - currentAngle.current;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;
      currentAngle.current += diff * 0.18;
      setRotation(currentAngle.current);

      // Smooth 3D bank and pitch decay
      currentBank.current *= 0.90;
      setBankAngle(currentBank.current);
      currentPitch.current *= 0.92;
      setPitchAngle(currentPitch.current);

      // Decay stardust particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: p.rotation + p.vRot,
            opacity: p.opacity - 0.03,
            size: Math.max(0, p.size - 0.035),
          }))
          .filter((p) => p.opacity > 0 && p.size > 0.3)
      );

      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (stationaryTimer.current) clearTimeout(stationaryTimer.current);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Fairy Stardust Trail */}
      <div
        className={`fixed inset-0 pointer-events-none z-[9998] overflow-hidden transition-opacity duration-200 ${
          isSuppressed ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              opacity: p.opacity,
            }}
          >
            {p.shape === 'sparkle' ? (
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                <path
                  d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z"
                  fill={p.color}
                  style={{ filter: `drop-shadow(0 0 3px ${p.color})` }}
                />
              </svg>
            ) : p.shape === 'ring' ? (
              <div
                className="w-full h-full rounded-full border border-current"
                style={{
                  color: p.color,
                  boxShadow: `0 0 5px ${p.color}`,
                }}
              />
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 6px 1px ${p.color}`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main 3D Butterfly Avatar (Smoothly fades out if over round function icons) */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] select-none transition-opacity duration-200 ${
          isSuppressed ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        {/* Subtle precision guide dot at pointer origin */}
        <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E6BB] shadow-[0_0_6px_#00E6BB] opacity-80" />

        {/* 3D Flight Gimbal & Attitude Wrapper */}
        <div
          className="relative transition-transform duration-150 ease-out"
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg) rotateX(${pitchAngle}deg) rotateY(${bankAngle * 0.8}deg) scale(${
              isClicking ? 0.78 : isHovering ? 1.08 : 0.92
            })`,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {/* Real 3D Ground Elevation Shadow */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-9 bg-black/45 rounded-full blur-md pointer-events-none"
            style={{
              transform: `translateZ(-28px) scale(${isHovering ? 1.25 : 0.95})`,
              animation: `butterflyShadowPulse ${flapDuration}s ease-in-out infinite alternate`,
            }}
          />

          {/* Ambient Iridescent Energy Aura Glow */}
          <div
            className={`absolute -inset-4 rounded-full blur-lg transition-all duration-300 pointer-events-none ${
              isHovering
                ? 'bg-[#00E6BB]/35 scale-135 opacity-100'
                : 'bg-gradient-to-r from-[#00E6BB]/18 via-[#00B8FF]/18 to-[#0072FF]/12 opacity-65'
            }`}
            style={{ transform: 'translateZ(-10px)' }}
          />

          {/* Interactive Landing Radar Rings when hovering links/buttons */}
          {isHovering && !isSuppressed && (
            <>
              <div
                className="absolute -inset-4 rounded-full border border-[#00E6BB]/50 animate-ping pointer-events-none"
                style={{ transform: 'translateZ(-6px)' }}
              />
              <div
                className="absolute -inset-2 rounded-full border border-[#00B8FF]/40 animate-pulse pointer-events-none"
                style={{ transform: 'translateZ(-4px)' }}
              />
            </>
          )}

          {/* 3D Butterfly Container with Full Depth Layers (68px width x 60px height) */}
          <div
            className="relative w-[68px] h-[60px] flex items-center justify-center"
            style={{ perspective: '900px', transformStyle: 'preserve-3d' }}
          >
            {/* SVG Global Definitions for Iridescent Textures & 3D Shaders */}
            <svg className="absolute w-0 h-0 pointer-events-none">
              <defs>
                {/* 3D Left Wing Morpho Gradient */}
                <linearGradient id="morpho3DLeft" x1="100%" y1="15%" x2="0%" y2="85%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="22%" stopColor="#00E6BB" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="78%" stopColor="#0369A1" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                {/* 3D Right Wing Morpho Gradient */}
                <linearGradient id="morpho3DRight" x1="0%" y1="15%" x2="100%" y2="85%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="22%" stopColor="#00E6BB" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="78%" stopColor="#0369A1" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                {/* 3D Specular Wing Camber Light Left */}
                <linearGradient id="specular3DLeft" x1="90%" y1="10%" x2="10%" y2="90%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="30%" stopColor="#67E8F9" stopOpacity="0.5" />
                  <stop offset="65%" stopColor="#00E6BB" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
                </linearGradient>

                {/* 3D Specular Wing Camber Light Right */}
                <linearGradient id="specular3DRight" x1="10%" y1="10%" x2="90%" y2="90%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="30%" stopColor="#67E8F9" stopOpacity="0.5" />
                  <stop offset="65%" stopColor="#00E6BB" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
                </linearGradient>

                {/* 3D Wing Rim Highlight Left */}
                <linearGradient id="rim3DLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#00E6BB" stopOpacity="0.85" />
                  <stop offset="85%" stopColor="#0284C7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
                </linearGradient>

                {/* 3D Wing Rim Highlight Right */}
                <linearGradient id="rim3DRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#00E6BB" stopOpacity="0.85" />
                  <stop offset="85%" stopColor="#0284C7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
                </linearGradient>

                {/* 3D Cylindrical Body Gradient */}
                <linearGradient id="bodyCylinder3D" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#030712" />
                  <stop offset="25%" stopColor="#00E6BB" />
                  <stop offset="50%" stopColor="#E0F2FE" />
                  <stop offset="75%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#030712" />
                </linearGradient>
              </defs>
            </svg>

            {/* ==================== 3D LEFT WINGS COMPLEX ==================== */}
            <div
              className="absolute left-[2px] top-[2px] w-[32px] h-[56px] origin-right"
              style={{
                animation: `realistic3DFlapLeft ${flapDuration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate`,
                transformStyle: 'preserve-3d',
                transform: 'translateZ(3px)',
                willChange: 'transform',
              }}
            >
              <svg
                viewBox="0 0 80 144"
                className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(0,230,187,0.5)]"
                fill="none"
              >
                {/* 1. Large 3D Forewing */}
                <path
                  d="M78,74 C72,42 56,12 24,4 C6,2 0,22 14,46 C24,62 44,74 78,76 Z"
                  fill="#030811"
                  stroke="url(#rim3DLeft)"
                  strokeWidth="2.2"
                />

                <path
                  d="M76,73 C70,43 54,16 26,8 C12,6 6,24 18,45 C28,59 46,71 76,74 Z"
                  fill="url(#morpho3DLeft)"
                />

                <path
                  d="M76,70 C70,44 54,20 30,12 C18,10 12,25 22,42 C30,55 48,67 76,71 Z"
                  fill="url(#specular3DLeft)"
                  opacity="0.8"
                />

                {/* Anatomical Venation Skeleton */}
                <path
                  d="M77,74 Q48,46 25,12 M77,74 Q42,54 22,36 M77,74 Q52,32 36,8 M77,74 Q32,60 16,48 M77,74 Q58,58 44,68"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M48,46 Q36,32 30,22 M42,54 Q28,42 20,38 M52,32 Q44,20 40,12 M32,60 Q24,56 16,52"
                  stroke="#67E8F9"
                  strokeWidth="0.8"
                  strokeOpacity="0.75"
                  strokeLinecap="round"
                />

                {/* Submarginal White Lunule Dots */}
                <circle cx="28" cy="7" r="2.2" fill="#FFFFFF" opacity="0.95" />
                <circle cx="18" cy="18" r="2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="10" cy="32" r="2.2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="14" cy="48" r="2" fill="#67E8F9" opacity="0.95" />
                <circle cx="22" cy="58" r="1.8" fill="#FFFFFF" opacity="0.85" />
                <circle cx="34" cy="66" r="1.6" fill="#00E6BB" opacity="0.9" />

                {/* 2. 3D Hindwing */}
                <path
                  d="M78,74 C58,84 28,94 20,112 C12,130 34,142 50,134 C64,128 72,106 78,82 Z"
                  fill="#030811"
                  stroke="url(#rim3DLeft)"
                  strokeWidth="2.2"
                />

                <path
                  d="M76,76 C58,85 30,96 24,112 C18,126 36,136 48,130 C60,124 68,104 76,82 Z"
                  fill="url(#morpho3DLeft)"
                />

                <path
                  d="M74,78 C60,86 36,96 30,110 C26,120 40,128 48,124 C56,118 64,102 74,84 Z"
                  fill="url(#specular3DLeft)"
                  opacity="0.7"
                />

                <path
                  d="M76,78 Q50,98 34,124 M76,78 Q58,110 48,132 M76,78 Q42,92 26,112"
                  stroke="#00E6BB"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* Hindwing Ocellus Eye Spots */}
                <circle cx="48" cy="128" r="3.2" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="48" cy="128" r="1.6" fill="#00E6BB" />
                <circle cx="32" cy="116" r="2.2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="22" cy="106" r="1.8" fill="#67E8F9" opacity="0.85" />
              </svg>
            </div>

            {/* ==================== 3D RIGHT WINGS COMPLEX ==================== */}
            <div
              className="absolute right-[2px] top-[2px] w-[32px] h-[56px] origin-left"
              style={{
                animation: `realistic3DFlapRight ${flapDuration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate`,
                transformStyle: 'preserve-3d',
                transform: 'translateZ(3px)',
                willChange: 'transform',
              }}
            >
              <svg
                viewBox="0 0 80 144"
                className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(0,230,187,0.5)]"
                fill="none"
              >
                {/* 1. Large 3D Forewing */}
                <path
                  d="M2,74 C8,42 24,12 56,4 C74,2 80,22 66,46 C56,62 36,74 2,76 Z"
                  fill="#030811"
                  stroke="url(#rim3DRight)"
                  strokeWidth="2.2"
                />

                <path
                  d="M4,73 C10,43 26,16 54,8 C68,6 74,24 62,45 C52,59 34,71 4,74 Z"
                  fill="url(#morpho3DRight)"
                />

                <path
                  d="M4,70 C10,44 26,20 50,12 C62,10 68,25 58,42 C50,55 32,67 4,71 Z"
                  fill="url(#specular3DRight)"
                  opacity="0.8"
                />

                {/* Forewing Veins */}
                <path
                  d="M3,74 Q32,46 55,12 M3,74 Q38,54 58,36 M3,74 Q28,32 44,8 M3,74 Q48,60 64,48 M3,74 Q22,58 36,68"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M32,46 Q44,32 50,22 M38,54 Q52,42 60,38 M28,32 Q36,20 40,12 M48,60 Q56,56 64,52"
                  stroke="#67E8F9"
                  strokeWidth="0.8"
                  strokeOpacity="0.75"
                  strokeLinecap="round"
                />

                {/* Forewing Spots */}
                <circle cx="52" cy="7" r="2.2" fill="#FFFFFF" opacity="0.95" />
                <circle cx="62" cy="18" r="2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="70" cy="32" r="2.2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="66" cy="48" r="2" fill="#67E8F9" opacity="0.95" />
                <circle cx="58" cy="58" r="1.8" fill="#FFFFFF" opacity="0.85" />
                <circle cx="46" cy="66" r="1.6" fill="#00E6BB" opacity="0.9" />

                {/* 2. 3D Hindwing */}
                <path
                  d="M2,74 C22,84 52,94 60,112 C68,130 46,142 30,134 C16,128 8,106 2,82 Z"
                  fill="#030811"
                  stroke="url(#rim3DRight)"
                  strokeWidth="2.2"
                />

                <path
                  d="M4,76 C22,85 50,96 56,112 C62,126 44,136 32,130 C20,124 12,104 4,82 Z"
                  fill="url(#morpho3DRight)"
                />

                <path
                  d="M6,78 C20,86 44,96 50,110 C54,120 40,128 32,124 C24,118 16,102 6,84 Z"
                  fill="url(#specular3DRight)"
                  opacity="0.7"
                />

                <path
                  d="M4,78 Q30,98 46,124 M4,78 Q22,110 32,132 M4,78 Q38,92 54,112"
                  stroke="#00E6BB"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* Hindwing Ocellus */}
                <circle cx="32" cy="128" r="3.2" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="32" cy="128" r="1.6" fill="#00E6BB" />
                <circle cx="48" cy="116" r="2.2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="58" cy="106" r="1.8" fill="#67E8F9" opacity="0.85" />
              </svg>
            </div>

            {/* ==================== 3D ELEVATED BODY & ANTENNAE ==================== */}
            <div
              className="relative z-20 w-4 h-13 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
              style={{
                transform: 'translateZ(8px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <svg viewBox="0 0 30 96" className="w-full h-full" fill="none">
                {/* 3D Arched Antennae with Sensor Bulbs */}
                <path
                  d="M13,26 C11,18 7,6 2,8"
                  stroke="#00E6BB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="2" cy="8" r="2.4" fill="#00E6BB" stroke="#FFFFFF" strokeWidth="0.8" />
                <circle cx="2" cy="8" r="1.2" fill="#FFFFFF" />

                <path
                  d="M17,26 C19,18 23,6 28,8"
                  stroke="#00E6BB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="28" cy="8" r="2.4" fill="#00E6BB" stroke="#FFFFFF" strokeWidth="0.8" />
                <circle cx="28" cy="8" r="1.2" fill="#FFFFFF" />

                {/* 3D Head & Compound Eyes */}
                <ellipse cx="15" cy="30" rx="4.5" ry="4" fill="url(#bodyCylinder3D)" stroke="#00E6BB" strokeWidth="1.2" />
                <circle cx="12" cy="29" r="1.8" fill="#00E6BB" />
                <circle cx="11.5" cy="28.5" r="0.7" fill="#FFFFFF" />
                <circle cx="18" cy="29" r="1.8" fill="#00E6BB" />
                <circle cx="17.5" cy="28.5" r="0.7" fill="#FFFFFF" />

                {/* 3D Volumetric Thorax */}
                <ellipse cx="15" cy="42" rx="4.2" ry="7.5" fill="url(#bodyCylinder3D)" stroke="#00E6BB" strokeWidth="1.2" />
                <ellipse cx="15" cy="42" rx="1.8" ry="5.5" fill="#00E6BB" opacity="0.85" />
                <ellipse cx="15" cy="42" rx="0.8" ry="3.5" fill="#FFFFFF" opacity="0.9" />

                {/* 3D Segmented Abdomen */}
                <ellipse cx="15" cy="64" rx="3.2" ry="14" fill="url(#bodyCylinder3D)" stroke="#00E6BB" strokeWidth="1" />
                <line x1="12.5" y1="55" x2="17.5" y2="55" stroke="#00E6BB" strokeWidth="1" strokeLinecap="round" />
                <line x1="12" y1="59" x2="18" y2="59" stroke="#00E6BB" strokeWidth="1" strokeLinecap="round" />
                <line x1="12.2" y1="63" x2="17.8" y2="63" stroke="#00E6BB" strokeWidth="1" strokeLinecap="round" />
                <line x1="12.5" y1="67" x2="17.5" y2="67" stroke="#00E6BB" strokeWidth="1" strokeLinecap="round" />
                <line x1="13" y1="71" x2="17" y2="71" stroke="#00E6BB" strokeWidth="1" strokeLinecap="round" />
                <line x1="13.5" y1="74" x2="16.5" y2="74" stroke="#00E6BB" strokeWidth="0.9" strokeLinecap="round" />
                <line x1="14" y1="76.5" x2="16" y2="76.5" stroke="#00E6BB" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS Keyframes for True 3D Wing Flapping Physics & Ground Shadow Pulsing */}
      <style>{`
        @keyframes realistic3DFlapLeft {
          0% {
            transform: translateZ(3px) rotateY(0deg) rotateZ(0deg) rotateX(0deg);
          }
          100% {
            transform: translateZ(8px) rotateY(-76deg) rotateZ(-10deg) rotateX(8deg);
          }
        }

        @keyframes realistic3DFlapRight {
          0% {
            transform: translateZ(3px) rotateY(0deg) rotateZ(0deg) rotateX(0deg);
          }
          100% {
            transform: translateZ(8px) rotateY(76deg) rotateZ(10deg) rotateX(8deg);
          }
        }

        @keyframes butterflyShadowPulse {
          0% {
            transform: translateZ(-28px) scale(1) scaleX(1);
            opacity: 0.55;
          }
          100% {
            transform: translateZ(-28px) scale(0.72) scaleX(0.5);
            opacity: 0.28;
          }
        }
      `}</style>
    </>
  );
};
