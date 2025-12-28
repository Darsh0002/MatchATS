import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  FileSearch,
  Brain,
  CheckCircle2,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileUp,
  FileText,
  Cpu,
  Award,
  Layers,
  ShieldCheck,
  LayoutDashboard,
  UserCheck,
  BrainCircuit,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-violet-200/30 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-600">
              Next-Gen Recruitment
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8"
          >
            Precision Matching <br />
            <span className="text-indigo-600 relative">
              with matchATS.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 358 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9C118.957 4.47226 238.497 2.49746 355 9"
                  stroke="#6366F1"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Stop the manual grind. Use the world's most intuitive AI engine to
            rank candidates and analyze resumes in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
          >
            {/* CTA 1: For Individual Analysis */}
            <button
              onClick={() => navigate("/analyze")}
              className="group px-8 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <UserCheck className="w-5 h-5" />
              Analyze Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: For Recruiter Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="group px-8 py-5 rounded-[2rem] bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <LayoutDashboard className="w-5 h-5 text-indigo-400" />
              Find Best Candidate
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-100">
        <div className="grid md:grid-cols-3 gap-10">
          <Feature
            icon={<Brain />}
            title="Contextual Intelligence"
            desc="We don't just find keywords. matchATS understands role seniority, industry nuance, and technical depth."
          />
          <Feature
            icon={<Layers />}
            title="Bulk Ranker"
            desc="Upload hundreds of resumes to the dashboard and let matchATS instantly curate your top 10%."
          />
          <Feature
            icon={<ShieldCheck />}
            title="Bias-Free Engine"
            desc="Advanced algorithms designed to focus purely on merit, ensuring a fair and diverse hiring pipeline."
          />
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black tracking-tight mb-4"
            >
              Four Steps to{" "}
              <span className="text-indigo-600">Perfect Alignment</span>
            </motion.h2>
            <p className="text-slate-500 font-medium text-lg">
              The seamless journey from raw data to actionable hiring insights.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative grid md:grid-cols-4 gap-8">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-[28%] left-0 w-full h-[2px] bg-slate-100 -z-0">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
              />
            </div>

            <StepItem
              number="01"
              icon={<FileUp className="w-7 h-7" />}
              title="Upload Resume"
              desc="Drop your PDF resume into our secure analyzer. matchATS parses data instantly."
              delay={0.1}
            />
            <StepItem
              number="02"
              icon={<FileText className="w-7 h-7" />}
              title="Paste JD"
              desc="Provide the Job Description you're targeting to set the evaluation baseline."
              delay={0.2}
            />
            <StepItem
              number="03"
              icon={<Cpu className="w-7 h-7" />}
              title="AI Engine"
              desc="AI deep-scans for semantic matches, skill gaps, and experience depth."
              delay={0.3}
            />
            <StepItem
              number="04"
              icon={<Award className="w-7 h-7" />}
              title="Get Score"
              desc="Receive a comprehensive match score with strengths and tailored feedback."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ================= DUAL USE CASES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-3xl font-black mb-4">Are you a Job Seeker?</h3>
            <p className="text-indigo-100 mb-8 font-medium">
              Verify your resume against any JD before you hit apply.
            </p>
            <button
              onClick={() => navigate("/analyze")}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:scale-105 transition-all"
            >
              Improve Your Resume
            </button>
          </div>

          <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl">
            <h3 className="text-3xl font-black mb-4">Are you a Recruiter?</h3>
            <p className="text-slate-400 mb-8 font-medium">
              Manage multiple candidates and find the absolute best fit.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:scale-105 transition-all"
            >
              Find Best Fit
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition">
                  <BrainCircuit className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Match<span className="text-indigo-600">ATS</span>
                </span>
              </Link>
              <p className="text-slate-400 font-bold mt-2">
                Next-Gen Hiring Intelligence.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/darsh-balar-802981279/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
          <p className="text-center text-xs mt-20 text-slate-300 font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} matchATS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* Components (Feature, SocialIcon) same as previous versions with subtle style refinements */
const Feature = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50"
  >
    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-black mb-3">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const SocialIcon = ({ icon }) => (
  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
    {React.cloneElement(icon, { size: 20 })}
  </button>
);

const StepItem = ({ number, icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative z-10 flex flex-col items-center text-center group"
  >
    {/* Number Backdrop */}
    <div className="absolute -top-10 text-[120px] font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none -z-10">
      {number}
    </div>

    {/* Icon Container */}
    <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
      {icon}
    </div>

    <h3 className="text-xl font-black mb-3 text-slate-900">{title}</h3>
    <p className="text-sm font-medium text-slate-500 leading-relaxed px-4">
      {desc}
    </p>

    {/* Mobile Arrow (Visible only on small screens) */}
    <div className="md:hidden mt-8 text-slate-200">
      <ArrowRight className="w-6 h-6 rotate-90" />
    </div>
  </motion.div>
);

export default LandingPage;
