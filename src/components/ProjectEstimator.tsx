import React, { useState, useMemo } from 'react';
import { Calculator, Check, Copy, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectEstimatorProps {
  onPreFillBooking: (briefData: {
    serviceType: string;
    budget: string;
    timeline: string;
    deliverables: string[];
    notes: string;
  }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onPreFillBooking }) => {
  const [serviceType, setServiceType] = useState<string>('brand-identity');
  const [conceptsCount, setConceptsCount] = useState<number>(4);
  const [turnaround, setTurnaround] = useState<'standard' | 'express'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'vector-sources',
    'mockups-3d',
    'commercial-rights',
  ]);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  const baseServices = [
    { id: 'brand-identity', name: 'Brand Identity & Logo', basePrice: 85, defaultDays: 3 },
    { id: 'social-ads', name: 'Social Media Ads Kit', basePrice: 65, defaultDays: 2 },
    { id: 'packaging', name: 'Product Packaging & Dielines', basePrice: 95, defaultDays: 4 },
    { id: 'youtube-digital', name: 'YouTube Thumbnails & Banners', basePrice: 40, defaultDays: 2 },
    { id: 'stationery-print', name: 'Corporate Stationery & Print', basePrice: 70, defaultDays: 3 },
  ];

  const addonsList = [
    { id: 'vector-sources', label: 'Master Vector Files (.AI, .SVG, .PSD)', price: 25 },
    { id: 'mockups-3d', label: '3D Presentation Mockups', price: 20 },
    { id: 'social-kit', label: 'Social Media Headers & Avatars', price: 30 },
    { id: 'brand-guide', label: 'Brand Guidelines PDF', price: 40 },
    { id: 'commercial-rights', label: 'Full Commercial License', price: 0 },
  ];

  const currentService = baseServices.find((s) => s.id === serviceType) || baseServices[0];

  const totalPrice = useMemo(() => {
    let price = currentService.basePrice;
    if (conceptsCount === 2) price -= 15;
    if (conceptsCount === 6) price += 40;

    selectedAddons.forEach((addonId) => {
      const addon = addonsList.find((a) => a.id === addonId);
      if (addon) price += addon.price;
    });

    if (turnaround === 'express') price += 35;
    return Math.max(35, price);
  }, [currentService, conceptsCount, selectedAddons, turnaround]);

  const deliveryDays = useMemo(() => {
    if (turnaround === 'express') return 1;
    return currentService.defaultDays;
  }, [currentService, turnaround]);

  const toggleAddon = (id: string) => {
    if (id === 'commercial-rights') return;
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyBrief = () => {
    const brief = `PROJECT BRIEF:
Service: ${currentService.name}
Concepts: ${conceptsCount}
Turnaround: ${turnaround === 'express' ? '24h Express' : `${deliveryDays} Days`}
Budget: $${totalPrice} USD
Abdullah Forhad (+8801342900364 / forhadalpha08@gmail.com)`;
    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  const handleProceedToBooking = () => {
    const chosenAddonNames = selectedAddons
      .map((id) => addonsList.find((a) => a.id === id)?.label || '')
      .filter(Boolean);

    onPreFillBooking({
      serviceType: currentService.name,
      budget: `$${totalPrice} USD`,
      timeline: turnaround === 'express' ? '24 Hours (Express)' : `${deliveryDays} Days`,
      deliverables: chosenAddonNames,
      notes: `Estimated via calculator: ${conceptsCount} concepts, ${turnaround} delivery.`,
    });
  };

  return (
    <section id="estimator" className="py-20 md:py-28 border-t border-white/5 bg-[#05080E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <Calculator className="w-3.5 h-3.5" />
            <span>ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Project Estimator
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Select deliverables and timeline for an instant fixed price estimate.
          </p>
        </div>

        {/* 2-Column Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
          
          {/* Left: Selectors (7 cols) */}
          <div className="lg:col-span-7 bg-[#080C14] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
            
            {/* Service */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase block mb-2 font-semibold">
                1. Service Discipline
              </label>
              <div className="space-y-1.5">
                {baseServices.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setServiceType(srv.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      serviceType === srv.id
                        ? 'bg-[#00E6BB]/10 border-[#00E6BB] text-white font-bold'
                        : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-sm">{srv.name}</span>
                    <span className="text-xs font-mono text-[#00E6BB]">from ${srv.basePrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Concepts */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase block mb-2 font-semibold">
                2. Initial Concepts
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4, 6].map((count) => (
                  <button
                    key={count}
                    onClick={() => setConceptsCount(count)}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      conceptsCount === count
                        ? 'btn-gradient-cyan text-slate-950 font-bold shadow-sm'
                        : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-sm font-display block">{count} Concepts</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Turnaround */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase block mb-2 font-semibold">
                3. Timeline
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTurnaround('standard')}
                  className={`p-3 rounded-xl border text-left cursor-pointer ${
                    turnaround === 'standard'
                      ? 'bg-[#00E6BB]/10 border-[#00E6BB] text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs font-semibold block">Standard</span>
                  <span className="text-[11px] font-mono text-slate-400">{currentService.defaultDays} Business Days</span>
                </button>

                <button
                  onClick={() => setTurnaround('express')}
                  className={`p-3 rounded-xl border text-left cursor-pointer ${
                    turnaround === 'express'
                      ? 'bg-amber-500/15 border-amber-400 text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    24h Express
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Rush (+ $35)</span>
                </button>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase block mb-2 font-semibold">
                4. Deliverables &amp; Formats
              </label>
              <div className="space-y-1.5">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer text-xs ${
                        isChecked
                          ? 'bg-white/[0.05] border-white/20 text-white'
                          : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${isChecked ? 'bg-[#00E6BB] text-slate-950 font-bold' : 'border border-slate-600'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.label}</span>
                      </div>
                      <span className="font-mono text-[#00E6BB]">{addon.price === 0 ? 'FREE' : `+$${addon.price}`}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Summary (5 cols) */}
          <div className="lg:col-span-5 bg-[#0A0F1D] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Estimated Total</span>
              <span className="text-xs font-mono text-[#00E6BB] font-bold">Fixed Fee</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-extrabold text-white font-mono tabular-nums">
                  ${totalPrice}
                </span>
                <span className="text-xs font-mono text-slate-400">USD</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Estimated turnaround: <strong className="text-[#00E6BB]">{turnaround === 'express' ? '24 Hours' : `${deliveryDays} Business Days`}</strong>
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-black/40 p-3.5 rounded-xl border border-white/5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Scope:</span>
                <span className="text-white truncate max-w-[160px]">{currentService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Concepts:</span>
                <span className="text-white">{conceptsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timeline:</span>
                <span className="text-white">{turnaround === 'express' ? '24h' : `${deliveryDays}d`}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedToBooking}
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 btn-gradient-cyan rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book This Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopyBrief}
                className="w-full py-2.5 px-4 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedBrief ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6BB]" />
                    <span className="text-[#00E6BB]">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Brief</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
