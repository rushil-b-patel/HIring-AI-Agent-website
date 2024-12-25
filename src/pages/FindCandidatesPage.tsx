import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../AuthContext'; // Import AuthContext hook
import { FormInput } from '../components/FormInput';
import { FormTextArea } from '../components/FormTextArea';

export function FindCandidatesPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Fetch user details from AuthContext
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    jobRole: '',
    jobDescription: '',
    startDate: '',
    endDate: '',
    candidatesRequired: '',
  });

  // Initialize formData with user credentials if logged in
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email || '',
         // Assuming password is stored securely in user object
      }));
    } else {
      toast.error('Please log in to access this page.');
      navigate('/login'); // Redirect to login page
    }
  }, [user, navigate]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    toast.success('Fetching candidates...');
    console.log('Form Data:', formData); // Debugging: Check submitted data
    navigate('/dashboard');
  };

  return user ? ( // Render only if user is authenticated
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 mt-16">
      <div className="max-w-2xl mx-auto space-y-8 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-lg border border-slate-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Find Candidates
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {/* Password Field */}
          <FormInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <FormInput
            label="Job Role"
            value={formData.jobRole}
            onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
            required
          />
          <FormTextArea
            label="Job Description"
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              type="date"
              label="Start Date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <FormInput
              type="date"
              label="End Date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
          <FormInput
            type="number"
            label="Number of Candidates Required"
            value={formData.candidatesRequired}
            onChange={(e) => setFormData({ ...formData, candidatesRequired: e.target.value })}
            required
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <Search className="w-5 h-5 mr-2" />
              Fetch Candidates
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null; // Return null while redirecting
}
