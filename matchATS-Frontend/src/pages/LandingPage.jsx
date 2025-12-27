import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Search, 
  Filter,
  ChevronRight,
  User,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock Data for the ranked results
  const mockCandidates = [
    { id: 1, name: "Arjun Mehta", score: 94, skills: ["Java", "Spring Boot", "React"], status: "Strong Match", experience: "4 Years" },
    { id: 2, name: "Sneha Rao", score: 88, skills: ["Python", "AWS", "Spring Boot"], status: "Strong Match", experience: "3 Years" },
    { id: 3, name: "Karan Shah", score: 72, skills: ["Java", "SQL", "React"], status: "Partial Match", experience: "2 Years" },
    { id: 4, name: "Priya Das", score: 45, skills: ["HTML/CSS", "JavaScript"], status: "Low Match", experience: "1 Year" },
  ];

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  const startAnalysis = () => {
    setIsProcessing(true);
    // Simulating the backend AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">MatchATS Dashboard</h1>
            <p className="text-gray-500">Analyze and rank candidates using AI semantic matching.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md">
              <Zap className="w-4 h-4" /> New JD
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Upload & Config */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" /> Upload Resumes
              </h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50/50">
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  id="resume-upload" 
                  onChange={handleFileUpload} 
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600">Click to upload PDFs</p>
                  <p className="text-xs text-gray-400 mt-1">Maximum 50 files at once</p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Queue ({files.length})</p>
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <span className="truncate">{file.name}</span>
                    </div>
                  ))}
                  <button 
                    onClick={startAnalysis}
                    disabled={isProcessing}
                    className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
                  >
                    {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Start AI Scoring"}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
               <BrainCircuit className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
               <h3 className="font-bold mb-2">AI Settings</h3>
               <p className="text-indigo-200 text-xs mb-4">Using GPT-4o for deep semantic reasoning.</p>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span>Strictness</span>
                   <span className="font-bold">85%</span>
                 </div>
                 <div className="w-full bg-indigo-800 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-indigo-400 w-[85%] h-full"></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Results Table */}
          <div className="lg:col-span-2">
            {!showResults && !isProcessing ? (
              <div className="bg-white rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <Search className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">No results to show yet</p>
                <p className="text-sm">Upload resumes and run the analysis to see rankings.</p>
              </div>
            ) : isProcessing ? (
               <div className="bg-white rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center p-12 text-center">
                 <Loader2 className="w-16 h-16 mb-4 text-indigo-600 animate-spin" />
                 <p className="text-xl font-bold text-gray-900">AI is analyzing profiles...</p>
                 <p className="text-gray-500">Matching experience, skills, and education contextually.</p>
               </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900">Ranked Candidates</h2>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">Analysis Complete</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">Score</th>
                        <th className="px-6 py-4">Experience</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockCandidates.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                {c.name[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{c.name}</p>
                                <div className="flex gap-1 mt-1">
                                  {c.skills.slice(0, 2).map((s, idx) => (
                                    <span key={idx} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{s}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${c.score > 80 ? 'text-green-600' : c.score > 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                {c.score}%
                              </span>
                              <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                                <div className={`h-full ${c.score > 80 ? 'bg-green-500' : c.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.score}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{c.experience}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                              c.status === "Strong Match" ? "bg-green-100 text-green-700" : 
                              c.status === "Partial Match" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 hover:bg-white rounded-lg transition-colors group-hover:shadow-sm border border-transparent group-hover:border-gray-200">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Supporting Lucide component for the background icon
const BrainCircuit = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 5.327 2.022c.316.311.725.483 1.15.483a2 2 0 0 0 2-2 2 2 0 0 0-2-2c-.145 0-.285.016-.421.047l-.146.027c-.201-.22-.323-.51-.323-.827a1 1 0 0 1 1-1h.243c.153 0 .305.03.447.09a2 2 0 1 0 1.257-3.66 2 2 0 0 0-1.257 3.66c.142.06.294.09.447.09h.243a1 1 0 0 1 1 1c0 .317-.122.607-.323.827l-.146-.027c-.136-.031-.276-.047-.421-.047a2 2 0 0 0-2 2 2 2 0 0 0 2 2c.425 0 .834-.172 1.15-.483a4 4 0 0 0 5.327-2.022 4 4 0 0 0 .52-8.105 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z" />
    <path d="M9 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
    <path d="M19 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
  </svg>
);

export default LandingPage;