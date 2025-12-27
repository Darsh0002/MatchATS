import React from "react";
import {
  CheckCircle2,
  FileSearch,
  Zap,
  ShieldCheck,
  ArrowRight,
  Star,
  Download,
  BarChart3,
} from "lucide-react";
import Navbar from "../Components/Navbar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              New: AI-Powered Resume Scoring 2.0
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Beat the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                ATS Robot
              </span>{" "}
              <br />& Get More Interviews.
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Optimize your resume for any job description in seconds. Our AI
              analyzes keywords, formatting, and relevance to help you rank #1.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Analyze My Resume <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                View Sample Report
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
                Trusted by students from
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
                <span className="text-2xl font-bold italic text-gray-800">
                  PDEU
                </span>
                <span className="text-2xl font-bold italic text-gray-800">
                  Google
                </span>
                <span className="text-2xl font-bold italic text-gray-800">
                  Microsoft
                </span>
                <span className="text-2xl font-bold italic text-gray-800">
                  Amazon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Your Career
              </h2>
              <p className="text-gray-600">
                Everything you need to land your dream job in tech.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FileSearch className="text-indigo-600" size={28} />}
                title="Keyword Analysis"
                desc="We extract the most important skills from job descriptions and check if they are in your resume."
              />
              <FeatureCard
                icon={<BarChart3 className="text-indigo-600" size={28} />}
                title="Match Score"
                desc="Get a detailed percentage score showing how well you fit the specific role requirements."
              />
              <FeatureCard
                icon={<Zap className="text-indigo-600" size={28} />}
                title="Instant Feedback"
                desc="Actionable tips on how to improve your bullet points and impact statements using AI."
              />
            </div>
          </div>
        </section>

        {/* --- CTA / Results Section --- */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
              {/* Background design for CTA */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to skip the "No-Reply" phase?
              </h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
                Join 10,000+ applicants who have used MatchATS to optimize their
                profiles and land interviews.
              </p>
              <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-gray-100 transition-colors shadow-lg">
                Get Started for Free
              </button>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black">
                Match<span className="text-indigo-600">ATS</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 MatchATS. Built with ❤️ for job seekers.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 group">
    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
