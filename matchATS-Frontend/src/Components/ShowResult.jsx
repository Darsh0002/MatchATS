import React, { useState } from "react";
import {
  ChevronRight,
  Code2,
  Mail,
  X,
  Loader2,
  Send,
  Sparkles,
  Briefcase,
  GraduationCap,
  Trophy,
  CheckCircle2,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { sendEmail } from "../services/backendService";

const ShowResult = ({ data = [] }) => {
  const [openDetails, setDetailsOpen] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const closeModal = () => {
    setDetailsOpen(false);
    setCandidate(null);
    setMessage("");
  };

  const openDetailsModal = (c) => {
    setCandidate(c);
    setMessage("");
    setDetailsOpen(true);
  };

  const quickFill = (type) => {
    const name = candidate?.NAME || candidate?.name;
    if (type === "selected") {
      setMessage(
        `Congratulations ${name}! \n\nYour profile stood out to our team. We'd love to invite you for a technical interview to discuss your expertise in ${(
          candidate?.SKILLS || []
        )
          .slice(0, 2)
          .join(", ")}.`
      );
    } else {
      setMessage(
        `Hi ${name}, \n\nThank you for applying. While your background is impressive, we've decided to move forward with other candidates who more closely match our current requirements.`
      );
    }
  };

  const handleSendEmail = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setIsSending(true); // START LOADING

    try {
      const payload = {
        msg: message,
        email: candidate.email,
      };

      await sendEmail(payload);

      toast.success("Email Sent Successfully");
      closeModal();
    } catch (err) {
      toast.error("Failed to send email, Try Again Later");
      console.error(err);
    } finally {
      setIsSending(false); // STOP LOADING
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 antialiased text-slate-900">
      {/* ================= HEADER SECTION ================= */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600 p-1.5 rounded-lg">
              <Trophy className="w-5 h-5 text-white" />
            </span>
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
              Recruitment Intelligence
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Top Talent <span className="text-slate-400">Analysis</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500">
              {data.length} Candidates Screened
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABLE CONTAINER ================= */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">
                  Candidate Information
                </th>
                <th className="px-6 py-6 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">
                  Expertise & Skills
                </th>
                <th className="px-6 py-6 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">
                  AI Match Score
                </th>
                <th className="px-6 py-6 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">
                  Status
                </th>
                <th className="px-8 py-6 text-right text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((c, idx) => {
                const score = c.SCORE || c.score || 0;
                const skills = c.SKILLS ||
                  c.skills || ["General", "Problem Solving"];

                return (
                  <tr
                    key={idx}
                    onClick={() => openDetailsModal(c)}
                    className="group hover:bg-indigo-50/30 transition-all duration-300 hover:cursor-pointer"
                  >
                    {/* User Info */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 text-white font-bold flex items-center justify-center text-xl shadow-lg shadow-slate-200 ring-4 ring-white">
                            {(c.NAME || c.name)?.[0]}
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                            {c.NAME || c.name}
                          </p>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Briefcase className="w-3 h-3" />
                            <span className="text-xs font-semibold uppercase">
                              {c.EXPERIENCE || c.experience} Experience
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Skills Column */}
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-1.5 max-w-70">
                        {skills.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-tighter shadow-sm group-hover:border-indigo-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {skills.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold">
                            +{skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Match Score */}
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-2 min-w-30">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-black text-indigo-600">
                            {score}%
                          </span>
                          <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest
                        ${
                          (c.STATUS || c.status) === "Selected"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {c.STATUS || c.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailsModal(c);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {openDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop with high-end blur */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl transition-opacity"
            onClick={closeModal}
          />

          {/* Main Modal Card */}
          <div className="relative bg-white rounded-[3rem] w-full max-w-6xl max-h-[92vh] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
            {/* Left Side: Candidate Profile Details (Sidebar) */}
            <div className="w-full md:w-[40%] border-r border-slate-100 overflow-y-auto bg-linear-to-b from-slate-50/80 to-white p-8 md:p-12">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 mb-10">
                <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-600 text-white flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-200 ring-8 ring-white">
                  {(candidate?.NAME || candidate?.name)?.[0]}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {candidate?.NAME || candidate?.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    {candidate?.SCORE || candidate?.score}% Match
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <DetailSection
                  icon={<Briefcase className="w-5 h-5 text-indigo-500" />}
                  title="Professional Experience"
                  content={candidate?.EXPERIENCE || candidate?.experience}
                />
                <DetailSection
                  icon={<GraduationCap className="w-5 h-5 text-indigo-500" />}
                  title="Academic Background"
                  content={
                    candidate?.EDUCATION ||
                    candidate?.education ||
                    "Bachelor of Technology"
                  }
                />

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    <Code2 className="w-4 h-4 text-slate-300" /> Technical
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(candidate?.SKILLS || candidate?.skills || []).map(
                      (s, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 shadow-sm hover:border-indigo-300 transition-colors"
                        >
                          {s}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Email Composer */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Header */}
              <div className="px-10 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    Compose Message
                  </h3>
                  <p className="text-sm font-medium text-slate-400">
                    Direct contact with the candidate
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-3 hover:bg-slate-50 rounded-2xl transition-all group"
                >
                  <X className="w-6 h-6 text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Composer Body */}
              <div className="p-10 flex-1 overflow-y-auto space-y-6">
                {/* Smart Templates */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Smart Templates
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => quickFill("selected")}
                      className="flex flex-col items-start p-5 rounded-4xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group text-left"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>
                      <span className="text-slate-900 font-bold text-sm">
                        Acceptance
                      </span>
                      <span className="text-slate-500 text-[10px] mt-1">
                        Shortlist for interviews
                      </span>
                    </button>
                    <button
                      onClick={() => quickFill("rejected")}
                      className="flex flex-col items-start p-5 rounded-4xl border-2 border-slate-100 hover:border-rose-500 hover:bg-rose-50/50 transition-all group text-left"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 rounded-full bg-rose-600" />
                      </div>
                      <span className="text-slate-900 font-bold text-sm">
                        Rejection
                      </span>
                      <span className="text-slate-500 text-[10px] mt-1">
                        Politely decline profile
                      </span>
                    </button>
                  </div>
                </div>

                {/* Message Area */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Email Content
                    </label>
                    <span className="text-[10px] text-indigo-500 font-bold italic bg-indigo-50 px-2 py-1 rounded-md">
                      ✨ AI personalizing placeholders
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Start drafting your professional message..."
                    className="w-full border-2 border-slate-100 rounded-4xl p-6 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all resize-none shadow-sm bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-10 py-8 bg-slate-50/30 flex justify-end gap-4 border-t border-slate-100">
                <button
                  onClick={closeModal}
                  className="px-8 py-4 rounded-2xl text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={isSending || !message.trim()} // Disable if sending OR message is empty
                  className={`group flex items-center gap-3 px-12 py-4 rounded-2xl text-sm font-black shadow-xl transition-all active:scale-95 
    ${
      isSending
        ? "bg-slate-400 cursor-not-allowed shadow-none"
        : "bg-slate-900 text-white shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200"
    }`}
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                  {isSending ? "Sending..." : "Send Mail"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// Helper Components
const DetailSection = ({ icon, title, content }) => (
  <div>
    <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
      {React.cloneElement(icon, { className: "w-3 h-3" })} {title}
    </label>
    <p className="text-sm font-bold text-slate-700">{content}</p>
  </div>
);
export default ShowResult;
