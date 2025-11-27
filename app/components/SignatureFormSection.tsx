'use client';

import { useState } from 'react';

interface SignatureData {
  name: string;
  category: 'student' | 'alumni' | 'public';
}

interface Signature extends SignatureData {
  id: string;
  date: string;
}

export default function SignatureFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'student' as 'student' | 'alumni' | 'public',
  });
  const [signatures, setSignatures] = useState<Signature[]>([
    { id: '1', name: 'Rajesh Kumar', category: 'student', date: 'Nov 27' },
    { id: '2', name: 'Priya Sharma', category: 'alumni', date: 'Nov 27' },
    { id: '3', name: 'Amit Patel', category: 'public', date: 'Nov 27' },
    { id: '4', name: 'Anjali Singh', category: 'student', date: 'Nov 26' },
    { id: '5', name: 'Dr. Venkat', category: 'alumni', date: 'Nov 26' },
    { id: '6', name: 'Neha Gupta', category: 'public', date: 'Nov 26' },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim()) {
      const newSignature: Signature = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };

      setSignatures((prev) => [newSignature, ...prev]);
      setFormData({ name: '', category: 'student' });
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const studentSignatures = signatures.filter((s) => s.category === 'student');
  const alumniSignatures = signatures.filter((s) => s.category === 'alumni');
  const publicSignatures = signatures.filter((s) => s.category === 'public');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'alumni':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'public':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Add Your Signature
          </h2>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-lg">
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300">
                ✓ Thank you! Your signature has been added to the movement.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  I am a... *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                >
                  <option value="student">Current Student</option>
                  <option value="alumni">Alumni</option>
                  <option value="public">General Public</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition transform hover:scale-105 shadow-lg"
            >
              Sign the Petition
            </button>
          </form>
        </div>

        {/* Signature Board */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">
            Wall of Support
          </h2>
          <p className="text-center text-gray-600 mb-10">
            {signatures.length} people have signed. Be part of this movement.
          </p>

          {/* Grid Layout for Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {signatures.map((signature) => (
              <div
                key={signature.id}
                className={`p-6 rounded-lg border-2 transform transition hover:scale-105 ${getCategoryColor(signature.category)}`}
              >
                <div className="font-semibold text-lg mb-2">{signature.name}</div>
                <div className="flex justify-between items-center text-sm">
                  <span className="capitalize font-medium">
                    {signature.category === 'student' && '👨‍🎓 Student'}
                    {signature.category === 'alumni' && '🎓 Alumni'}
                    {signature.category === 'public' && '🤝 Public'}
                  </span>
                  <span className="opacity-70">{signature.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Section */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition">
              Load More Signatures
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
