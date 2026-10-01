import React from 'react';
import { ArrowUp, Mail, Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#03060A] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg btn-gradient-cyan flex items-center justify-center text-slate-950 font-black text-xs font-display">
                AF
              </div>
              <span className="text-base font-bold text-white font-display">Abdullah Forhad</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Brand Identity, Packaging Dielines, and High-CTR Digital Creatives for founders worldwide.
            </p>
            <div className="flex items-center gap-1.5 text-[#00E6BB] font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5 text-xs">
            <span className="font-mono text-white uppercase font-bold text-[11px] block">Navigation</span>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-[#00E6BB] transition-colors cursor-pointer">
                  Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#00E6BB] transition-colors cursor-pointer">
                  Services &amp; Gigs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-[#00E6BB] transition-colors cursor-pointer">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('estimator')} className="hover:text-[#00E6BB] transition-colors cursor-pointer">
                  Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('process')} className="hover:text-[#00E6BB] transition-colors cursor-pointer">
                  Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#00E6BB] transition-colors cursor-pointer">
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-2.5 text-xs">
            <span className="font-mono text-white uppercase font-bold text-[11px] block">Contact</span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+8801342900364" className="hover:text-white font-mono">+880 1342 900364</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#00B8FF] shrink-0" />
                <a href="mailto:forhadalpha08@gmail.com" className="hover:text-white font-mono">forhadalpha08@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/8801342900364" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E6BB] font-mono">
                  WhatsApp: +880 1342 900364
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Abdullah Forhad. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a href="https://fiverr.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E6BB] transition-colors">
              Fiverr
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              Behance
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              Dribbble
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
