'use client';

import Image from 'next/image';

export default function MemoriesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900">
            Your Mahajans Story Matters
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every moment. Every memory. Every voice. Share what Mahajans means to you on Instagram.
          </p>
        </div>

        {/* Main Grid - Left content, Right QR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Stories and Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Story Cards */}
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 sm:p-6 border-2 border-red-200 hover:border-red-400 transition shadow-md">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-red-700">📚 Classroom Moments</h3>
                <p className="text-sm sm:text-base text-gray-700">That inspiring teacher. That life-changing lesson. The moment you discovered your passion.</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 sm:p-6 border-2 border-red-200 hover:border-red-400 transition shadow-md">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-red-700">🎓 Graduation Glory</h3>
                <p className="text-sm sm:text-base text-gray-700">Celebrate the day you walked across that stage. The pride. The achievement. The memories.</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 sm:p-6 border-2 border-red-200 hover:border-red-400 transition shadow-md">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-red-700">🤝 Friendships Forever</h3>
                <p className="text-sm sm:text-base text-gray-700">Those bonds formed in corridors and cafeterias. Friends you made for life at Mahajans.</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 sm:p-6 border-2 border-red-200 hover:border-red-400 transition shadow-md">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-red-700">💫 Life-Changing Stories</h3>
                <p className="text-sm sm:text-base text-gray-700">How Mahajans transformed your future. The opportunities. The growth. The journey.</p>
              </div>
            </div>

            {/* Call to Action Text */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-4 sm:p-6 lg:p-8 border border-red-500 shadow-lg">
              <p className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-white">Why share your story?</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white">
                <li>✓ Preserve Mahajans' rich legacy</li>
                <li>✓ Inspire current and future students</li>
                <li>✓ Show the world what makes Mahajans special</li>
                <li>✓ Build a stronger community</li>
              </ul>
            </div>
          </div>

          {/* Right Side - QR Code */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-sm">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <Image
                  src="/Instagram Profile qr code.jpeg"
                  alt="Instagram QR Code"
                  width={220}
                  height={220}
                  className="rounded-lg w-auto h-auto"
                />
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Scan to Share</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Open Instagram and tag us in your story</p>
              </div>

              <a
                href="https://www.instagram.com/savemahajanas?utm_source=qr&igsh=Y3NjZ2V6ZTkyNWZn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 via-red-500 to-red-600 hover:from-pink-600 hover:via-red-600 hover:to-red-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-xl text-center text-sm sm:text-base mb-3 sm:mb-4"
              >
                Visit Our Instagram
              </a>

              <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-xs text-gray-600 mb-1 sm:mb-2">Use our hashtag</p>
                <p className="text-base sm:text-lg font-bold text-red-600">#SaveMahajans</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 sm:mt-6 lg:mt-8 text-center max-w-sm px-4">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Your stories are what make Mahajans stronger. Share. Connect. Inspire. Together, we preserve the legacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
