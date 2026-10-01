import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Portfolio } from './components/Portfolio';
import { PortfolioModal } from './components/PortfolioModal';
import { ServicesGigs } from './components/ServicesGigs';
import { PricingTiers } from './components/PricingTiers';
import { ProjectEstimator } from './components/ProjectEstimator';
import { Reviews } from './components/Reviews';
import { DesignProcess } from './components/DesignProcess';
import { SocialVisibility } from './components/SocialVisibility';
import { ContactBooking } from './components/ContactBooking';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingChat } from './components/FloatingChat';
import { ButterflyCursor } from './components/ButterflyCursor';
import { ScrollSection } from './components/ScrollSection';
import { PortfolioItem, PricingPackage, FiverrGig } from './types';

export default function App() {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [bookingPrefill, setBookingPrefill] = useState<{
    service?: string;
    budget?: string;
    timeline?: string;
    deliverables?: string[];
    notes?: string;
  }>({});

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    setBookingPrefill({
      service: `Logo & Brand Identity (${pkg.name})`,
      budget: `$${pkg.priceUSD} USD (${pkg.name})`,
      timeline: `${pkg.deliveryDays} Business Days`,
      deliverables: pkg.features.filter((f) => f.included).map((f) => f.label),
      notes: `Interested in the ${pkg.name} tier with ${pkg.revisions} and ${pkg.initialConcepts} initial concepts.`,
    });
    scrollToSection('contact');
  };

  const handleSelectGig = (gig: FiverrGig) => {
    window.open(gig.fiverrUrl, '_blank');
  };

  const handleEstimatorPrefill = (briefData: {
    serviceType: string;
    budget: string;
    timeline: string;
    deliverables: string[];
    notes: string;
  }) => {
    setBookingPrefill({
      service: briefData.serviceType,
      budget: briefData.budget,
      timeline: briefData.timeline,
      deliverables: briefData.deliverables,
      notes: briefData.notes,
    });
    scrollToSection('contact');
  };

  const handleOrderSimilar = (categoryOrTitle: string) => {
    setBookingPrefill({
      service: `Custom Design: ${categoryOrTitle}`,
      budget: '$120 - $280 USD',
      timeline: '3-5 Business Days',
      notes: `I would like a design similar to "${categoryOrTitle}". Please advise on next steps.`,
    });
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#030609] text-[#F3F4F6] relative overflow-x-hidden flex flex-col font-sans selection:bg-[#00E6BB]/25 selection:text-[#00E6BB]">
      {/* Real Animated Butterfly Cursor Avatar */}
      <ButterflyCursor />

      {/* Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Hero Section with Cinematic Staggered Entrance */}
      <Hero
        onExploreWork={() => scrollToSection('portfolio')}
        onBookProject={() => scrollToSection('contact')}
        onOpenEstimator={() => scrollToSection('estimator')}
      />

      {/* Interactive Before & After Graphic Redesign Comparison */}
      <ScrollSection distance={40} duration={0.8}>
        <BeforeAfterSlider />
      </ScrollSection>

      {/* Portfolio Showcase */}
      <ScrollSection id="portfolio" distance={45} duration={0.8}>
        <Portfolio
          onSelectItem={(item) => setSelectedPortfolioItem(item)}
          onOrderSimilar={handleOrderSimilar}
        />
      </ScrollSection>

      {/* Fiverr Gigs & Specialized Services */}
      <ScrollSection id="services" distance={40} duration={0.8}>
        <ServicesGigs onSelectGig={handleSelectGig} />
      </ScrollSection>

      {/* Transparent Pricing Tiers */}
      <ScrollSection id="pricing" distance={45} duration={0.8}>
        <PricingTiers onSelectPackage={handleSelectPackage} />
      </ScrollSection>

      {/* Interactive Project Cost & Scope Estimator */}
      <ScrollSection id="estimator" distance={40} duration={0.8}>
        <ProjectEstimator onPreFillBooking={handleEstimatorPrefill} />
      </ScrollSection>

      {/* 4-Step Design Workflow */}
      <ScrollSection id="process" distance={40} duration={0.8}>
        <DesignProcess />
      </ScrollSection>

      {/* Client Reviews & Fiverr Testimonials */}
      <ScrollSection id="reviews" distance={40} duration={0.8}>
        <Reviews />
      </ScrollSection>

      {/* Social Media & Visibility Integration */}
      <ScrollSection id="social" distance={40} duration={0.8}>
        <SocialVisibility />
      </ScrollSection>

      {/* Client Booking & Contact Form */}
      <ScrollSection id="contact" distance={45} duration={0.8}>
        <ContactBooking
          initialService={bookingPrefill.service}
          initialBudget={bookingPrefill.budget}
          initialTimeline={bookingPrefill.timeline}
          initialDeliverables={bookingPrefill.deliverables}
          initialNotes={bookingPrefill.notes}
        />
      </ScrollSection>

      {/* FAQ Accordion */}
      <ScrollSection id="faq" distance={40} duration={0.8}>
        <FAQ />
      </ScrollSection>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Portfolio Lightbox Modal */}
      <PortfolioModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onBookSimilar={handleOrderSimilar}
      />

      {/* Animated Bottom Corner Chat Feature with Icon Morphing */}
      <FloatingChat />
    </div>
  );
}
