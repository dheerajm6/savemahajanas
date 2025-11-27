'use client';

import { useState, useEffect } from 'react';

interface ConsentModalProps {
  onConsent: () => void;
}

export default function ConsentModal({ onConsent }: ConsentModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConsent = () => {
    localStorage.setItem('consent', 'true');
    setIsOpen(false);
    onConsent();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-in fade-in duration-300">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          Support Our Campaign
        </h2>

        <div className="text-gray-700 space-y-2 sm:space-y-4 mb-6">
          <p className="text-sm sm:text-base">
            This website is created to showcase the <strong>unity of people and students</strong> in our effort to prevent the privatization of <strong>SBRR Mahajans PU & First Grade College</strong>.
          </p>

          <p className="text-sm sm:text-base">
            By continuing, you consent to:
          </p>

          <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 text-sm sm:text-base">
            <li>Sign this collective petition against privatization</li>
            <li>Add your name and voice to this movement</li>
            <li>Support the preservation of our educational institution</li>
          </ul>

          <p className="text-xs sm:text-sm text-gray-600 italic">
            Your signature represents your commitment to keeping SBRR Mahajans as a public institution serving our community.
          </p>
        </div>

        <button
          onClick={handleConsent}
          className="w-full px-4 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          I Consent & Continue
        </button>
      </div>
    </div>
  );
}
