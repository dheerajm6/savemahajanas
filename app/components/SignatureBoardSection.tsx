'use client';

import { useState, useEffect } from 'react';

interface StoredSignature {
  id: string;
  name: string;
  category: 'student' | 'alumni' | 'public';
  timestamp: string;
}

const SIGNATURES_PER_PAGE = 100; // 10 columns x 10 signatures

export default function SignatureBoardSection() {
  const [signatures, setSignatures] = useState<StoredSignature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'student' | 'alumni' | 'public'>('all');

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'student':
        return '👨‍🎓';
      case 'alumni':
        return '🎓';
      case 'public':
        return '🤝';
      default:
        return '✓';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'student':
        return 'Student';
      case 'alumni':
        return 'Alumni';
      case 'public':
        return 'Public';
      default:
        return 'Supporter';
    }
  };

  // Filter signatures
  let filtered = signatures;

  if (searchTerm.trim()) {
    filtered = filtered.filter((sig) =>
      sig.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedCategory !== 'all') {
    filtered = filtered.filter((sig) => sig.category === selectedCategory);
  }

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / SIGNATURES_PER_PAGE);
  const startIndex = (currentPage - 1) * SIGNATURES_PER_PAGE;
  const paginatedSignatures = filtered.slice(startIndex, startIndex + SIGNATURES_PER_PAGE);

  const studentCount = signatures.filter((s) => s.category === 'student').length;
  const alumniCount = signatures.filter((s) => s.category === 'alumni').length;
  const publicCount = signatures.filter((s) => s.category === 'public').length;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
            Wall of Support
          </h2>
        </div>

        {/* Search and Filter Section - Show when 100+ signatures */}
        {signatures.length >= SIGNATURES_PER_PAGE && (
          <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
            {/* Search Bar */}
            <div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 text-sm sm:text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {(['all', 'student', 'alumni', 'public'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-red-600'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Signatures Grid */}
        <div>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading signatures...</p>
            </div>
          ) : signatures.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
              <p className="text-2xl text-gray-400 mb-4">No signatures yet</p>
              <p className="text-gray-500">Be the first to add your voice to this movement!</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No signatures match your search</p>
            </div>
          ) : (
            <>
              {/* Signatures Grid */}
              <div className="grid gap-4 sm:gap-6 lg:gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                {Array.from({ length: Math.ceil(paginatedSignatures.length / 10) }).map((_, columnIndex) => (
                  <div key={columnIndex} className="space-y-4">
                    {paginatedSignatures.slice(columnIndex * 10, (columnIndex + 1) * 10).map((signature) => (
                      <div
                        key={signature.id}
                        className="pb-4 border-b border-gray-800"
                      >
                        {/* Name */}
                        <div
                          className="text-lg font-bold italic text-white mb-1"
                          style={{ fontFamily: 'cursive' }}
                        >
                          {signature.name}
                        </div>

                        {/* Category */}
                        <div className="text-gray-400 text-xs mb-1">
                          {getCategoryLabel(signature.category)}
                        </div>

                        {/* Timestamp */}
                        <div className="text-gray-500 text-xs">
                          {signature.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
                  >
                    ← Previous
                  </button>

                  <div className="text-gray-300 text-center">
                    <p className="font-semibold text-sm sm:text-base">Page {currentPage} of {totalPages}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{filtered.length} signatures</p>
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
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
