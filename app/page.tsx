'use client';

import { useState } from 'react';
import ConsentModal from './components/ConsentModal';
import VisitorCounter from './components/VisitorCounter';
import ImageCarousel from './components/ImageCarousel';
import MemoSection from './components/MemoSection';
import SignatureCounters from './components/SignatureCounters';
import SignatureBoardSection from './components/SignatureBoardSection';
import MemoriesSection from './components/MemoriesSection';

export default function Home() {
  const [showConsent, setShowConsent] = useState(true);

  // Carousel items with college images
  const carouselItems = [
    {
      id: 1,
      src: '/sbrr-mahajana-first-grade-college-mysore-70722.png',
      alt: 'SBRR Mahajanas College Campus',
    },
    {
      id: 2,
      src: '/sbrr-mahajana-first-grade-college-mysore-70723.png',
      alt: 'SBRR Mahajanas College Building',
    },
    {
      id: 3,
      src: '/sbrr-mahajana-first-grade-college-mysore-70724.png',
      alt: 'SBRR Mahajanas College View',
    },
  ];

  const handleConsent = () => {
    setShowConsent(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Consent Modal */}
      {showConsent && <ConsentModal onConsent={handleConsent} />}

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 flex justify-between items-center">
          <img
            src="/MES-Logo.png"
            alt="MES Logo"
            className="h-8 sm:h-10 lg:h-12 w-auto"
          />
          <VisitorCounter />
        </div>
      </nav>

      {/* Hero Section - Full Screen Carousel */}
      <ImageCarousel items={carouselItems} fullHeight={true} />

      {/* Memo Section with Petition */}
      <MemoSection />

      {/* Signature Board - Wall of Support */}
      <SignatureBoardSection />

      {/* Signature Counters */}
      <SignatureCounters />

      {/* Memories Section */}
      <MemoriesSection />
    </div>
  );
}
