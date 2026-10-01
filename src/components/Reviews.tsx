import React from 'react';
import { CLIENT_REVIEWS } from '../data/portfolioData';
import { Star, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 border-t border-white/5 bg-[#05080E]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Client Feedback
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            5.0 ★ rating from founders across 14+ countries.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CLIENT_REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#080C14] rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-[#00E6BB]/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-[10px] font-mono text-[#00E6BB] bg-[#00E6BB]/10 px-2 py-0.5 rounded-full border border-[#00E6BB]/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Order ({rev.orderValue})
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-4 italic">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {rev.avatarUrl && (
                    <img
                      src={rev.avatarUrl}
                      alt={rev.clientName}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-white font-display text-xs">{rev.clientName}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{rev.country} · {rev.projectType}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Country Ribbon */}
        <div className="mt-10 p-4 rounded-xl bg-[#080C14] border border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-400 font-mono">
          <span>🇺🇸 United States</span>
          <span>🇬🇧 United Kingdom</span>
          <span>🇩🇪 Germany</span>
          <span>🇨🇦 Canada</span>
          <span>🇦🇺 Australia</span>
          <span>🇦🇪 UAE</span>
        </div>

      </div>
    </section>
  );
};
