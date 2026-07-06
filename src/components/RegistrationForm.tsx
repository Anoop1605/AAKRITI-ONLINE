import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    category: '',
    eventName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    collegeName: '', // <-- NEW
    yearOfStudy: '1', // <-- NEW (Defaulting to 1st year)
    teamSize: 1,
  });

  const [dynamicMembers, setDynamicMembers] = useState<string[]>([]);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'teamSize') {
      const size = Math.max(1, parseInt(value) || 1);
      setFormData((prev) => ({ ...prev, [name]: size }));
      
      // Adjust dynamic members array size based on (teamSize - 1)
      setDynamicMembers((prev) => {
        const newLength = size - 1;
        if (newLength > prev.length) {
           return [...prev, ...Array(newLength - prev.length).fill('')];
        } else {
           return prev.slice(0, newLength);
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMemberChange = (index: number, value: string) => {
    setDynamicMembers((prev) => {
      const newMembers = [...prev];
      newMembers[index] = value;
      return newMembers;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      setSubmitStatus({ type: 'error', message: 'Please upload a payment screenshot.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const validMembers = dynamicMembers.filter((m) => m.trim() !== '');
      const memberNames = validMembers.join(', ');

      const payload = new FormData();
      payload.append('teamName', formData.teamName);
      payload.append('category', formData.category);
      payload.append('eventName', formData.eventName);
      payload.append('leaderName', formData.leaderName);
      payload.append('leaderEmail', formData.leaderEmail);
      payload.append('leaderPhone', formData.leaderPhone);
      payload.append('collegeName', formData.collegeName);
      payload.append('yearOfStudy', formData.yearOfStudy);
      payload.append('memberNames', memberNames);
      payload.append('screenshot', screenshot);

      const baseApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
      const response = await fetch(`${baseApiUrl}/api/v1/registrations`, {
        method: 'POST',
        // Do NOT set Content-Type header. Let the browser append it with the correct boundary for multipart/form-data.
        body: payload,
      });

      if (response.status === 201) {
        setSubmitStatus({ type: 'success', message: 'Registration successful! See you at Aakriti.' });
        // Optionally reset form state here if needed
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus({ type: 'error', message: errorData.error || 'Registration failed. Please try again.' });
      }
    } catch (error: any) {
      setSubmitStatus({ type: 'error', message: 'Network error or server is unreachable.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Aakriti Event Registration</h2>
        <p className="mt-2 text-sm text-gray-600">Fill in the details below to secure your spot.</p>
      </div>

      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          <p className="font-medium text-sm">{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* EVENT DETAILS SECTION */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Name *</label>
              <input
                type="text"
                name="teamName"
                required
                value={formData.teamName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter team name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
              >
                <option value="SPORTS">Sports</option>
                <option value="CULTURALS">Culturals</option>
                <option value="MANAGEMENT">Management</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
              <input
                type="text"
                name="eventName"
                required
                value={formData.eventName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="e.g., Cricket, Solo Dance"
              />
            </div>
          </div>
        </section>

        {/* LEADER INFO SECTION */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Leader Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leader Name *</label>
              <input
                type="text"
                name="leaderName"
                required
                value={formData.leaderName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter leader's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leader Email *</label>
              <input
                type="email"
                name="leaderEmail"
                required
                value={formData.leaderEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Leader Phone *</label>
              <input
                type="tel"
                name="leaderPhone"
                required
                value={formData.leaderPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="+91 9876543210"
              />
            </div>

            {/* NEW: College Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">College / Institution *</label>
              <input
                type="text"
                name="collegeName"
                required
                value={formData.collegeName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="e.g., XYZ Engineering College"
              />
            </div>

            {/* NEW: Year of Study */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study *</label>
              <select
                name="yearOfStudy"
                required
                value={formData.yearOfStudy}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year / Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* TEAM MEMBERS SECTION */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">Team Members</h3>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Team Size:</label>
              <input
                type="number"
                name="teamSize"
                min="1"
                max="20"
                value={formData.teamSize}
                onChange={handleInputChange}
                className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center"
              />
            </div>
          </div>
          
          {dynamicMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {dynamicMembers.map((member, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Member {idx + 2} Name</label>
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(idx, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder={`Enter member ${idx + 2} name`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic mt-2">Solo participant (Leader only).</p>
          )}
        </section>

        {/* PAYMENT SECTION */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Payment Verification</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Screenshot *</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </section>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white transition-all ${
              isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Complete Registration'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
