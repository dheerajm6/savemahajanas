'use client';

import { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [signed, setSigned] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if this visitor has been tracked before
        const hasVisited = localStorage.getItem('siteVisited');
        const isNewVisitor = !hasVisited;

        // Mark this visitor in localStorage
        if (isNewVisitor) {
          localStorage.setItem('siteVisited', 'true');
        }

        // Send to API with isNewVisitor flag
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isNewVisitor }),
        });

        const data = await response.json();
        setVisitors(data.count);

        // Get the count of signatures from localStorage
        const savedSignatures = localStorage.getItem('petitionSignatures');
        const signatures = savedSignatures ? JSON.parse(savedSignatures) : [];
        setSigned(signatures.length);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisitor();

    // Listen for signature updates
    const handleSignatureAdded = () => {
      const savedSignatures = localStorage.getItem('petitionSignatures');
      const signatures = savedSignatures ? JSON.parse(savedSignatures) : [];
      setSigned(signatures.length);
    };

    window.addEventListener('signatureAdded', handleSignatureAdded);
    return () => {
      window.removeEventListener('signatureAdded', handleSignatureAdded);
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {/* Visitors Badge */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-blue-200">
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs sm:text-sm font-semibold text-gray-700">
          {isLoading ? 'Loading...' : `${visitors.toLocaleString()} Visitors`}
        </span>
      </div>

      {/* Signed Badge */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-red-200">
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-600 rounded-full"></div>
        <span className="text-xs sm:text-sm font-semibold text-gray-700">
          {isLoading ? 'Loading...' : `${signed.toLocaleString()} Signed`}
        </span>
      </div>
    </div>
  );
}
