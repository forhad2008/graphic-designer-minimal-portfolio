import React from 'react';
import { ExternalLink, Share2 } from 'lucide-react';

export const SocialVisibility: React.FC = () => {
  const socialLinks = [
    {
      platform: 'Fiverr Pro',
      handle: '@abdullahforhad',
      url: 'https://fiverr.com',
      badge: '5.0 ★ Rating',
      followers: '180+ Orders',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
      description: 'Primary workspace with escrow buyer protection.'
    },
    {
      platform: 'Behance',
      handle: 'behance.net/abdullahforhad',
      url: 'https://behance.net',
      badge: 'Curated Works',
      followers: '14.8K Views',
      image: 'https://images.unsplash.com/photo-1608248597359-009947e45260?auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive brand identity and vector case studies.'
    },
    {
      platform: 'Dribbble',
      handle: 'dribbble.com/abdullahforhad',
      url: 'https://dribbble.com',
      badge: 'Daily Shots',
      followers: '6.2K Likes',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
      description: 'Vector logo marks, 3D explorations, and typography.'
    },
    {
      platform: 'LinkedIn',
      handle: 'Abdullah Forhad',
      url: 'https://linkedin.com',
      badge: 'Professional',
      followers: '3.2K Network',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
      description: 'B2B brand strategy and client partnerships.'
    },
    {
      platform: 'Instagram',
      handle: '@forhad.design',
      url: 'https://instagram.com',
      badge: '19.4K Community',
      followers: 'Daily Reels',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      description: 'Behind-the-scenes illustrator timelapses & design tips.'
    },
    {
      platform: 'WhatsApp Direct',
      handle: '+880 1342 900364',
      url: 'https://wa.me/8801342900364',
      badge: '&lt; 1h Reply',
      followers: 'Direct Desk',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80',
      description: 'Instant chat for project briefs and custom quotes.'
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-white/5 bg-[#03060A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <Share2 className="w-3.5 h-3.5" />
            <span>CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Network &amp; Socials
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Follow live design releases across platforms or message directly.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {socialLinks.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#080C14] rounded-2xl border border-white/10 hover:border-[#00E6BB]/40 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="relative w-full h-32 overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.platform}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/30 to-transparent" />
                
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-300 uppercase bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#00E6BB] font-bold border border-white/10">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-[#00E6BB] transition-colors flex items-center justify-between">
                    <span>{item.handle}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#00E6BB] font-medium">{item.followers}</span>
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    Visit →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
