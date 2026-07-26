import { useState, useRef } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { NavLink } from 'react-router-dom'

const STATS = [
  { value: "⚡ AI Powered", label: "Advanced Prompt Enhancement" },
  { value: "🧠 Smart Optimization", label: "Context-aware rewriting" },
  { value: "🔒 100% Private", label: "No prompts stored on our servers" },
];

const STEPS = [
  {
    number: "1",
    title: "Paste your rough prompt",
    description:
      "A half-formed sentence is enough. Keep any specifics you already know — they are always preserved.",
  },
  {
    number: "2",
    title: "Intelligent AI processing",
    description:
      "Our AI understands your request, removes ambiguity, adds structure, and produces a prompt that's ready for better AI responses.",
  },
  {
    number: "3",
    title: "Copy and run it",
    description:
      "Use your enhanced prompt with any AI model to produce clearer, more accurate, and more consistent responses from the start",
  },
];

const FEATURES = [
  {
    letter: "A",
    title: "AI-Powered Enhancement",
    description:
      "Advanced prompt engineering transforms rough input into high-quality instructions.",
  },
  {
    letter: "C",
    title: "Context-Aware Processing",
    description:
      "The AI understands your intent before improving structure, clarity, and precision.",
  },
  {
    letter: "B",
    title: "Higher-Quality Outputs",
    description:
      "Better prompts lead to more accurate, relevant, and reliable AI responses.",
  },
  {
    letter: "R",
    title: "Continuous Refinement",
    description:
      "Re-enhance prompts as your ideas evolve without starting from scratch.",
  },
  {
    letter: "P",
    title: "Privacy by Design",
    description:
      "Your prompts remain private and are never permanently stored on our servers",
  },
  {
    letter: "U",
    title: "Universal Compatibility",
    description:
      "Built to work seamlessly with today's leading AI models and platforms.",
  },
];

const AFTER_FIELDS = [
  {
    label: "Role",
    value:
      "You are a workplace strategist writing for an audience of engineering managers.",
  },
  {
    label: "Task",
    value:
      "Write a 900-word blog post on how distributed teams keep decision-making fast without adding meetings.",
  },
  {
    label: "Constraints",
    value:
      'Three concrete practices, one counter-argument, no generic "communication is key" advice.',
  },
  {
    label: "Output format",
    value: "H2 sections, a one-line takeaway under each, closing checklist.",
  },
];

export default function Hero({ onOpenEnhancer } = {}) {
  const [activeTab, setActiveTab] = useState("overview");
  const demoRef = useRef(null);

  const handleOpenEnhancer = () => {
    if (typeof onOpenEnhancer === "function") {
      onOpenEnhancer();
    } else {
      setActiveTab("enhance");
    }
  };

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-11">
        {/* Hero */}
        <section className="pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E9F3F2] px-3 py-1 text-xs font-medium text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />
              Prompt engineering, handled
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[50px]">
              Better prompts,
              <br />
              without the guesswork.
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-base lg:text-lg">
              Prompt Enhancer rewrites a rough idea into a precise,
              well-structured prompt — clear role, concrete task, explicit
              constraints, defined output format. One click, no
              prompt-engineering course required.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <NavLink to="/enhance">
                <button
                  type="button"
                  onClick={handleOpenEnhancer}
                  className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 lg:px-5 lg:py-3 lg:text-base"
                >
                  <Sparkles className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.25} />
                  Enhance a prompt
                </button>
              </NavLink>
              <button
                type="button"
                onClick={scrollToDemo}
                className="rounded-md border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 lg:px-5 lg:py-3 lg:text-base"
              >
                Load an example
              </button>
            </div>

            <hr className="mt-9 border-gray-200 lg:mt-12" />

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 text-center gap-4 sm:gap-6 lg:mt-10 lg:gap-8 flex-wrap">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-[25px]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-gray-500 sm:text-sm lg:text-[15px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Before / After demo card */}
            <div
              ref={demoRef}
              className="mt-8 rounded-xl border border-gray-200 bg-[#fcfcfd] p-4 sm:p-6 lg:mt-12 lg:p-8"
            >
              <div className="flex items-center gap-2 text-sm lg:text-base">
                <span className="text-gray-400">Before</span>
                <ArrowRight className="h-3.5 w-3.5 text-gray-300 lg:h-4 lg:w-4" />
                <span className="font-medium text-teal-700">After</span>
              </div>

              <p className="mt-3 text-[15px] text-gray-400 lg:text-lg">
                write a blog post about remote work
              </p>

              <hr className="my-4 border-gray-200 lg:my-6" />

              <dl className="space-y-3 lg:space-y-4">
                {AFTER_FIELDS.map((field) => (
                  <div key={field.label} className="text-[15px] leading-relaxed lg:text-base">
                    <dt className="inline font-semibold text-gray-900">
                      {field.label}:{" "}
                    </dt>
                    <dd className="inline text-gray-600">{field.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      {/* How it works */}
      <section className="border-y border-gray-200 bg-[#fcfcfd]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px] lg:text-3xl">
              How it works
            </h2>
            <p className="mt-1.5 text-gray-500 lg:text-lg">Three steps, about ten seconds.</p>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
              {STEPS.map((step) => (
                <div key={step.number}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-900 lg:h-10 lg:w-10 lg:text-base">
                    {step.number}
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 lg:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-gray-500 lg:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px] lg:text-3xl">
            What you get
          </h2>
          <p className="mt-1.5 text-gray-500 lg:text-lg">
            Built for people who use prompts all day.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.letter}
                className="group rounded-xl border border-gray-200 bg-white p-5 lg:p-6 transition-all duration-300 ease-out hover:border-teal-200 hover:bg-linear-to-br hover:from-white hover:to-teal-50/30 hover:shadow-lg hover:shadow-teal-900/5 hover:-translate-y-1 active:scale-[0.98] active:shadow-md active:translate-y-0"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E9F3F2] text-sm font-semibold text-teal-700 transition-all duration-300 ease-out group-hover:bg-teal-700 group-hover:text-white group-hover:shadow-md group-hover:shadow-teal-700/20 group-hover:scale-110 lg:h-8 lg:w-8 lg:text-base">
                  {feature.letter}
                </div>
                <h3 className="mt-3 font-semibold text-gray-900 transition-colors duration-300 ease-out group-hover:text-teal-800 lg:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-gray-500 transition-colors duration-300 ease-out group-hover:text-gray-600 lg:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
          <div className="rounded-xl border border-gray-200 bg-[#fcfcfd] p-6 sm:p-8 lg:p-10">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
              Start with the prompt you already have.
            </h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-gray-500 lg:text-lg">
              Paste it, pick a style, and get a version that models can
              actually follow.
            </p>
            <NavLink to="/enhance">
              <button
                type="button"
                onClick={handleOpenEnhancer}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 lg:px-5 lg:py-3 lg:text-base"
              >
                Open the enhancer
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.25} />
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}