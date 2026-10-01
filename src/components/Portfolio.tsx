import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioItem, CategoryType } from '../types';
import { DesignArtwork } from './DesignArtworks';
import { ArrowUpRight, FolderKanban, Eye, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioProps {
  onSelectItem: (item: PortfolioItem) => void;
  onOrderSimilar: (category: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectItem, onOrderSimilar }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'branding', label: 'Branding' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'social', label: 'Social Ads' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'print', label: 'Print' },
  ];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00E6BB] mb-1.5">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Selected Work
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Brand systems, print packaging, and digital marketing assets.
            </p>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#080C14] border border-white/10 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'btn-gradient-cyan text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelectItem(item)}
                className="group bg-[#080C14] rounded-2xl border border-white/10 overflow-hidden hover:border-[#00E6BB]/40 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                  <DesignArtwork
                    type={item.mockupType}
                    imageUrl={item.image}
                    altText={item.title}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white text-xs font-bold font-mono">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00E6BB]" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                      <span className="text-[#00E6BB] font-semibold">{item.categoryLabel}</span>
                      <span>{item.clientCountry}</span>
                    </div>

                    <h3 className="text-base font-bold text-white font-display group-hover:text-[#00E6BB] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1">
                      {item.colors.slice(0, 4).map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                    <span className="text-slate-300 group-hover:text-[#00E6BB] transition-colors">
                      Specs →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Minimal Bottom CTA Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#080C14] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white font-display">Need a custom design format?</h4>
            <p className="text-xs text-slate-400 mt-0.5">I create custom vector assets, 3D packaging wraps, and marketing kits.</p>
          </div>
          <button
            onClick={() => onOrderSimilar('Custom Project')}
            className="px-5 py-2.5 text-xs font-bold text-slate-950 btn-gradient-cyan hover:opacity-95 rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Request Custom Brief</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
