import { ChevronRight, Zap } from "lucide-react";

const ShowResult = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h2 className="font-bold text-gray-900">Ranked Candidates</h2>
        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
          Analysis Complete
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Match</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((c, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50/80 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {(c.NAME || c.name)?.[0] || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {c.NAME || c.name}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(c.SKILLS || c.skills)?.slice(0, 5).map((s, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-bold">{c.SCORE || c.score}%</td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {c.EXPERIENCE || c.experience}
                </td>

                <td className="px-6 py-4">
                  <span className="text-[11px] font-bold uppercase px-2 py-1 rounded bg-green-100 text-green-700">
                    {c.STATUS || c.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={resetAll}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-md"
      >
        <Zap className="w-4 h-4" /> Reset
      </button>
    </div>
  );
};

export default ShowResult;
