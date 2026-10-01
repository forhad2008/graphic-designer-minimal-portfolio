import React, { useState } from 'react';

interface ArtworkProps {
  type: 'brand' | 'social' | 'packaging' | 'youtube' | 'print' | 'saas';
  imageUrl?: string;
  className?: string;
  altText?: string;
}

const DEFAULT_IMAGES: Record<string, string> = {
  brand: 'https://images.unsplash.com/photo-1608248597359-009947e45260?auto=format&fit=crop&w=1200&q=80',
  saas: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
  packaging: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=80',
  social: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  youtube: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  print: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
};

export const DesignArtwork: React.FC<ArtworkProps> = ({
  type,
  imageUrl,
  className = '',
  altText = 'Graphic design showcase preview'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const src = imageUrl || DEFAULT_IMAGES[type] || DEFAULT_IMAGES.brand;

  return (
    <div className={`relative w-full h-full min-h-[260px] overflow-hidden bg-[#070A10] group select-none ${className}`}>
      {/* Background image with subtle zoom on card hover */}
      <img
        src={src}
        alt={altText}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C111C] via-[#141C2E] to-[#0C111C] animate-pulse" />
      )}

      {/* Dark Vignette and Specular Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030609] via-transparent to-[#030609]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[#00E6BB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Floating Glass Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E6BB] animate-pulse" />
        <span className="uppercase tracking-wider font-semibold">{type}</span>
      </div>

      {/* Top Right High-Res Tag */}
      <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[9px] font-mono text-slate-300 border border-white/10">
        VECTOR / 4K
      </div>
    </div>
  );
};
