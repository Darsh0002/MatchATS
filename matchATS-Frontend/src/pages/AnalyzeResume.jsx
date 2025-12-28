import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  FileText,
  Upload,
  Search,
  Sparkles,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import { analyzeResume } from "../services/backendService";
import { toast } from "react-hot-toast";

const AnalyzeResume = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected[0]?.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    setFiles(selected);
    toast.success("Resume attached.");
  };

  const removeFile = () => setFiles([]);

  const handleAnalyze = async () => {
    if (files.length === 0) return toast.error("Upload a resume first.");
    
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("jd", jobDesc);
    formData.append("file", files[0]);

    try {
      const response = await analyzeResume(formData);
      let data = response.data;
      if (typeof data === "string") {
        data = JSON.parse(data.replace(/```json|```/g, "").trim());
      }
      setResult(data);
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Dynamic color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return "#4F46E5"; // Indigo
    if (score >= 50) return "#F59E0B"; // Amber
    return "#EF4444"; // Red
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-indigo-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 lg:p-12 space-y-10 text-slate-900">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black tracking-tighter">
              Resume <span className="text-indigo-600 italic">Intelligence</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg mt-2">
              Advanced AI gap analysis for professional profiles.
            </p>
          </motion.div>

          {result && (
            <button
              onClick={() => { setResult(null); setFiles([]); }}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
            >
              <RefreshCw className="w-4 h-4" /> Start New
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input-stage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* UPLOAD SECTION */}
              <div className="space-y-6">
                <div className="bg-white p-3 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
                  {!files.length ? (
                    <div className="relative group border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
                      <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-10 h-10 text-indigo-600" />
                      </div>
                      <p className="text-2xl font-black text-slate-800">Upload Resume</p>
                      <p className="text-slate-400 mt-2 font-medium">Click to browse or drag PDF here</p>
                    </div>
                  ) : (
                    <div className="p-12 flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-4">
                        <FileText className="w-10 h-10 text-emerald-600" />
                      </div>
                      <p className="text-xl font-black text-slate-800">{files[0].name}</p>
                      <button onClick={removeFile} className="mt-4 flex items-center gap-2 text-rose-500 font-bold hover:bg-rose-50 px-4 py-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" /> Remove File
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !files.length}
                  className="group w-full flex items-center justify-center gap-3 py-6 rounded-4xl font-black text-white transition-all bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 shadow-xl shadow-indigo-100 active:scale-95"
                >
                  {isAnalyzing ? <RefreshCw className="animate-spin" /> : <Sparkles className="group-hover:rotate-12 transition-transform" />}
                  {isAnalyzing ? "Processing Matrix..." : "Analyze Alignment"}
                </button>
              </div>

              {/* JD SECTION */}
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-slate-900 rounded-2xl text-white"><Search className="w-5 h-5" /></div>
                  <h2 className="text-2xl font-black tracking-tight">Job Description</h2>
                </div>
                <textarea
                  className="w-full flex-1 min-h-75 p-8 bg-slate-50 border-2 border-slate-100 rounded-4xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none resize-none font-medium text-slate-700 leading-relaxed transition-all"
                  placeholder="Paste the job requirements here..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
            </motion.div>
          ) : (
            /* RESULT VIEW */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              
              {/* SCORE HERO */}
              <div className="relative bg-white rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="relative shrink-0">
                  <svg className="w-72 h-72 -rotate-90">
                    <circle cx="144" cy="144" r="128" stroke="#F1F5F9" strokeWidth="24" fill="none" />
                    <motion.circle
                      cx="144" cy="144" r="128" 
                      stroke={getScoreColor(result.matchScore)} 
                      strokeWidth="24" fill="none"
                      strokeDasharray={804.25}
                      initial={{ strokeDashoffset: 804.25 }}
                      animate={{ strokeDashoffset: 804.25 - (804.25 * result.matchScore) / 100 }}
                      transition={{ duration: 2, ease: "circOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-8xl font-black tracking-tighter">
                      {result.matchScore}
                    </motion.span>
                    <span className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Match Percent</span>
                  </div>
                </div>

                <div className="space-y-6 flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase">
                    <Zap className="w-3 h-3" /> Technical Compatibility Report
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                    Your profile is a <span style={{ color: getScoreColor(result.matchScore) }}>
                      {result.matchScore >= 80 ? 'Strong' : result.matchScore >= 50 ? 'Moderate' : 'Weak'}
                    </span> match.
                  </h2>
                  <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-2xl">
                    Our AI cross-referenced 40+ data points including skill depth, experience duration, and role context.
                  </p>
                </div>
              </div>

              {/* SUMMARY */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-r from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="absolute right-10 top-10 w-20 h-20 text-indigo-500 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
                <h3 className="text-indigo-400 font-black uppercase text-xs tracking-[0.3em] mb-6">Strategic Recommendation</h3>
                <p className="text-3xl font-bold leading-tight relative z-10">{result.recommendation}</p>
              </motion.div>

              {/* GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <InsightCard title="Strengths" items={result.strengths} color="emerald" icon={<CheckCircle2 />} delay={0.3} />
                <InsightCard title="Weaknesses" items={result.weaknesses} color="rose" icon={<XCircle />} delay={0.4} />
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
                  <h4 className="flex items-center gap-3 text-indigo-600 font-black uppercase text-xs tracking-widest mb-8">
                    <AlertCircle className="w-5 h-5" /> Skill Gaps
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.missingSkills.map((skill, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: 0.5 + (i * 0.05) }}
                        className="px-5 py-3 rounded-2xl bg-slate-50 text-slate-700 text-[13px] font-black border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const InsightCard = ({ title, icon, items, color, delay }) => {
  const theme = color === "emerald" 
    ? { text: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-400" } 
    : { text: "text-rose-700", bg: "bg-rose-50", dot: "bg-rose-400" };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ delay }}
      className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl"
    >
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest mb-8 ${theme.text} ${theme.bg}`}>
        {icon} {title}
      </div>
      <ul className="space-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4 text-[15px] font-bold text-slate-600 leading-tight">
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${theme.dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AnalyzeResume;