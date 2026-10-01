import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  Zap,
  Gem,
  ShieldCheck,
  Check,
  ArrowUpRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onBookProject: () => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onBookProject, onOpenEstimator }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'brand' | 'packaging' | 'social'>('brand');

  const brandColors = [
    { hex: '#00E6BB', label: '#00E6BB', name: 'Cyan' },
    { hex: '#00B8FF', label: '#00B8FF', name: 'Cobalt' },
    { hex: '#0E1524', label: '#0E1524', name: 'Slate' },
    { hex: '#F3F4F6', label: '#F3F4F6', name: 'White' },
  ];

  const showcaseItems = {
    brand: {
      title: 'Aura Botanicals',
      category: 'Brand Identity',
      image: 'https://images.unsplash.com/photo-1608248597359-009947e45260?auto=format&fit=crop&w=1000&q=80',
      tag: 'Vector AI / 300DPI',
      font: 'Syne + Plus Jakarta Sans',
    },
    packaging: {
      title: 'Velo Roasters',
      category: 'Packaging Dieline',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1000&q=80',
      tag: 'CMYK Bleeds + Foil',
      font: 'Cabinet Grotesk + Mono',
    },
    social: {
      title: 'Ignite Streetwear',
      category: 'Social Ad Campaign',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      tag: 'Feed & Story PSD',
      font: 'Syne Extra Bold',
    },
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const activeItem = showcaseItems[activeShowcaseTab];

  return (
    <section className="relative pt-32 pb-14 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[450px] bg-[#00E6BB]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-[#00B8FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-center">
          
          {/* LEFT COLUMN: Minimal Typography & Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="xl:col-span-5 space-y-5 text-left"
          >
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">Available for Q2 Projects</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400 font-semibold">5.0 ★ (120+ Reviews)</span>
            </div>

            {/* Clean Punchy Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Strategic Design.<br />
              <span className="text-gradient-cyan">Memorable Brands.</span>
            </h1>

            {/* Short Minimal Subcopy */}
            <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-normal">
              Brand identity, print packaging, and high-CTR visual assets for founders and creators worldwide.
            </p>

            {/* 4 Minimal Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#00E6BB] font-mono block font-bold">100%</span>
                <span className="text-[11px] text-slate-400">On-Time</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#00E6BB] font-mono block font-bold">24-48h</span>
                <span className="text-[11px] text-slate-400">Turnaround</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#00E6BB] font-mono block font-bold">Vector</span>
                <span className="text-[11px] text-slate-400">Master Files</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#00E6BB] font-mono block font-bold">Full Rights</span>
                <span className="text-[11px] text-slate-400">Commercial</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreWork}
                className="px-6 py-3 text-xs font-extrabold text-slate-950 btn-gradient-cyan hover:opacity-95 rounded-xl transition-all shadow-[0_0_20px_rgba(0,230,187,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>View Portfolio</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="px-5 py-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00E6BB]" />
                <span>Estimate Project</span>
              </button>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Minimal Design Showcase Container (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="xl:col-span-7"
          >
            <div className="relative rounded-3xl bg-[#070A11] border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00E6BB]/15 text-[#00E6BB] flex items-center justify-center font-bold text-xs">
                    AF
                  </div>
                  <span className="text-xs font-bold text-white font-display">
                    Featured Case Studies
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
                  {(['brand', 'packaging', 'social'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveShowcaseTab(tab)}
                      className={`px-3 py-1 text-[11px] font-mono uppercase rounded-lg transition-all cursor-pointer ${
                        activeShowcaseTab === tab
                          ? 'bg-[#00E6BB] text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Image Card (8 cols) */}
                <div className="lg:col-span-8 rounded-2xl bg-black border border-white/10 relative overflow-hidden group min-h-[260px]">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover min-h-[260px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#00E6BB] block font-semibold">
                        {activeItem.category}
                      </span>
                      <h3 className="text-base font-bold text-white font-display">
                        {activeItem.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                      {activeItem.tag}
                    </span>
                  </div>
                </div>

                {/* Specs (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
                  
                  {/* Palette */}
                  <div className="p-3 rounded-2xl bg-[#0C101A] border border-white/5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-2">
                      <span>Palette</span>
                      <span className="text-[9px] text-slate-500">Click to copy</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {brandColors.map((c) => (
                        <button
                          key={c.hex}
                          onClick={() => copyHex(c.hex)}
                          className="flex flex-col items-center cursor-pointer group/c"
                          title={`Copy ${c.hex}`}
                        >
                          <div
                            className="w-full aspect-square rounded-lg mb-1 border border-white/15 transition-transform group-hover/c:scale-105 flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          >
                            {copiedHex === c.hex && (
                              <Check className="w-3 h-3 text-slate-950 font-bold" />
                            )}
                          </div>
                          <span className="text-[7px] font-mono text-slate-400 truncate w-full text-center">
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font pairing */}
                  <div className="p-3 rounded-2xl bg-[#0C101A] border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Typography</span>
                    <span className="text-xs font-bold text-white block truncate">{activeItem.font}</span>
                  </div>

                  {/* Start project link */}
                  <button
                    onClick={onBookProject}
                    className="p-2.5 rounded-xl bg-[#00E6BB]/10 hover:bg-[#00E6BB]/20 border border-[#00E6BB]/30 text-[#00E6BB] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Start Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
