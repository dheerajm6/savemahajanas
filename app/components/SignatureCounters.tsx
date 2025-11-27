'use client';

import { useState, useEffect } from 'react';

interface CountersData {
  students: number;
  alumni: number;
  public: number;
}

export default function SignatureCounters() {
  const [counters, setCounters] = useState<CountersData>({
    students: 0,
    alumni: 0,
    public: 0,
  });

  useEffect(() => {
    // Load from localStorage
    const loadCounters = () => {
      const savedSignatures = localStorage.getItem('petitionSignatures');
      if (savedSignatures) {
        try {
          const signatures = JSON.parse(savedSignatures);
          const studentCount = signatures.filter((s: any) => s.category === 'student').length;
          const alumniCount = signatures.filter((s: any) => s.category === 'alumni').length;
          const publicCount = signatures.filter((s: any) => s.category === 'public').length;
          setCounters({
            students: studentCount,
            alumni: alumniCount,
            public: publicCount,
          });
        } catch (error) {
          console.error('Error loading signatures:', error);
        }
      }
    };

    loadCounters();

    // Listen for new signatures
    window.addEventListener('signatureAdded', loadCounters);
    return () => {
      window.removeEventListener('signatureAdded', loadCounters);
    };
  }, []);

  const total = counters.students + counters.alumni + counters.public;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-8 sm:mb-10">
          Support at a Glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Current Students */}
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 text-center shadow-lg">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600 mb-2 sm:mb-3">
              {counters.students.toLocaleString()}
            </div>
            <p className="text-gray-900 text-base sm:text-lg font-semibold">Current Students</p>
            <p className="text-gray-700 text-xs sm:text-sm mt-1 sm:mt-2">
              Standing up for their future
            </p>
          </div>

          {/* Alumni */}
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 text-center shadow-lg">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600 mb-2 sm:mb-3">
              {counters.alumni.toLocaleString()}
            </div>
            <p className="text-gray-900 text-base sm:text-lg font-semibold">Alumni</p>
            <p className="text-gray-700 text-xs sm:text-sm mt-1 sm:mt-2">
              Supporting their alma mater
            </p>
          </div>

          {/* General Public */}
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 text-center shadow-lg">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600 mb-2 sm:mb-3">
              {counters.public.toLocaleString()}
            </div>
            <p className="text-gray-900 text-base sm:text-lg font-semibold">General Public</p>
            <p className="text-gray-700 text-xs sm:text-sm mt-1 sm:mt-2">
              From the community at large
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <p className="text-white text-base sm:text-lg mb-1 sm:mb-2">Total Signatures</p>
          <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            {total.toLocaleString()}
          </div>
          <p className="text-white text-base sm:text-lg mt-2 sm:mt-4">
            voices united for public education
          </p>
        </div>
      </div>
    </div>
  );
}
