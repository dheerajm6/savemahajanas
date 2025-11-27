'use client';

import PetitionMemo from './PetitionMemo';

export default function MemoSection() {
  return (
    <section id="petition-section" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Join the Movement */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Join the Movement
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Add your voice. Your signature represents your commitment to keeping SBRR Mahajans as a beacon of affordable, quality public education.
          </p>
        </div>

        {/* Together We Are Strong Section */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 sm:p-8 lg:p-10 border-2 border-blue-200">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Together We Are Strong
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-600">✓</span>
                <span className="text-gray-700">Your signature carries weight in policy decisions</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-600">✓</span>
                <span className="text-gray-700">Every voice matters - students, alumni, and citizens</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-600">✓</span>
                <span className="text-gray-700">Show the government the real demand for public education</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-600">✓</span>
                <span className="text-gray-700">Be part of thousands fighting for affordability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid - Why This Matters and Petition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 items-start">
          {/* Left Side - Why This Matters */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 border-l-8 border-red-600">
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-2">
                📋 Why This Matters
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                The Cost of Control
              </h3>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-lg text-red-600">SBRR Mahajans is NOT for sale.</span> For generations, this institution has been the beacon of affordable, quality education. Government-aided status meant that brilliant minds from every economic background could access world-class learning. That's not a weakness—that's our strength.
              </p>

              <p>
                <span className="font-bold text-red-600">Privatization is a betrayal.</span> Corporations promise "innovation" and "improvement," but what they deliver is greed. When institutions privatize, fees skyrocket. Scholarships disappear. Poor and middle-class students are left out in the cold. Quality suffers because profit matters more than people.
              </p>

              <p>
                <span className="font-bold text-red-600">We will NOT let this happen.</span> This is not a negotiation. This is a fight for the soul of our institution. We are students. We are alumni. We are citizens who believe education is a RIGHT, not a commodity. And we are saying a resounding NO to privatization.
              </p>

              <p>
                <span className="font-bold text-red-600">Your signature is your weapon.</span> When thousands of us sign together, the government cannot ignore us. When we show that the people oppose privatization, change happens. Every single signature counts. Every voice matters.
              </p>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 mt-6">
                <p className="text-red-900 font-bold mb-2">
                  ⚡ This is not just a petition. This is a movement.
                </p>
                <p className="text-sm text-red-900">
                  When we stand together, we cannot be defeated. Sign now. Share this. Tell everyone. Make your voice count.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Petition */}
          <div className="h-full">
            <PetitionMemo isCompact={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
