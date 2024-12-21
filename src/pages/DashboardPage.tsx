import React from 'react';
import { Download } from 'lucide-react';

const mockCandidates = [
  { id: 1, name: 'John Doe', relevance: 95, skills: ['React', 'TypeScript', 'Node.js'] },
  { id: 2, name: 'Jane Smith', relevance: 90, skills: ['Python', 'Machine Learning', 'SQL'] },
  { id: 3, name: 'Mike Johnson', relevance: 85, skills: ['Java', 'Spring Boot', 'MongoDB'] },
];

export function DashboardPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 mt-16"> {/* Add margin-top here */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Candidate Results</h1>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Results
          </button>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg backdrop-blur-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Relevance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {mockCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{candidate.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-indigo-500 h-2 rounded-full"
                            style={{ width: `${candidate.relevance}%` }}
                          />
                        </div>
                        <span className="text-sm text-white">{candidate.relevance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
