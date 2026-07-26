import { useState, useRef, useCallback } from "react";
import axios from "axios";
import { Sparkles, Copy, Check } from "lucide-react";

const TRY_EXAMPLES = [
  {
    label: "Blog post",
    value: "Write a blog post about remote work",
  },
  {
    label: "SQL help",
    value: "Write a SQL query to find our top customers",
  },
  {
    label: "Product email",
    value: "Write an email announcing our new product feature",
  },
  {
    label: "Social media",
    value: "Write an engaging LinkedIn post about the future of AI in web development",
  },
];
// Local backend endpoint that performs the actual enhancement.
const ENHANCE_API_URL = import.meta.env.VITE_API_URL;

// Pulls the enhanced text out of the API response no matter which field
// name the backend uses. Adjust/trim this list to match your API's exact
// response shape once you confirm it.
function extractEnhancedText(data) {
  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    const candidate =
      data.enhanced_prompt ??
      data.enhancedPrompt ??
      data.enhanced ??
      data.result ??
      data.prompt ??
      data.text ??
      data.message;
    if (typeof candidate === "string") return candidate;
  }
  // Fallback so something is always shown instead of failing silently.
  return JSON.stringify(data, null, 2);
}

// Calls the local backend to enhance a prompt.
async function enhancePrompt(promptText) {
  const response = await axios.post(ENHANCE_API_URL, {
    prompt: promptText,
  });
  console.log(response)
  return extractEnhancedText(response.data);
}

export default function Prompt_Enhancer() {
  const [original, setOriginal] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const runEnhance = useCallback(async () => {
    const trimmed = original.trim();
    if (!trimmed || isEnhancing) return;

    setIsEnhancing(true);
    setEnhanced("");
    setError("");

    try {
      const result = await enhancePrompt(trimmed);
      setEnhanced(result);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response
          ? `Server responded with ${err.response.status}. Is the API at ${ENHANCE_API_URL} working correctly?`
          : `Couldn't reach ${ENHANCE_API_URL}. Is the backend running?`
        : "Something went wrong while enhancing the prompt.";
      setError(message);
    } finally {
      setIsEnhancing(false);
    }
  }, [original, isEnhancing]);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runEnhance();
    }
  };

  const handleClear = () => {
    setOriginal("");
    setEnhanced("");
    setIsEnhancing(false);
    setError("");
    setCopied(false);
    textareaRef.current?.focus();
  };

  const handleTryExample = (value) => {
    setOriginal(value);
    setEnhanced("");
    setError("");
    setCopied(false);
    textareaRef.current?.focus();
  };

  const handleCopy = async () => {
    if (!enhanced) return;
    try {
      await navigator.clipboard.writeText(enhanced);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail silently (e.g. insecure context); no-op.
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Main content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          Turn a rough idea into a precise prompt
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl leading-relaxed text-sm sm:text-base lg:text-lg">
          Paste what you have. Get back a structured prompt with clear role,
          task, constraints and output format.
        </p>

        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-8">
          {/* Original prompt column */}
          <div>
            <label
              htmlFor="original-prompt"
              className="block text-sm font-semibold text-gray-900 mb-2 lg:text-base"
            >
              Original Prompt
            </label>
            <textarea
              id="original-prompt"
              ref={textareaRef}
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. write a blog post about remote work"
              className="w-full h-64 sm:h-80 lg:h-96 resize-y rounded-lg border border-gray-200 p-4 text-[15px] text-gray-800 placeholder-gray-400 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 lg:text-base"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={runEnhance}
                  disabled={!original.trim() || isEnhancing}
                  className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 lg:px-5 lg:py-2.5 lg:text-base"
                >
                  <Sparkles className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.25} />
                  {isEnhancing ? "Enhancing…" : "Enhance Prompt"}
                </button>
                <span className="text-xs text-gray-400 lg:text-sm">
                  or press Ctrl + Enter
                </span>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-gray-500 transition hover:text-gray-700 lg:text-base"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 mr-1 lg:text-sm">Try</span>
              {TRY_EXAMPLES.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => handleTryExample(example.value)}
                  className="group relative rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition-all duration-150 ease-out hover:border-teal-300 hover:bg-teal-100 hover:text-teal-700 hover:shadow-sm hover:shadow-teal-900/5 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 lg:px-4 lg:py-1.5 lg:text-sm"
                >
                  <span className="relative z-10">{example.label}</span>
                  <span className="absolute inset-0 rounded-full bg-linear-to-r from-teal-50 to-teal-100/50 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced prompt column */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-900 lg:text-base">
                Enhanced Prompt
              </label>
              {enhanced && !isEnhancing && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-gray-700 lg:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 lg:h-4 lg:w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 lg:h-4 lg:w-4" /> Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50/60">
              {isEnhancing ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <div className="h-9 w-9 lg:h-10 lg:w-10 animate-spin rounded-full border-2 border-teal-700/25 border-t-teal-700" />
                  <p className="text-sm text-gray-400 lg:text-base">
                    Structuring your prompt…
                  </p>
                </div>
              ) : error ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-red-50">
                    <Sparkles
                      className="h-4 w-4 lg:h-5 lg:w-5 text-red-600"
                      strokeWidth={2.25}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 lg:text-base">
                    Couldn't enhance that prompt
                  </p>
                  <p className="text-sm text-gray-400 max-w-65 lg:max-w-xs lg:text-base">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={runEnhance}
                    className="mt-1 text-sm font-medium text-teal-700 hover:text-teal-800 lg:text-base"
                  >
                    Try again
                  </button>
                </div>
              ) : enhanced ? (
                <pre className="h-full whitespace-pre-wrap wrap-break-word p-4 font-sans text-[15px] leading-relaxed text-gray-800 lg:p-6 lg:text-base">
                  {enhanced}
                </pre>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <div className="relative">
                    <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-linear-to-br from-teal-50 to-teal-100 shadow-sm shadow-teal-900/5 transition-all duration-300 ease-out group-hover:shadow-md group-hover:shadow-teal-900/10 group-hover:scale-105">
                      <Sparkles
                        className="h-5 w-5 lg:h-6 lg:w-6 text-teal-600 transition-transform duration-500 ease-out group-hover:rotate-12"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 flex h-3.5 w-3.5 lg:h-4 lg:w-4 items-center justify-center rounded-full bg-teal-700 shadow-sm shadow-teal-900/20">
                      <span className="text-[8px] lg:text-[9px] text-white">✦</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-gray-900 lg:text-base">
                      Your enhanced prompt will appear here
                    </p>
                    <p className="text-sm text-gray-400 max-w-60 lg:max-w-xs lg:text-base leading-relaxed">
                      Write a prompt on the left, then hit{" "}
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md mt-1 bg-teal-50 text-teal-700 border-teal-300 border font-medium text-xs lg:text-sm">
                        <Sparkles className="h-3 w-3" strokeWidth={2} />
                        Enhance Prompt
                      </span>
                    </p>
                  </div>

                  <div className="mt-2 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono text-[11px]">
                        Ctrl + Enter
                      </span>
                      <span>shortcut available</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-300">
                      <div className="h-px w-6 bg-gray-200" />
                      <span>structured output</span>
                      <div className="h-px w-6 bg-gray-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}