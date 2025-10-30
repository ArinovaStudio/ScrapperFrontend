import React, { useState, useRef, useEffect } from "react";
import copyIcon from "../assets/copyIcon.svg";

const QuerySection = ({ data }) => {
    const [query, setQuery] = useState(JSON.stringify(data || {}, null, 2));
    const textareaRef = useRef(null);

    useEffect(() => {
        setQuery(JSON.stringify(data || {}, null, 2));
    }, [data]);

    const handleCopy = () => {
        navigator.clipboard.writeText(query);
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [query]);

    if (!data || data.name.trim() == "") {
        return (
            <div className="w-screen bg-white flex flex-col items-center">
                <div className="w-[95%] mt-6 bg-[#F4F4F4] rounded-2xl shadow-sm border border-[#8EF477] px-8 py-6 relative">
                    No Data Found in inputs
                </div>
            </div>
        )
    }

    return (
        <div className="w-screen bg-white flex flex-col items-center">
            <div className="w-[95%] mt-6 bg-[#F4F4F4] rounded-2xl shadow-sm border border-[#8EF477] px-8 py-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Query Preview</h2>

                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-[#8EF477] text-gray-900 font-medium rounded-md shadow hover:bg-[#7ae865] transition-all duration-200 text-[10px]"
                    >
                        <img src={copyIcon} alt="Copy" className="w-3 h-3" />
                        Copy JSON
                    </button>
                </div>

                <textarea
                    ref={textareaRef}
                    value={query}
                    readOnly
                    className="w-full font-mono text-sm text-gray-800 bg-white border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#8EF477] overflow-hidden"
                />
            </div>
        </div>
    );
};

export default QuerySection;
