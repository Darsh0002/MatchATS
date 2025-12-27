// import React, { useState } from "react";
// import {
//   Upload,
//   FileText,
//   ChevronRight,
//   Loader2,
//   Search,
//   Filter,
//   Zap,
//   BrainCircuit,
// } from "lucide-react";
// import { findBestMatch } from "../services/backendService";
// import Navbar from "../Components/Navbar";

// const Dashboard = () => {
//   // State for inputs
//   const [files, setFiles] = useState([]);
//   const [jd, setJd] = useState("");

//   // State for UI feedback
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState([]);

//   // 1. Handle selection of files from the local machine
//   const handleFileChange = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     setFiles(uploadedFiles);
//     setShowResults(false); // Reset table if user picks new files
//   };

//   // 2. Main function to call the AI backend
//   const handleStartAnalysis = async () => {
//     // Validation
//     if (files.length === 0) {
//       alert("Please upload at least one resume.");
//       return;
//     }

//     setIsProcessing(true);
//     const formData = new FormData();

//     // Append Job Description
//     formData.append("jd", jd);

//     // Append all files (Key name "files" must match Spring Boot @RequestParam)
//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       const response = await findBestMatch(formData);

//       let data = response.data;

//       // Logic to strip markdown backticks if your backend doesn't do it
//       if (typeof data === "string") {
//         const cleanJson = data.replace(/```json|```/g, "").trim();
//         data = JSON.parse(cleanJson);
//       }

//       // Sort by score descending
//       const sortedData = data.sort(
//         (a, b) => (b.SCORE || b.score) - (a.SCORE || a.score)
//       );

//       setResults(sortedData);
//       setShowResults(true);
//     } catch (error) {
//       console.error("AI Analysis failed:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to analyze resumes. Check your API quota."
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 p-4 ">
//         <div className="max-w-6xl mx-auto">
//           {/* Header Section */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//             <div>
//               <p className="text-gray-500">
//                 Analyze and rank candidates using AI semantic matching.
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setJd("");
//                   setFiles([]);
//                   setShowResults(false);
//                 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-md"
//               >
//                 <Zap className="w-4 h-4" /> Reset
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column: Config */}
//             <div className="space-y-6">
//               {/* Upload Area */}
//               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                   <Upload className="w-5 h-5 text-indigo-600" /> Upload Resumes
//                 </h2>
//                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-400 cursor-pointer bg-gray-50/50 relative">
//                   <input
//                     type="file"
//                     multiple
//                     accept=".pdf"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     id="resume-upload"
//                     onChange={handleFileChange}
//                   />
//                   <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
//                   <p className="text-sm font-medium text-gray-600">
//                     Click to upload PDFs
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">Maximum 50 files</p>
//                 </div>

//                 {files.length > 0 && (
//                   <div className="mt-4 space-y-2">
//                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
//                       Queue ({files.length})
//                     </p>
//                     <div className="max-h-40 overflow-y-auto space-y-2">
//                       {files.map((file, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
//                         >
//                           <FileText className="w-4 h-4 text-indigo-500" />
//                           <span className="truncate">{file.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       onClick={handleStartAnalysis}
//                       disabled={isProcessing}
//                       className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg"
//                     >
//                       {isProcessing ? (
//                         <>
//                           <Loader2 className="w-5 h-5 animate-spin" />{" "}
//                           Processing...
//                         </>
//                       ) : (
//                         "Start Analysis"
//                       )}
//                     </button>

//                   </div>
//                 )}
//               </div>

//               {/* Job Description Input */}
//               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-indigo-600" /> Job
//                   Description
//                 </h2>
//                 <textarea
//                   className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
//                   placeholder="Paste the job requirements here..."
//                   value={jd}
//                   onChange={(e) => setJd(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={() => {
//                   setJd("");
//                   setFiles([]);
//                   setShowResults(false);
//                 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-md"
//               >
//                 <Zap className="w-4 h-4" /> Reset
//               </button>
//             </div>

