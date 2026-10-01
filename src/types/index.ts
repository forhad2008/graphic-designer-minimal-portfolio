export type CategoryType = 'all' | 'branding' | 'social' | 'packaging' | 'youtube' | 'print';

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  clientCountry?: string;
  category: CategoryType;
  categoryLabel: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  formats: string[];
  colors: { name: string; hex: string }[];
  fonts: string[];
  mockupType: 'brand' | 'social' | 'packaging' | 'youtube' | 'print' | 'saas';
  image: string;
  gallery?: string[];
  featured?: boolean;
  views?: string;
  likes?: string;
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    rating: number;
  };
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  deliveryDays: number;
  revisions: string;
  initialConcepts: number;
  popular?: boolean;
  features: {
    included: boolean;
    label: string;
  }[];
  fileFormats: string[];
  idealFor: string;
}

export interface FiverrGig {
  id: string;
  title: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  ordersInQueue: number;
  category: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  image: string;
  fiverrUrl: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  country: string;
  countryCode: string;
  projectType: string;
  rating: number;
  date: string;
  orderValue: string;
  reviewText: string;
  verifiedBuyer: boolean;
  avatarUrl?: string;
}

export interface ProjectBriefState {
  serviceType: string;
  packageTier: string;
  timeline: string;
  budget: string;
  deliverables: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectNotes: string;
}
