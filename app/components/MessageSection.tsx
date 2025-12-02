'use client';

import { useState, useRef } from 'react';

export default function MessageSection() {
  const [formData, setFormData] = useState({
    message: '',
    canShareOnInstagram: false,
    files: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      message: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      canShareOnInstagram: checked,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValidType =
        file.type.startsWith('image/') ||
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'text/plain';
      return isValidType && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    setFormData(prev => ({
      ...prev,
      files: validFiles,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('message', formData.message);
      formDataToSend.append('canShareOnInstagram', formData.canShareOnInstagram.toString());

      formData.files.forEach((file, index) => {
        formDataToSend.append(`file_${index}`, file);
      });

      const response = await fetch('/api/send-message', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Your message has been sent anonymously. Thank you for sharing with us!');
        setFormData({
          message: '',
          canShareOnInstagram: false,
          files: [],
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitStatus('error');
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('An error occurred. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900">
            Share Your Story Anonymously
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We want to hear from you. Your identity is completely safe with us. Share anything on your mind—your message will remain confidential.
          </p>
        </div>

        {/* Trust Message */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border-l-4 border-blue-500 mb-8 sm:mb-10">
          <p className="text-sm sm:text-base text-blue-900 font-semibold mb-2">🔒 Your Privacy is Protected</p>
          <p className="text-xs sm:text-sm text-blue-800">
            All submissions are anonymous. We never collect your name or email address. You have complete control over whether your message can be shared on our Instagram.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-red-100">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                Your Message or Story
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={8}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-gray-900 placeholder-gray-500 text-sm sm:text-base resize-none"
                placeholder="Share your thoughts, stories, concerns, or feedback... Your message is completely anonymous and confidential."
              />
            </div>

            {/* File Upload Field */}
            <div>
              <label htmlFor="files" className="block text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                Attach Files (Optional)
              </label>
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  id="files"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="block w-full text-sm sm:text-base text-gray-500 border-2 border-gray-300 border-dashed rounded-lg px-4 sm:px-6 py-3 sm:py-4 cursor-pointer hover:border-red-500 transition focus:outline-none"
                />
                <p className="text-xs sm:text-sm text-gray-500">
                  Supported: Images, PDF, Word documents, and text files (Max 10MB each)
                </p>
              </div>

              {/* File List */}
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Selected files:</p>
                  <ul className="space-y-2">
                    {formData.files.map((file, index) => (
                      <li key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded text-xs sm:text-sm text-gray-700">
                        <span>📎</span>
                        <span className="flex-1 truncate">{file.name}</span>
                        <span className="text-gray-500">({(file.size / 1024).toFixed(1)}KB)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.canShareOnInstagram}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500 cursor-pointer"
                />
                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                    Permission to Share on Instagram (Optional)
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    By checking this box, you give us permission to share your message or attached media on our Instagram account with the hashtag #SaveMahajanas. Your message will remain anonymous. If you don't check this, your message will only be seen by us.
                  </p>
                </div>
              </label>
            </div>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`p-4 rounded-lg text-sm sm:text-base font-semibold ${
                submitStatus === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {statusMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.message.trim()}
              className={`w-full px-6 py-3 sm:py-4 font-bold rounded-lg transition transform text-white text-sm sm:text-base ${
                isSubmitting || !formData.message.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg'
              }`}
            >
              {isSubmitting ? 'Sending Anonymously...' : 'Send Anonymously'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">🔐</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Complete Privacy</p>
                  <p className="text-xs text-gray-600 mt-1">No name, email, or personal data collected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🤝</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Your Control</p>
                  <p className="text-xs text-gray-600 mt-1">You decide if your message can be shared publicly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