//             {/* Right Column: Results */}
//             <div className="lg:col-span-2">
//               {!showResults && !isProcessing ? (
//                 <div className="bg-white rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
//                   <Search className="w-16 h-16 mb-4 opacity-20" />
//                   <p className="text-lg font-medium">No results to show yet</p>
//                   <p className="text-sm">
//                     Upload resumes and paste JD to see rankings.
//                   </p>
//                 </div>
//               ) : isProcessing ? (
//                 <div className="bg-white rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center p-12 text-center">
//                   <Loader2 className="w-16 h-16 mb-4 text-indigo-600 animate-spin" />
//                   <p className="text-xl font-bold text-gray-900">
//                     AI is analyzing profiles...
//                   </p>
//                   <p className="text-gray-500">
//                     Matching experience and skills contextually.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//                     <h2 className="font-bold text-gray-900">
//                       Ranked Candidates
//                     </h2>
//                     <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
//                       Analysis Complete
//                     </span>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                       <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
//                         <tr>
//                           <th className="px-6 py-4">Candidate</th>
//                           <th className="px-6 py-4">Match</th>
//                           <th className="px-6 py-4">Experience</th>
//                           <th className="px-6 py-4">Status</th>
//                           <th className="px-6 py-4"></th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-100">
//                         {results.map((c, idx) => (
//                           <tr
//                             key={idx}
//                             className="hover:bg-gray-50/80 transition-colors group"
//                           >
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
//                                   {(c.NAME || c.name)?.[0] || "U"}
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-bold text-gray-900">
//                                     {c.NAME || c.name}
//                                   </p>
//                                   <div className="flex flex-wrap gap-1 mt-1">
//                                     {(c.SKILLS || c.skills)
//                                       ?.slice(0, 3)
//                                       .map((s, i) => (
//                                         <span
//                                           key={i}
//                                           className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500"
//                                         >
//                                           {s}
//                                         </span>
//                                       ))}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               <span
//                                 className={`text-sm font-bold ${
//                                   (c.SCORE || c.score) > 80
//                                     ? "text-green-600"
//                                     : (c.SCORE || c.score) > 50
//                                     ? "text-amber-600"
//                                     : "text-red-600"
//                                 }`}
//                               >
//                                 {c.SCORE || c.score}%
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-600 font-medium">
//                               {c.EXPERIENCE || c.experience}
//                             </td>
//                             <td className="px-6 py-4">
//                               <span
//                                 className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
//                                   (c.STATUS || c.status) === "Strong Match"
//                                     ? "bg-green-100 text-green-700"
//                                     : "bg-amber-100 text-amber-700"
//                                 }`}
//                               >
//                                 {c.STATUS || c.status}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                               <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { Upload, FileText, Loader2, Search, Zap } from "lucide-react";
import { findBestMatch } from "../services/backendService";
import Navbar from "../Components/Navbar";
import ShowResult from "../Components/ShowResult"; // Import your new component

const Dummy = () => {
  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
    setShowResults(false);
  };

  const handleStartAnalysis = async () => {
    if (files.length === 0) {
      alert("Please upload at least one resume.");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("jd", jd);
    files.forEach((file) => {
      formData.append("files", file);
    });

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
      setShowResults(true);
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
    setShowResults(false);
    setResults([]);
  };

  return (
    <>
      <Navbar />

      {Array.isArray(results) && results.length > 0 ? (
        <ShowResult data={results} />
      ) : (
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <p className="text-gray-500">
                  Analyze and rank candidates using AI semantic matching.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Config */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-indigo-600" /> Upload
                    Resumes
                  </h2>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-400 cursor-pointer bg-gray-50/50 relative">
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-600">
                      Click to upload PDFs
                    </p>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {files.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                          >
                            <FileText className="w-4 h-4 text-indigo-500" />
                            <span className="truncate">{file.name}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleStartAnalysis}
                        disabled={isProcessing}
                        className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Start Analysis"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Job
                    Description
                  </h2>
                  <textarea
                    className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    placeholder="Paste requirements..."
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                  />
                </div>
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-md"
                >
                  <Zap className="w-4 h-4" /> Reset
                </button>
              </div>

              {/* Right Column: Dynamic Content */}
              <div className="lg:col-span-2">
                {isProcessing && (
                  /* 1. Loading State */
                  <div className="bg-white rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center p-12 text-center">
                    <Loader2 className="w-16 h-16 mb-4 text-indigo-600 animate-spin" />
                    <p className="text-xl font-bold text-gray-900">
                      AI is analyzing profiles...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dummy;
