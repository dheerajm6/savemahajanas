'use client';

import { useState } from 'react';

interface Signature {
  name: string;
  email: string;
  category: 'student' | 'alumni' | 'public';
  timestamp: string;
}

interface PetitionMemoProps {
  isCompact?: boolean;
}

export default function PetitionMemo({ isCompact = false }: PetitionMemoProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'student' as 'student' | 'alumni' | 'public',
  });
  const [signedUser, setSignedUser] = useState<Signature | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim() && formData.email.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const newSignature = {
        name: formData.name,
        email: formData.email,
        category: formData.category,
        timestamp: timestamp,
      };

      try {
        // Send to API endpoint which will save to Google Sheets
        const response = await fetch('/api/signatures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSignature),
        });

        if (!response.ok) {
          console.error('Failed to submit signature to API');
        }
      } catch (error) {
        console.error('Error submitting signature:', error);
      }

      setSignedUser(newSignature);

      // Save to localStorage
      const savedSignatures = localStorage.getItem('petitionSignatures');
      const signatures = savedSignatures ? JSON.parse(savedSignatures) : [];
      const signatureWithId = {
        id: Date.now().toString(),
        ...newSignature,
      };
      signatures.push(signatureWithId);
      localStorage.setItem('petitionSignatures', JSON.stringify(signatures));

      setFormData({ name: '', email: '', category: 'student' });
      setSubmitted(true);

      // Hide the form immediately after signing
      setShowForm(false);

      // After 10 seconds, refresh in background and show form again
      setTimeout(() => {
        setIsRefreshing(true);

        // Refresh the page in background (or reload data)
        // This will update the Wall of Support and signature counts
        window.dispatchEvent(new CustomEvent('refreshPetition'));

        // After 2 more seconds, show the form again
        setTimeout(() => {
          setSignedUser(null);
          setSubmitted(false);
          setShowForm(true);
          setIsRefreshing(false);
        }, 2000);
      }, 10000);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('signatureAdded', { detail: signatureWithId }));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'student':
        return 'text-blue-600';
      case 'alumni':
        return 'text-purple-600';
      case 'public':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'student':
        return '(Student)';
      case 'alumni':
        return '(Alumni)';
      case 'public':
        return '(Public)';
      default:
        return '';
    }
  };

  return (
    <section className={isCompact ? "" : "py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"}>
      <div className={isCompact ? "" : "max-w-5xl mx-auto"}>
        {/* Petition Memo Document */}
        <div className={`bg-yellow-50 rounded-lg shadow-2xl border-8 border-yellow-900 relative ${
          isCompact ? 'p-4 sm:p-6 lg:p-8' : 'p-6 sm:p-10 lg:p-16'
        }`}>
          {/* Document Header */}
          <div className={`text-center pb-6 sm:pb-8 border-b-2 border-yellow-900 ${isCompact ? 'mb-4 sm:mb-6' : 'mb-8 sm:mb-12'}`}>
            <h2 className={`font-bold text-gray-900 mb-3 sm:mb-4 ${isCompact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
              PETITION
            </h2>
            <p className={`text-gray-700 font-semibold ${isCompact ? 'text-sm' : 'text-lg'}`}>
              Against the Privatization of SBRR Mahajans PU & First Grade College
            </p>
          </div>

          {/* Petition Content */}
          <div className={`space-y-2 sm:space-y-3 text-gray-800 leading-relaxed ${isCompact ? 'mb-4 sm:mb-6 text-xs sm:text-sm' : 'mb-8 sm:mb-12 text-sm sm:text-base'}`}>
            <p className="text-justify">
              We, the undersigned students, alumni, and citizens of this community, formally petition against the privatization of SBRR Mahajans PU & First Grade College. This institution has been a beacon of affordable, quality public education for generations.
            </p>

            <p className="text-justify font-semibold text-red-600">
              Privatization will destroy affordability. It will turn education into a commodity for the wealthy. It will betray the legacy of those who built this institution on principles of equal access.
            </p>

            <p className="text-justify">
              We demand that:
            </p>
            <ul className={`list-disc list-inside space-y-1 ml-4 ${isCompact ? 'text-xs' : ''}`}>
              <li>The institution remains under government-aided status</li>
              <li>Fees remain controlled and affordable</li>
            </ul>

            <p className="text-justify font-semibold mt-3">
              By signing below, we declare our commitment to protecting SBRR Mahajans as a government aided institution.
            </p>
          </div>

          {/* Signature Section - Single User */}
          {signedUser && (
            <div className="mb-12 pb-8 border-t-2 border-yellow-900">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 mt-8">
                Signature of Petitioner:
              </h3>

              <div className="text-center pb-6 border-b-4 border-gray-600">
                <div className={`font-bold italic text-2xl sm:text-3xl lg:text-4xl ${getCategoryColor(signedUser.category)}`} style={{ fontFamily: 'cursive' }}>
                  {signedUser.name}
                </div>
                <div className="text-sm text-gray-600 mt-4">
                  <span className="font-semibold">{getCategoryLabel(signedUser.category)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Signed: {signedUser.timestamp}
                </div>
              </div>
            </div>
          )}

          {/* Form Section */}
          <div className="border-t-2 border-yellow-900 pt-8">
            {showForm ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Add Your Signature:
                </h3>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg border-2 border-green-600 font-semibold flex items-center justify-between">
                    <span>✓ Your signature has been added to the petition!</span>
                    {isRefreshing && <span className="text-sm animate-spin">⟳ Refreshing...</span>}
                  </div>
                )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-yellow-700 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    Email Id:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-yellow-700 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your email will not display publicly anywhere</p>
                </div>
              </div>

              {/* Category Dropdown - Full Width */}
              <div>
                <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">
                  I am a:
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-yellow-700 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                >
                  <option value="student">Current Student</option>
                  <option value="alumni">Alumni</option>
                  <option value="public">General Public</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm sm:text-lg transition transform hover:scale-105 shadow-lg"
              >
                Sign the Petition
              </button>
            </form>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🎉 Thank You for Signing!
                </h3>
                <div className="inline-block">
                  <div className="animate-spin text-4xl">⟳</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Message */}
        {!isCompact && !signedUser && (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 font-semibold">
              Be the first to sign this petition!
            </p>
          </div>
        )}

        {!isCompact && signedUser && (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 font-semibold">
              <span className="text-3xl font-bold text-red-600">1</span> person has signed this petition
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
