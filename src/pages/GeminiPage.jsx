import { useEffect, useState } from 'react';
import { Loader2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function GeminiPage() {
  const [userInput, setUserInput] = useState('');
  const [backendMarkdown, setBackendMarkdown] = useState('');
  const [geminiOutput, setGeminiOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // If you were passing query params manually, mimic it here if needed
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) setUserInput(decodeURIComponent(data));
  }, []);

  const handleBackendSubmit = async () => {
    if (!userInput.trim()) {
      setError('Please enter some data');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_ORIGIN;
      const response = await fetch(`${apiUrl}/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({ company: userInput }),
      });

      if (!response.ok) throw new Error('Backend request failed');

      const result = await response.json();
      setBackendMarkdown(result.markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const handleGeminiSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: backendMarkdown }),
      });

      if (!response.ok) throw new Error('Gemini API request failed');

      const result = await response.json();
      setGeminiOutput(result.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Gemini API');
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setUserInput('');
    setBackendMarkdown('');
    setGeminiOutput('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertPlainTextToJSON = (text) => {
    const lines = text.trim().split('\n').filter((line) => line.trim());
    if (lines.length === 0) return null;

    if (lines.length <= 3 && !text.includes(':') && !text.includes('**')) {
      const result = {};
      if (lines[0]) result.name = lines[0].trim();
      if (lines[1]) result.location = lines[1].trim();
      if (lines[2]) result.website = lines[2].trim();
      return result;
    }
    return null;
  };

  const convertMarkdownToJSON = (markdown) => {
    const lines = markdown.trim().split('\n');
    const result = {};

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        result.name = trimmed.replace(/^###\s*/, '');
      } else if (trimmed.includes(':**') || trimmed.includes('**:')) {
        const match = trimmed.match(/\*\*([^:*]+):\*\*\s*(.+)/);
        if (match) {
          const key = match[1].trim().toLowerCase().replace(/\s+/g, '_');
          const value = match[2].trim();
          result[key] = value;
        }
      }
    });

    return Object.keys(result).length > 0 ? result : null;
  };

  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      const jsonMatch = str.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch {
          const markdownResult = convertMarkdownToJSON(str);
          if (markdownResult) return markdownResult;
          return convertPlainTextToJSON(str);
        }
      }

      const markdownResult = convertMarkdownToJSON(str);
      if (markdownResult) return markdownResult;
      return convertPlainTextToJSON(str);
    }
  };

  const jsonData = parseJSON(userInput);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Data Processing Pipeline — Internal Business Tool
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Use this tool to generate and analyze backend reports in a sequential flow.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="userInput" className="block text-sm font-semibold text-gray-700">
              Input Data
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='e.g. "Google, Microsoft, Amazon..."'
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-black transition-shadow shadow-sm mt-4"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 px-4 py-3 rounded text-sm">{error}</div>
          )}

          <div className="flex flex-wrap items-center gap-4 px-4 py-4">
            <button
              onClick={handleBackendSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-[#1a73e8] text-white text-sm font-medium rounded hover:bg-[#1557b0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Processing...
                </>
              ) : (
                'Proceed'
              )}
            </button>

            <button
              onClick={resetFlow}
              className="px-6 py-2 bg-gray-100 text-black font-medium rounded border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>

          {userInput && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-base font-medium text-[#5f6368]">Query Preview</h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 bg-[#f8f9fa]">
                <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap leading-relaxed">
                  {jsonData ? JSON.stringify(jsonData, null, 2) : userInput}
                </pre>
              </div>
            </div>
          )}

          {backendMarkdown && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Backend Processed Output
                </h2>
                <div className="bg-[#f8f9fa] border border-gray-200 rounded p-4 max-h-96 overflow-y-auto">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                    {backendMarkdown}
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleGeminiSubmit}
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#1a73e8] text-white text-sm font-medium rounded hover:bg-[#1557b0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Sending to AI...
                    </>
                  ) : (
                    'Proceed For Markdown Analysis'
                  )}
                </button>
              </div>
            </div>
          )}

          {geminiOutput && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Analyzing with Gemini...
                </h2>
                <div className="bg-white border border-gray-200 rounded p-6 max-h-96 overflow-y-auto prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: (props) => <h1 className="text-black text-3xl font-bold mt-6 mb-4" {...props} />,
                      h2: (props) => <h2 className="text-black text-2xl font-semibold mt-5 mb-3" {...props} />,
                      h3: (props) => <h3 className="text-black text-xl font-semibold mt-4 mb-2" {...props} />,
                      ul: (props) => <ul className="text-black list-disc list-inside my-3 space-y-1" {...props} />,
                      ol: (props) => <ol className="text-black list-decimal list-inside my-3 space-y-1" {...props} />,
                      p: (props) => <p className="text-black mb-3" {...props} />,
                      code: (props) => (
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                      ),
                      a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
                    }}
                  >
                    {geminiOutput}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetFlow}
                  className="px-6 py-2.5 bg-[#1a73e8] text-white text-sm font-medium rounded hover:bg-[#1557b0] transition-colors"
                >
                  Start New Process
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeminiPage;
