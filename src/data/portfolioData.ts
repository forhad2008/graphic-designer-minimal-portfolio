import { PortfolioItem, FiverrGig, PricingPackage, ClientReview } from '../types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'aura-botanicals',
    title: 'Aura Botanicals',
    client: 'Aura Skincare Ltd.',
    clientCountry: 'UK',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    year: '2026',
    views: '4.8k',
    likes: '640',
    image: 'https://images.unsplash.com/photo-1608248597359-009947e45260?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-009947e45260?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Minimalist luxury brand identity for an organic skincare line.',
    challenge: 'Needed a refined, high-end mark conveying botanical science and luxury.',
    solution: 'Designed an organic geometric emblem, typography system, and eco packaging dielines.',
    deliverables: ['Primary Logo', 'Brand Guidelines', 'Stationery Kit', 'Packaging Dielines'],
    formats: ['.AI', '.SVG', '.PDF', '.PSD', '300 DPI CMYK'],
    colors: [
      { name: 'Emerald', hex: '#059669' },
      { name: 'Mint', hex: '#34D399' },
      { name: 'Cream', hex: '#FDFBF7' },
      { name: 'Slate', hex: '#0F172A' },
      { name: 'Gold', hex: '#D97706' }
    ],
    fonts: ['Syne Bold', 'Plus Jakarta Sans'],
    mockupType: 'brand',
    featured: true,
    testimonial: {
      quote: "World-class luxury identity. Fast, organized, and print-ready.",
      author: 'Eleanor Vance',
      company: 'Founder, Aura Botanicals UK',
      rating: 5
    }
  },
  {
    id: 'synapse-ai',
    title: 'Synapse AI',
    client: 'Synapse Technologies',
    clientCountry: 'USA',
    category: 'branding',
    categoryLabel: 'Tech Identity',
    year: '2026',
    views: '6.2k',
    likes: '890',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Visual identity and vector asset kit for an enterprise AI platform.',
    challenge: 'Required a futuristic emblem recognizable from 16px icons to 4K displays.',
    solution: 'Engineered an interlocking neural polygon mark with precision grid geometry.',
    deliverables: ['App Icon System', 'Vector Brandmark', 'Dark/Light Assets', 'Pitch Deck Templates'],
    formats: ['.AI', '.SVG', '.PNG', '.PDF', 'Figma'],
    colors: [
      { name: 'Cyan', hex: '#00E6BB' },
      { name: 'Cobalt', hex: '#00B8FF' },
      { name: 'Charcoal', hex: '#030609' },
      { name: 'Violet', hex: '#7C3AED' }
    ],
    fonts: ['Space Grotesk', 'Plus Jakarta Sans'],
    mockupType: 'saas',
    featured: true,
    testimonial: {
      quote: "Delivered 4 distinct concepts in 48 hours. Precise vectors saved us weeks.",
      author: 'Marcus Brody',
      company: 'CTO, Synapse AI',
      rating: 5
    }
  },
  {
    id: 'velo-coffee',
    title: 'Velo Roasters',
    client: 'Velo Roasters',
    clientCountry: 'Australia',
    category: 'packaging',
    categoryLabel: 'Packaging',
    year: '2026',
    views: '3.9k',
    likes: '510',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Artisanal coffee packaging, pouch labels, and print dielines.',
    challenge: 'Distinctive packaging with modular color codes for single-origin batches.',
    solution: 'Designed textured dielines with metallic foil plates and clean typography.',
    deliverables: ['Pouch Dieline (250g/1kg)', 'Cold Brew Labels', '3D Client Mockups'],
    formats: ['.AI Dieline', 'PDF/X-1a', '3D Renders', '.PSD'],
    colors: [
      { name: 'Amber', hex: '#F59E0B' },
      { name: 'Espresso', hex: '#1C1917' },
      { name: 'Terracotta', hex: '#EA580C' },
      { name: 'Linen', hex: '#F5F5F4' }
    ],
    fonts: ['Cabinet Grotesk', 'JetBrains Mono'],
    mockupType: 'packaging',
    featured: true,
    testimonial: {
      quote: "Print dielines were 100% production-ready. Flawless execution.",
      author: 'Liam Henderson',
      company: 'Head of Coffee, Velo',
      rating: 5
    }
  },
  {
    id: 'ignite-summer-ads',
    title: 'Ignite Streetwear',
    client: 'Ignite Apparel',
    clientCountry: 'Canada',
    category: 'social',
    categoryLabel: 'Social Ads',
    year: '2026',
    views: '5.1k',
    likes: '720',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'High-converting social ad campaign kit for a streetwear drop.',
    challenge: 'Needed bold visual layouts to stop the scroll and drive CTR.',
    solution: 'Crafted high-contrast layouts with impactful typography and product anchors.',
    deliverables: ['12 Feed Ads (1080x1080)', '12 Story Ads (1080x1920)', 'Canva/PSD Templates'],
    formats: ['.PSD Layered', 'Web PNG', 'Canva Link'],
    colors: [
      { name: 'Neon Pink', hex: '#EC4899' },
      { name: 'Yellow', hex: '#FACC15' },
      { name: 'Indigo', hex: '#1E1B4B' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    fonts: ['Syne Extra Bold', 'Plus Jakarta Sans'],
    mockupType: 'social',
    featured: false,
    testimonial: {
      quote: "Our ROAS doubled with Abdullah's creative ad templates.",
      author: 'Samantha Cruz',
      company: 'Growth, Ignite Apparel',
      rating: 5
    }
  },
  {
    id: 'pixel-pulse-youtube',
    title: 'Apex Gaming Tech',
    client: 'Apex Reviews',
    clientCountry: 'USA',
    category: 'youtube',
    categoryLabel: 'YouTube Media',
    year: '2026',
    views: '8.4k',
    likes: '1.2k',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'High-CTR thumbnail templates and channel graphics for YouTube.',
    challenge: 'Maximum visual clarity and engagement on small mobile feeds.',
    solution: 'Designed 3D text styling, subject rim lighting, and curiosity cues.',
    deliverables: ['10 Thumbnail Templates', 'Channel Banner', 'Vector Badges'],
    formats: ['.PSD', 'FHD PNG', '.SVG'],
    colors: [
      { name: 'Laser Red', hex: '#EF4444' },
      { name: 'Electric Yellow', hex: '#FBBF24' },
      { name: 'Dark Void', hex: '#030712' },
      { name: 'Cyan', hex: '#22D3EE' }
    ],
    fonts: ['Syne Black', 'JetBrains Mono'],
    mockupType: 'youtube',
    featured: false,
    testimonial: {
      quote: "Click-through rate spiked on every video upload. Top creator designer.",
      author: 'Dave Miller',
      company: 'Apex Reviews',
      rating: 5
    }
  },
  {
    id: 'vane-capital-corporate',
    title: 'Vane Capital',
    client: 'Vane Capital',
    clientCountry: 'UAE',
    category: 'print',
    categoryLabel: 'Corporate Print',
    year: '2026',
    views: '3.4k',
    likes: '480',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Executive corporate identity, foil business cards, and prospectus.',
    challenge: 'Authoritative luxury aesthetic for institutional private equity partners.',
    solution: 'Geometric grid layout with gold foil separation layers and clean typography.',
    deliverables: ['Foil Cards', '16-Page Prospectus', 'Letterhead & Envelopes'],
    formats: ['Print PDF (CMYK)', '.AI', '.INDD'],
    colors: [
      { name: 'Royal Navy', hex: '#0F172A' },
      { name: 'Gold Foil', hex: '#D97706' },
      { name: 'Cotton', hex: '#F8FAFC' },
      { name: 'Graphite', hex: '#334155' }
    ],
    fonts: ['Cinzel', 'Plus Jakarta Sans'],
    mockupType: 'print',
    featured: false,
    testimonial: {
      quote: "Precision print production. Clean bleed margins and luxury finish.",
      author: 'Tariq Al-Mansoor',
      company: 'Partner, Vane Capital',
      rating: 5
    }
  }
];

export const FIVERR_GIGS: FiverrGig[] = [
  {
    id: 'gig-brand-identity',
    title: 'Minimalist Luxury Logo & Brand Identity',
    rating: 5.0,
    reviewsCount: 124,
    startingPrice: 45,
    ordersInQueue: 4,
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    features: [
      '2 to 6 Custom Logo Concepts',
      'Vector Files (.AI, .EPS, .SVG, .PDF)',
      '3D Realistic Mockups & Social Kit',
      'Brand Guidelines & Color System',
      '100% Commercial Copyright'
    ],
    fiverrUrl: 'https://fiverr.com'
  },
  {
    id: 'gig-social-ads',
    title: 'High-Converting Social Media Ads & Posts',
    rating: 5.0,
    reviewsCount: 88,
    startingPrice: 35,
    ordersInQueue: 3,
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    badge: 'High CTR',
    features: [
      'Feed Posts, Stories & Reels Covers',
      'Facebook, Instagram & X Graphics',
      'High-CTR Tested Visual Layouts',
      'Editable PSD / Canva Sources',
      '24-Hour Delivery Option'
    ],
    fiverrUrl: 'https://fiverr.com'
  },
  {
    id: 'gig-packaging',
    title: 'Product Packaging, Label & Box Dielines',
    rating: 4.9,
    reviewsCount: 65,
    startingPrice: 65,
    ordersInQueue: 2,
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
    badge: 'Print Ready',
    features: [
      '300 DPI CMYK Bleed Dielines',
      'Photorealistic 3D Renders',
      'Barcode & Compliance Layouts',
      'Spot UV / Foil Separation',
      'Unlimited Revisions'
    ],
    fiverrUrl: 'https://fiverr.com'
  },
  {
    id: 'gig-thumbnails',
    title: 'Viral YouTube Thumbnails & Banners',
    rating: 5.0,
    reviewsCount: 92,
    startingPrice: 25,
    ordersInQueue: 5,
    category: 'YouTube Media',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    badge: 'Viral CTR',
    features: [
      'High-CTR Tested Composition',
      '3D Typography & Face Grading',
      'FHD 1920x1080 PNG & PSD',
      'Matching Channel Banner',
      'Express 12-24h Delivery'
    ],
    fiverrUrl: 'https://fiverr.com'
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Ideal for fast launches and solo founders',
    priceUSD: 45,
    deliveryDays: 2,
    revisions: '3 Revisions',
    initialConcepts: 2,
    idealFor: 'Quick logo refresh or single visual asset',
    features: [
      { included: true, label: '2 Initial Concepts' },
      { included: true, label: 'High-Res PNG & JPG (300 DPI)' },
      { included: true, label: 'Transparent Backgrounds' },
      { included: true, label: '3 Iterative Revisions' },
      { included: true, label: 'Commercial Rights' },
      { included: false, label: 'Vector Source Files (.AI, .EPS)' },
      { included: false, label: 'Brand Guidelines Document' },
      { included: false, label: 'Priority VIP Support' }
    ],
    fileFormats: ['PNG', 'JPG', 'PDF']
  },
  {
    id: 'standard',
    name: 'Standard Pro',
    tagline: 'Most popular for growing brands & startups',
    priceUSD: 120,
    deliveryDays: 3,
    revisions: 'Unlimited',
    initialConcepts: 4,
    popular: true,
    idealFor: 'Complete identity with full vector source files',
    features: [
      { included: true, label: '4 Custom Concepts' },
      { included: true, label: 'Master Vector Files (.AI, .EPS, .SVG)' },
      { included: true, label: 'Print-Ready PDF (300 DPI Bleeds)' },
      { included: true, label: 'Layered PSD Files' },
      { included: true, label: '3D Client Mockups' },
      { included: true, label: 'Social Media Kit (5 Assets)' },
      { included: true, label: 'Unlimited Revisions' },
      { included: true, label: 'Full Commercial License' }
    ],
    fileFormats: ['.AI', '.EPS', '.SVG', '.PDF', '.PSD', 'PNG']
  },
  {
    id: 'premium',
    name: 'Premium Suite',
    tagline: 'Complete comprehensive brand transformation',
    priceUSD: 280,
    deliveryDays: 5,
    revisions: 'Unlimited + VIP',
    initialConcepts: 6,
    idealFor: 'Full corporate identity, guidelines & packaging',
    features: [
      { included: true, label: '6 Comprehensive Concepts' },
      { included: true, label: 'All Master Source Files' },
      { included: true, label: '24-Page Brand Style Guide' },
      { included: true, label: 'Stationery Suite (Cards, Letterhead)' },
      { included: true, label: 'Social Media Pack (15 Templates)' },
      { included: true, label: 'Packaging / Dieline Setup' },
      { included: true, label: 'Font & Color Licensing Guide' },
      { included: true, label: 'VIP Priority Fast-Track' }
    ],
    fileFormats: ['.AI', '.EPS', '.SVG', '.PDF', '.PSD', '.INDD']
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Sarah Jenkins',
    country: 'United States',
    countryCode: 'US',
    projectType: 'Brand Identity',
    rating: 5,
    date: '3 days ago',
    orderValue: '$180',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    reviewText: 'Abdullah delivered 4 concepts, all looking like a top agency. Clean, organized vectors ready for production.',
    verifiedBuyer: true
  },
  {
    id: 'rev-2',
    clientName: 'Oliver Smith',
    country: 'United Kingdom',
    countryCode: 'GB',
    projectType: 'Packaging & Dieline',
    rating: 5,
    date: '1 week ago',
    orderValue: '$260',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    reviewText: 'Flawless printer bleeds, barcode positioning, and foil plates. Our local print shop approved without a single change.',
    verifiedBuyer: true
  },
  {
    id: 'rev-3',
    clientName: 'Lukas Meyer',
    country: 'Germany',
    countryCode: 'DE',
    projectType: 'SaaS App Icon & UI',
    rating: 5,
    date: '2 weeks ago',
    orderValue: '$140',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    reviewText: 'Fast turnaround and crisp geometric design. Abdullah revised every variation promptly until we got the exact look.',
    verifiedBuyer: true
  },
  {
    id: 'rev-4',
    clientName: 'Alexandre Dupont',
    country: 'Canada',
    countryCode: 'CA',
    projectType: 'YouTube Graphics',
    rating: 5,
    date: '3 weeks ago',
    orderValue: '$95',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    reviewText: 'Our YouTube click-through rate jumped noticeably. The text pops with clarity even on small mobile screens.',
    verifiedBuyer: true
  },
  {
    id: 'rev-5',
    clientName: 'Fatima Al-Sayed',
    country: 'UAE',
    countryCode: 'AE',
    projectType: 'Corporate Stationery',
    rating: 5,
    date: '1 month ago',
    orderValue: '$320',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    reviewText: 'True professionalism. Gold foil cards, presentation decks, and a 16-page booklet delivered on schedule.',
    verifiedBuyer: true
  }
];

export const FAQS = [
  {
    question: 'What source files will I receive?',
    answer: 'Master editable vector files: Adobe Illustrator (.AI), Scalable Vector (.SVG & .EPS), Adobe Photoshop (.PSD), and 300 DPI CMYK print-ready PDF.'
  },
  {
    question: 'Do I get full commercial copyright?',
    answer: 'Yes. Upon delivery, you receive 100% exclusive commercial rights and copyright ownership for digital, print, and trademark use.'
  },
  {
    question: 'Can I order directly through Fiverr?',
    answer: 'Yes. You can order via Fiverr for escrow buyer protection or book directly via the contact form or WhatsApp.'
  },
  {
    question: 'How do revisions work?',
    answer: 'Quick iterative adjustments on typography, colors, and layout. Standard and Premium packages include unlimited revisions.'
  },
  {
    question: 'What is your turnaround time?',
    answer: 'Standard delivery is 2–4 business days. Urgent 24-hour express delivery is available upon request.'
  },
  {
    question: 'How do we start a project?',
    answer: 'Use the Cost Estimator or Contact Form below, or message directly on WhatsApp (+880 1342 900364) to start immediately.'
  }
];
