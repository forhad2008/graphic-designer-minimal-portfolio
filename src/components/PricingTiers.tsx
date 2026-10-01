import React, { useState } from 'react';
import { PRICING_PACKAGES } from '../data/portfolioData';
import { PricingPackage } from '../types';
import { Check, X, ArrowUpRight, Zap, Clock, Star } from 'lucide-react';

interface PricingTiersProps {
  onSelectPackage: (pkg: PricingPackage) => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'BDT'>('USD');

  const rates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    BDT: { symbol: '৳', rate: 118 },
  };

  const formatPrice = (usdPrice: number) => {
    const info = rates[currency];
    const converted = Math.round(usdPrice * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/5 relative bg-[#03060A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <Zap className="w-3.5 h-3.5" />
            <span>PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Transparent Packages
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Fixed flat rates. Full vector master files &amp; commercial copyright included.
          </p>

          {/* Currency Toggle */}
          <div className="mt-5 inline-flex items-center gap-1 p-1 bg-[#080C14] border border-white/10 rounded-xl">
            {(['USD', 'EUR', 'GBP', 'BDT'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  currency === curr
                    ? 'btn-gradient-cyan text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-[#0A0F1D] border-2 border-[#00E6BB]/60 shadow-[0_10px_35px_rgba(0,230,187,0.12)] p-7'
                  : 'bg-[#080C14] border border-white/10 p-6 sm:p-7'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full btn-gradient-cyan text-slate-950 text-[10px] font-black font-mono uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white font-display">
                    {pkg.name}
                  </h3>
                  <span className="text-xs font-mono text-[#00E6BB] font-semibold">
                    {pkg.initialConcepts} Concepts
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-1 min-h-[30px]">
                  {pkg.tagline}
                </p>

                {/* Price */}
                <div className="my-5 pb-5 border-b border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                      {formatPrice(pkg.priceUSD)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      / flat fee
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-3 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1 text-[#00E6BB]">
                      <Clock className="w-3 h-3" />
                      {pkg.deliveryDays} Days
                    </span>
                    <span>·</span>
                    <span className="text-amber-400">
                      {pkg.revisions}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      {feat.included ? (
                        <Check className="w-3.5 h-3.5 text-[#00E6BB] shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? 'text-slate-200' : 'text-slate-500 line-through'}>
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 mb-5 text-[11px] font-mono text-[#00E6BB]">
                  {pkg.fileFormats.join(' · ')}
                </div>
              </div>

              <button
                onClick={() => onSelectPackage(pkg)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  pkg.popular
                    ? 'btn-gradient-cyan text-slate-950 shadow-sm'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                }`}
              >
                <span>Select {pkg.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
