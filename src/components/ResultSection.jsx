import React, { useEffect, useState } from "react";

const ResultSection = ({ data }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(data);
  }, [data]);

  return (
    <>
      {result && result.length > 0 ? (
        <div className="w-[95%] mx-auto mt-8 bg-[#F4F4F4] rounded-2xl shadow-sm border border-[#8EF477] p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Research Results
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#8EF477] text-gray-900 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left w-[60px]">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Summary</th>
                  <th className="px-4 py-3 text-left">Highlights</th>
                  <th className="px-4 py-3 text-left">Popularity</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-[#E8FFE3] transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 font-medium align-top">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 align-top">{item.name}</td>
                    <td className="px-4 py-3 align-top">{item.summary}</td>
                    <td className="px-4 py-3 align-top">
                      {item.highlights.map((highlight, idx) => (
                        <span key={idx} className="block text-sm">
                          • {highlight}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-3 align-top">{item.popularity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-[95%] mx-auto mt-8 bg-[#F4F4F4] rounded-2xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
          No results yet
        </div>
      )}
    </>
  );
};

export default ResultSection;
