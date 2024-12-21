import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { FormInput } from '../components/FormInput';
import { FormTextArea } from '../components/FormTextArea';

export function FindCandidatesPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: '',
    jobDescription: '',
    startDate: '',
    endDate: '',
    candidatesRequired: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Fetching candidates...');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 mt-16"> {/* Add margin-top here */}
      <div className="max-w-2xl mx-auto space-y-8 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-lg border border-slate-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Find Candidates
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
  );
}
