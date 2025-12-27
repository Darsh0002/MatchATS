import React, { useState } from "react";
import { Upload, FileText, Loader2, Zap, LayoutDashboard, ChevronLeft } from "lucide-react";
import { findBestMatch } from "../services/backendService";
import Navbar from "../Components/Navbar";
import ShowResult from "../Components/ShowResult";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  const handleStartAnalysis = async () => {
    if (files.length === 0 || !jd.trim()) {
      alert("Please upload resumes and provide a job description.");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("jd", jd);
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await findBestMatch(formData);
      let data = response.data;

      if (typeof data === "string") {
        const cleanJson = data.replace(/```json|```/g, "").trim();
        data = JSON.parse(cleanJson);
      }

      const sortedData = data.sort(
        (a, b) => (b.SCORE || b.score) - (a.SCORE || a.score)
      );

      setResults(sortedData);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      alert(error.response?.data?.message || "Failed to analyze resumes.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setJd("");
    setFiles([]);
    setResults([]);
  };

  // --- STATE RENDERING LOGIC ---

  // 1. Loading State
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center max-w-sm w-full">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <Zap className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Analyzing Profiles</h2>
          <p className="mt-2 text-gray-500">Our AI is matching {files.length} resumes against your requirements...</p>
        </div>
      </div>
    );
  }

  // 2. Results State
  if (results.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <button 
            onClick={resetAll}
            className="mb-6 flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Start New Analysis
          </button>
          <ShowResult data={results} />
        </div>
      </div>
    );
  }

  // 3. Initial Setup State (Before Uploading)
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">
            <LayoutDashboard className="w-4 h-4" /> AI Resume Parser
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
            Find the perfect <span className="text-indigo-600">Match.</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Upload candidate resumes and paste your job description. Our AI will rank them based on semantic fit.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Job Description */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-indigo-500" /> 1. Job Description
            </label>
            <textarea
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none"
              placeholder="Paste the job requirements, skills, and responsibilities here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          {/* Right: Upload Section */}
          <div className="p-8 bg-slate-50/30 flex flex-col">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              <Upload className="w-4 h-4 text-indigo-500" /> 2. Upload Resumes
            </label>
            
            <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer relative flex flex-col items-center justify-center group">
              <input
                type="file"
                multiple
                accept=".pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-indigo-500" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Drop PDFs here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse files</p>
            </div>

            {/* File List Mini Preview */}
            {files.length > 0 && (
              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Selected ({files.length})</p>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {files.slice(0, 3).map((file, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 truncate">
                      <FileText className="w-3 h-3 text-indigo-400" /> {file.name}
                    </div>
                  ))}
                  {files.length > 3 && <p className="text-[10px] text-indigo-500 font-medium">+ {files.length - 3} more files</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full max-w-md">
          <button
            onClick={handleStartAnalysis}
            disabled={files.length === 0 || !jd.trim()}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            <Zap className="w-5 h-5 fill-current" />
            Start AI Analysis
          </button>
          
          <button
            onClick={resetAll}
            className="w-full sm:w-auto px-6 py-4 bg-white text-slate-600 rounded-2xl font-semibold border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;