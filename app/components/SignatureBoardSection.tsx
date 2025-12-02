'use client';

import { useState, useEffect } from 'react';

interface StoredSignature {
  id: string;
  name: string;
  category: 'student' | 'alumni' | 'public';
  timestamp: string;
}

export default function SignatureBoardSection() {
  const [signatures, setSignatures] = useState<StoredSignature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load signatures from localStorage on mount and when new signatures are added
  useEffect(() => {
    const loadSignatures = () => {
      const savedSignatures = localStorage.getItem('petitionSignatures');
      if (savedSignatures) {
        try {
          setSignatures(JSON.parse(savedSignatures));
        } catch (error) {
          console.error('Error loading signatures:', error);
        }
      }
      setIsLoading(false);
    };

    loadSignatures();

    // Listen for custom event when new signature is added
    window.addEventListener('signatureAdded', () => {
      loadSignatures();
    });

    return () => {
      window.removeEventListener('signatureAdded', loadSignatures);
    };
  }, []);


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
            Wall of Support
          </h2>
        </div>



        {/* Footer Message */}
        {signatures.length > 0 && (
          <div className="mt-10 sm:mt-16 text-center border-t border-gray-700 pt-8 sm:pt-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
              {signatures.length} Voices United
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4 sm:mb-8 text-sm sm:text-base">
              This is the power of collective action. Every single signature matters. Every single voice counts.
            </p>
            <p className="text-gray-400 italic text-sm sm:text-base">
              "When we stand together, we cannot be defeated."
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
