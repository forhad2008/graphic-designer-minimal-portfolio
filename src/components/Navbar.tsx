import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  MessageCircle,
  Menu,
  X,
  Search,
  Sparkles,
  Layers,
  Zap,
  ChevronDown,
  Calendar,
  Send,
  Star,
  Globe,
  HelpCircle,
  Briefcase,
  Sliders,
  Workflow,
  Phone,
  Mail
} from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { FIVERR_GIGS } from '../data/portfolioData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection: propActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(propActiveSection || 'portfolio');
  const [showTopNotice, setShowTopNotice] = useState(true);

  // Hover states for the circular symbolic buttons
  const [hoveredButton, setHoveredButton] = useState<'search' | 'whatsapp' | 'book' | 'menu' | null>(null);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when mobile menu is open on any device
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / winHeight) * 100));
        setScrollProgress(progress);
      }

      const sections = ['portfolio', 'services', 'pricing', 'estimator', 'process', 'reviews', 'social', 'contact', 'faq'];
      const scrollPosition = scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    onNavigate(id);
  };

  const handleMouseEnterDropdown = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const portfolioCategories = [
    { label: 'Brand Identity', desc: 'Minimalist luxury marks', icon: Sparkles },
    { label: 'Packaging & Labels', desc: '300 DPI CMYK dielines', icon: Layers },
    { label: 'Social Media Ads', desc: 'High-CTR campaign sets', icon: Zap },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        
        {/* Top Minimal Notice Bar */}
        {showTopNotice && (
          <div className="bg-[#05080E] border-b border-white/5 text-xs text-slate-300 py-1.5 px-4 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-white">Available for Q2 Projects</span>
                <span className="hidden sm:inline text-slate-500">·</span>
                <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">100% On-Time Delivery</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/8801342900364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#00E6BB] text-[11px] font-mono transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: +880 1342 900364</span>
                </a>
                <button
                  onClick={() => setShowTopNotice(false)}
                  className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Dismiss notice"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-[#030609]/90 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-2xl'
              : 'bg-[#030609]/60 backdrop-blur-md border-b border-white/5 py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            
            {/* Brand */}
            <div className="flex items-center shrink-0">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col group focus:outline-none"
              >
                <span className="text-sm sm:text-base font-bold text-white tracking-tight font-display group-hover:text-[#00E6BB] transition-colors leading-tight whitespace-nowrap">
                  Abdullah Forhad
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 whitespace-nowrap">
                  Brand &amp; Visual Design
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
              
              {/* Work */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterDropdown('work')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => handleLinkClick('portfolio')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    activeSection === 'portfolio'
                      ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Work</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {activeDropdown === 'work' && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-[#080C14] border border-white/10 rounded-2xl p-2.5 shadow-2xl animate-fadeIn z-50">
                    <div className="space-y-1">
                      {portfolioCategories.map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => handleLinkClick('portfolio')}
                          className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white">{cat.label}</div>
                            <div className="text-[10px] text-slate-400">{cat.desc}</div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Services */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnterDropdown('services')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => handleLinkClick('services')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    activeSection === 'services'
                      ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-[#080C14] border border-white/10 rounded-2xl p-3 shadow-2xl animate-fadeIn z-50">
                    <div className="space-y-1.5">
                      {FIVERR_GIGS.map((gig) => (
                        <button
                          key={gig.id}
                          onClick={() => handleLinkClick('services')}
                          className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white">{gig.category}</div>
                            <div className="text-[10px] text-slate-400">from ${gig.startingPrice} USD</div>
                          </div>
                          <span className="text-[10px] font-mono text-[#00E6BB]">5.0 ★</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <button
                onClick={() => handleLinkClick('pricing')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSection === 'pricing'
                    ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Pricing</span>
              </button>

              {/* Estimator */}
              <button
                onClick={() => handleLinkClick('estimator')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeSection === 'estimator'
                    ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Estimator</span>
                <span className="text-[9px] font-mono px-1 rounded bg-[#00E6BB]/20 text-[#00E6BB] font-bold">
                  Tool
                </span>
              </button>

              {/* Process */}
              <button
                onClick={() => handleLinkClick('process')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSection === 'process'
                    ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Process</span>
              </button>

              {/* Reviews */}
              <button
                onClick={() => handleLinkClick('reviews')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSection === 'reviews'
                    ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Reviews</span>
              </button>

              {/* FAQ */}
              <button
                onClick={() => handleLinkClick('faq')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSection === 'faq'
                    ? 'text-[#00E6BB] bg-[#00E6BB]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>FAQ</span>
              </button>

            </nav>

            {/* Right Action Suite: Round Symbolic Icons with Spring Transition Reveal */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* 1. ROUND SYMBOLIC SEARCH (⌘K) BUTTON WITH HOVER REVEAL */}
              <motion.button
                layout
                data-no-butterfly="true"
                data-round-icon="true"
                onMouseEnter={() => setHoveredButton('search')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => setCommandPaletteOpen(true)}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative h-9.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#00E6BB]/40 flex items-center overflow-hidden cursor-pointer shadow-sm group select-none transition-colors shrink-0"
                style={{
                  paddingLeft: '0.65rem',
                  paddingRight: '0.65rem',
                }}
                aria-label="Quick Search (⌘K)"
                title="Search (⌘K)"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-[#00E6BB] group-hover:scale-110 transition-transform" />
                </div>

                <AnimatePresence initial={false}>
                  {hoveredButton === 'search' ? (
                    <motion.div
                      key="search-label"
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="overflow-hidden whitespace-nowrap flex items-center gap-1.5 pr-1.5"
                    >
                      <span className="text-xs font-semibold text-white font-sans">
                        Quick Search
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                        ⌘K
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.button>

              {/* 2. ROUND SYMBOLIC WHATSAPP BUTTON WITH HOVER REVEAL */}
              <motion.a
                layout
                data-no-butterfly="true"
                data-round-icon="true"
                href="https://wa.me/8801342900364"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredButton('whatsapp')}
                onMouseLeave={() => setHoveredButton(null)}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative h-9.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-400/60 flex items-center overflow-hidden cursor-pointer shadow-sm group select-none transition-all shrink-0"
                style={{
                  paddingLeft: '0.65rem',
                  paddingRight: '0.65rem',
                }}
                aria-label="Direct WhatsApp Chat"
                title="Chat on WhatsApp"
              >
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <AnimatePresence initial={false}>
                  {hoveredButton === 'whatsapp' ? (
                    <motion.div
                      key="whatsapp-label"
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="overflow-hidden whitespace-nowrap flex items-center gap-1.5 pr-1.5"
                    >
                      <span className="text-xs font-semibold text-emerald-300 font-sans">
                        WhatsApp
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400/80">
                        +880 1342
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.a>

              {/* 3. ROUND SYMBOLIC BOOK PROJECT BUTTON WITH HOVER REVEAL */}
              <motion.button
                layout
                data-no-butterfly="true"
                data-round-icon="true"
                onClick={() => handleLinkClick('contact')}
                onMouseEnter={() => setHoveredButton('book')}
                onMouseLeave={() => setHoveredButton(null)}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative h-9.5 rounded-full btn-gradient-cyan text-slate-950 flex items-center overflow-hidden cursor-pointer shadow-[0_0_16px_rgba(0,230,187,0.3)] hover:shadow-[0_0_24px_rgba(0,230,187,0.5)] group select-none transition-shadow shrink-0 font-bold"
                style={{
                  paddingLeft: '0.65rem',
                  paddingRight: '0.65rem',
                }}
                aria-label="Book a Project"
                title="Book Project & Start Work"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 stroke-[2.5] group-hover:rotate-12 transition-transform text-slate-950" />
                </div>

                <AnimatePresence initial={false}>
                  {hoveredButton === 'book' ? (
                    <motion.div
                      key="book-label"
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="overflow-hidden whitespace-nowrap flex items-center gap-1 pr-1.5 text-xs font-extrabold text-slate-950"
                    >
                      <span>Book Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.button>

              {/* 4. ROUND SYMBOLIC MENU TOGGLE BUTTON WITH HOVER REVEAL */}
              <motion.button
                layout
                data-no-butterfly="true"
                data-round-icon="true"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                onMouseEnter={() => setHoveredButton('menu')}
                onMouseLeave={() => setHoveredButton(null)}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className={`relative h-9.5 rounded-full flex items-center overflow-hidden cursor-pointer select-none transition-all shrink-0 ${
                  mobileMenuOpen
                    ? 'bg-[#00E6BB]/20 border border-[#00E6BB] text-[#00E6BB] shadow-[0_0_16px_rgba(0,230,187,0.3)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-white/30 text-slate-300 hover:text-white'
                }`}
                style={{
                  paddingLeft: '0.65rem',
                  paddingRight: '0.65rem',
                }}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                title={mobileMenuOpen ? 'Close Menu (Esc)' : 'Open Quick Menu'}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close-icon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X className="w-4 h-4 text-[#00E6BB] stroke-[2.5]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu-icon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Menu className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence initial={false}>
                  {hoveredButton === 'menu' ? (
                    <motion.div
                      key="menu-label"
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="overflow-hidden whitespace-nowrap flex items-center gap-1.5 pr-1.5 text-xs font-semibold"
                    >
                      <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
                      <span className="text-[10px] font-mono opacity-60">Esc</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            </div>

          </div>

          {/* Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00E6BB] to-[#00B8FF]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

        </div>

        {/* All-Device Supported Menu Drawer & Modal Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Overlay with Blur (Click outside to close) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
                aria-hidden="true"
              />

              {/* Menu Container */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="fixed inset-x-3 sm:inset-x-6 top-18 sm:top-24 max-w-2xl mx-auto bg-[#070B13]/98 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 sm:p-6 space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-50 max-h-[84vh] overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-label="Site Navigation Menu"
              >
                {/* Header Bar inside Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase">
                      Quick Navigator
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00E6BB]/10 text-[#00E6BB] border border-[#00E6BB]/20">
                      8 Sections
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Navigation Grid with rich icons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => handleLinkClick('portfolio')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'portfolio'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Briefcase className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[10px] font-mono text-slate-400">01</span>
                    </div>
                    <div>
                      <div className="font-bold">Work</div>
                      <div className="text-[10px] text-slate-400">Featured Projects</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('services')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'services'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Layers className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[10px] font-mono text-slate-400">02</span>
                    </div>
                    <div>
                      <div className="font-bold">Services</div>
                      <div className="text-[10px] text-slate-400">Fiverr Pro Gigs</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('pricing')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'pricing'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Calendar className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[10px] font-mono text-slate-400">03</span>
                    </div>
                    <div>
                      <div className="font-bold">Pricing</div>
                      <div className="text-[10px] text-slate-400">Tier Packages</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('estimator')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'estimator'
                        ? 'bg-[#00E6BB]/25 text-[#00E6BB] font-bold border border-[#00E6BB]/50 shadow-[0_0_16px_rgba(0,230,187,0.2)]'
                        : 'bg-[#00E6BB]/10 text-[#00E6BB] hover:bg-[#00E6BB]/15 border border-[#00E6BB]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Zap className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00E6BB]/20 text-[#00E6BB] font-bold">CALC</span>
                    </div>
                    <div>
                      <div className="font-bold">Estimator</div>
                      <div className="text-[10px] text-emerald-400/80">Instant Quote</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('process')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'process'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Workflow className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[10px] font-mono text-slate-400">04</span>
                    </div>
                    <div>
                      <div className="font-bold">Process</div>
                      <div className="text-[10px] text-slate-400">4-Step Flow</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('reviews')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'reviews'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-mono text-slate-400">05</span>
                    </div>
                    <div>
                      <div className="font-bold">Reviews</div>
                      <div className="text-[10px] text-slate-400">5.0 Star Rating</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('social')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'social'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Globe className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[10px] font-mono text-slate-400">06</span>
                    </div>
                    <div>
                      <div className="font-bold">Social</div>
                      <div className="text-[10px] text-slate-400">Channels &amp; Proof</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('faq')}
                    className={`p-3 rounded-2xl text-left font-medium transition-all flex flex-col justify-between h-20.5 cursor-pointer ${
                      activeSection === 'faq'
                        ? 'bg-[#00E6BB]/15 text-[#00E6BB] font-bold border border-[#00E6BB]/40 shadow-[0_0_16px_rgba(0,230,187,0.15)]'
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <HelpCircle className="w-4 h-4 text-[#00E6BB]" />
                      <span className="text-[10px] font-mono text-slate-400">07</span>
                    </div>
                    <div>
                      <div className="font-bold">FAQ</div>
                      <div className="text-[10px] text-slate-400">Questions &amp; Help</div>
                    </div>
                  </button>
                </div>

                {/* Quick Action & Contact Suite with All Icons */}
                <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCommandPaletteOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-[#00E6BB]" />
                    <span>Search (⌘K)</span>
                  </button>

                  <a
                    href="https://wa.me/8801342900364"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 rounded-2xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Chat</span>
                  </a>

                  <button
                    onClick={() => handleLinkClick('contact')}
                    className="py-3 text-xs font-bold text-slate-950 btn-gradient-cyan rounded-2xl flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>Book Project</span>
                  </button>
                </div>

                {/* Quick Contacts Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400 px-1">
                  <a
                    href="mailto:contact@abdullahforhad.com"
                    className="flex items-center gap-1.5 hover:text-[#00E6BB] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Email Direct</span>
                  </a>
                  <a
                    href="tel:+8801342900364"
                    className="flex items-center gap-1.5 hover:text-[#00E6BB] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>Call Hotline</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </header>

      {/* Modern Floating Mobile Bottom Navigation Dock (1-thumb touch navigation) */}
      <nav
        aria-label="Mobile Navigation Dock"
        data-no-butterfly="true"
        className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-sm mx-auto bg-[#070B13]/90 backdrop-blur-2xl border border-white/15 rounded-full p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.7)] flex items-center justify-around"
      >
        {/* 1. Work */}
        <button
          onClick={() => handleLinkClick('portfolio')}
          className={`relative px-3 py-2 rounded-full flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
            activeSection === 'portfolio'
              ? 'text-[#00E6BB] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Work"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] font-medium leading-none">Work</span>
          {activeSection === 'portfolio' && (
            <motion.span
              layoutId="mobile-dock-dot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#00E6BB] shadow-[0_0_8px_#00E6BB]"
            />
          )}
        </button>

        {/* 2. Services */}
        <button
          onClick={() => handleLinkClick('services')}
          className={`relative px-3 py-2 rounded-full flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
            activeSection === 'services'
              ? 'text-[#00E6BB] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Services"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-medium leading-none">Services</span>
          {activeSection === 'services' && (
            <motion.span
              layoutId="mobile-dock-dot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#00E6BB] shadow-[0_0_8px_#00E6BB]"
            />
          )}
        </button>

        {/* 3. Estimator */}
        <button
          onClick={() => handleLinkClick('estimator')}
          className={`relative px-3 py-2 rounded-full flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
            activeSection === 'estimator'
              ? 'text-[#00E6BB] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Price Estimator"
        >
          <div className="relative">
            <Zap className="w-4 h-4 text-[#00E6BB]" />
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#00E6BB] animate-ping" />
          </div>
          <span className="text-[10px] font-medium leading-none text-[#00E6BB]">Estimate</span>
          {activeSection === 'estimator' && (
            <motion.span
              layoutId="mobile-dock-dot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#00E6BB] shadow-[0_0_8px_#00E6BB]"
            />
          )}
        </button>

        {/* 4. WhatsApp */}
        <a
          href="https://wa.me/8801342900364"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-3 py-2 rounded-full flex flex-col items-center gap-0.5 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
          title="WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-medium leading-none">Chat</span>
        </a>

        {/* 5. Menu / More */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative px-3 py-2 rounded-full flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
            mobileMenuOpen
              ? 'text-[#00E6BB] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          title="More Sections"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="text-[10px] font-medium leading-none">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </nav>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleLinkClick}
      />
    </>
  );
};
