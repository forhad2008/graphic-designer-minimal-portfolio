import React from 'react';
import { FIVERR_GIGS } from '../data/portfolioData';
import { FiverrGig } from '../types';
import { Star, CheckCircle2, ExternalLink, Award } from 'lucide-react';

interface ServicesGigsProps {
  onSelectGig: (gig: FiverrGig) => void;
}

export const ServicesGigs: React.FC<ServicesGigsProps> = ({ onSelectGig }) => {
  return (
    <section id="services" className="py-20 md:py-28 border-t border-white/5 bg-[#05080E]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <Award className="w-3.5 h-3.5" />
            <span>FIVERR GIGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Specialized Services
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Order via Fiverr escrow protection or commission direct milestones.
          </p>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIVERR_GIGS.map((gig) => (
            <div
              key={gig.id}
              className="bg-[#080C14] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#00E6BB]/40 transition-all duration-300 group"
            >
              <div>
                {/* Media Header */}
                <div className="relative w-full h-44 overflow-hidden bg-black">
                  <img
                    src={gig.image}
                    alt={gig.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-black/30" />

                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#00E6BB] border border-white/10">
                      {gig.badge || 'Gig'}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {gig.ordersInQueue} in queue
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white font-semibold bg-[#00E6BB]/20 px-2 py-0.5 rounded border border-[#00E6BB]/30">
                      {gig.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-[#00E6BB] transition-colors leading-snug">
                    {gig.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold ml-1 text-white">{gig.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-600">·</span>
                    <span>{gig.reviewsCount} reviews</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[#00E6BB]">100% On-Time</span>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs text-slate-300">
                    {gig.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6BB] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-3 bg-[#060910] border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">From</span>
                  <p className="text-2xl font-bold text-white font-mono">
                    ${gig.startingPrice} <span className="text-xs font-normal text-slate-400 font-sans">USD</span>
                  </p>
                </div>

                <button
                  onClick={() => onSelectGig(gig)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 btn-gradient-cyan hover:opacity-95 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Order on Fiverr</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
