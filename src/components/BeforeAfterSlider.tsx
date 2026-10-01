import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-16 md:py-24 border-t border-white/5 bg-[#05080E]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CASE STUDY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Brand Transformation
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Slide to compare legacy raster logo vs modern luxury vector redesign.
          </p>

          {/* Quick preset buttons */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setSliderPosition(10)}
              className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
            >
              Before
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className="px-3 py-1 text-xs font-mono rounded-lg bg-[#00E6BB]/10 text-[#00E6BB] border border-[#00E6BB]/30 cursor-pointer font-semibold"
            >
              Split View
            </button>
            <button
              onClick={() => setSliderPosition(90)}
              className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
            >
              After
            </button>
          </div>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[340px] sm:h-[420px] rounded-3xl overflow-hidden select-none border border-white/10 shadow-2xl cursor-ew-resize bg-black"
          >
            {/* AFTER: Modern Brand */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80"
                alt="After Redesign"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-[#00E6BB]/40 text-[#00E6BB] text-xs font-mono font-bold">
                AFTER: Vector Identity (2026)
              </div>
            </div>

            {/* BEFORE: Legacy */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#00E6BB]"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="absolute inset-0 h-full bg-[#18181B] flex flex-col items-center justify-center p-6 text-center"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
              >
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-red-950/80 backdrop-blur-md border border-red-500/30 text-red-300 text-xs font-mono font-bold">
                  BEFORE: Legacy Mark
                </div>

                <div className="flex flex-col items-center max-w-xs opacity-75">
                  <span className="text-3xl mb-2">📉⚙️</span>
                  <h3 className="text-xl font-serif text-slate-300 line-through">
                    Nexus-Systems Co.
                  </h3>
                  <p className="text-[11px] text-red-300 font-mono mt-1">
                    72 DPI Raster • Unscalable
                  </p>
                </div>
              </div>
            </div>

            {/* Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#00E6BB] shadow-[0_0_15px_#00E6BB] z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full btn-gradient-cyan text-slate-950 flex items-center justify-center shadow-xl border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing">
                <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-slate-500 font-mono px-1">
            <span>← Slide left for Before</span>
            <span className="text-[#00E6BB]">Interactive Comparison</span>
            <span>Slide right for After →</span>
          </div>
        </div>

      </div>
    </section>
  );
};
