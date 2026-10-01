import React from 'react';
import { Compass, Palette, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export const DesignProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Brief & Direction',
      description: 'Review audience, benchmarks, aesthetic goals, and project scope.',
      icon: Compass,
      tool: 'Figma / Brief',
    },
    {
      number: '02',
      title: 'Vector Exploration',
      description: 'Draft 2 to 6 unique vector concepts adhering to strict grid geometry.',
      icon: Palette,
      tool: 'Illustrator',
    },
    {
      number: '03',
      title: 'Iterative Refinement',
      description: 'Fine-tune typography, color palettes, spacing, and 3D mockups.',
      icon: RefreshCw,
      tool: 'Photoshop',
    },
    {
      number: '04',
      title: 'Master Delivery',
      description: 'Package all vector source files, print PDFs, and copyright assignment.',
      icon: Send,
      tool: 'Vector Kits',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 bg-[#03060A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Design Workflow
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            4-step streamlined pipeline from creative brief to master vector delivery.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#080C14] rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-[#00E6BB]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-white/20 font-mono group-hover:text-[#00E6BB] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#00E6BB]/10 text-[#00E6BB] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    {step.tool}
                  </span>

                  <h3 className="text-base font-bold text-white font-display mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
