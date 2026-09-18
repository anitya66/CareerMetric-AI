import { useState } from "react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    number: "01",
    title: "Resume Intelligence",
    description:
      "Turn your resume into a structured technical profile with skills, technologies, evidence, and readiness signals.",
  },
  {
    number: "02",
    title: "Skill Assessment",
    description:
      "Measure your understanding through technology-specific assessments and track how your performance changes.",
  },
  {
    number: "03",
    title: "Interview Intelligence",
    description:
      "Practice realistic technical interviews and receive structured feedback on your answers.",
  },
  {
    number: "04",
    title: "Job Intelligence",
    description:
      "Compare your profile against a job description, identify skill gaps, and understand what to prepare.",
  },
  {
    number: "05",
    title: "Preparation Plans",
    description:
      "Convert identified gaps into a focused preparation plan with priorities and progress.",
  },
  {
    number: "06",
    title: "AI Career Coach",
    description:
      "Ask career and preparation questions while CareerMetric uses your available profile context.",
  },
];

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f4f6f3]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050605]/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex h-[72px] items-center justify-between">
            {/* BRAND */}

            <Link
              to="/"
              className="flex items-center gap-2.5"
              aria-label="CareerMetric AI home"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#95d600]/50 bg-[#95d600]/10 text-sm font-bold text-[#95d600]">
                C
              </span>

              <span className="text-[15px] font-semibold tracking-[-0.02em]">
                CareerMetric
                <span className="text-[#95d600]"> AI</span>
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#how-it-works"
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                How it works
              </a>

              <a
                href="#capabilities"
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                Capabilities
              </a>
            </nav>

            {/* DESKTOP ACTIONS */}

            <div className="hidden items-center gap-2.5 md:flex">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-[#95d600] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#a6ed08]"
              >
                Get started
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white md:hidden"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* MOBILE NAVIGATION */}

          {mobileMenuOpen && (
            <div className="border-t border-white/[0.07] py-4 md:hidden">
              <nav className="flex flex-col">
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 text-sm text-white/65 transition hover:text-white"
                >
                  How it works
                </a>

                <a
                  href="#capabilities"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 text-sm text-white/65 transition hover:text-white"
                >
                  Capabilities
                </a>

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 text-sm text-white/65 transition hover:text-white"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-[#95d600] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#a6ed08]"
                >
                  Get started
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="relative">
          <div className="mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:py-20 xl:py-24">
            {/* HERO CONTENT */}

            <div className="max-w-2xl">
              {/* EYEBROW */}

              <div className="mb-7 inline-flex items-center gap-2 border border-[#95d600]/20 bg-[#95d600]/[0.05] px-3 py-1.5 text-xs font-medium tracking-wide text-[#b6e66c]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#95d600]" />

                CAREER INTELLIGENCE
              </div>

              {/* HEADING */}

              <h1 className="max-w-[700px] text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Know where
                <br />
                you stand.
                <br />
                <span className="text-[#95d600]">
                  Know what&apos;s next.
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p className="mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                CareerMetric AI turns your resume, skills, assessments,
                interviews, and target jobs into one clear picture of your
                technical readiness.
              </p>

              {/* CTA */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-md bg-[#95d600] px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#a6ed08]"
                >
                  Start measuring

                  <span className="ml-2">→</span>
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3.5 text-sm font-medium text-white/75 transition-colors hover:border-white/20 hover:text-white"
                >
                  See how it works
                </a>
              </div>

              {/* SMALL SUPPORTING TEXT */}

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/35">
                <span>Resume intelligence</span>

                <span>Skill tracking</span>

                <span>Interview preparation</span>
              </div>
            </div>

            {/* PRODUCT PREVIEW */}

            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              <div className="absolute -inset-10 -z-10 bg-[#95d600]/[0.035] blur-3xl" />

              <div className="border border-white/10 bg-[#0b0d0b] shadow-2xl shadow-black/40">
                {/* PREVIEW HEADER */}

                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                      Readiness overview
                    </p>

                    <p className="mt-1 text-sm font-medium text-white/85">
                      Technical Profile
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 text-[10px] text-[#95d600]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#95d600]" />

                    ANALYZED
                  </span>
                </div>

                {/* SCORE */}

                <div className="border-b border-white/[0.07] p-6 sm:p-7">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-xs text-white/35">
                        Overall readiness
                      </p>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-6xl font-semibold tracking-[-0.06em] text-white">
                          78
                        </span>

                        <span className="text-sm text-white/30">
                          / 100
                        </span>
                      </div>
                    </div>

                    <div className="border border-[#95d600]/20 bg-[#95d600]/[0.06] px-3 py-2 text-right">
                      <p className="text-[10px] uppercase tracking-wider text-white/35">
                        Status
                      </p>

                      <p className="mt-0.5 text-sm font-medium text-[#95d600]">
                        Interview Ready
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 h-1.5 overflow-hidden bg-white/[0.07]">
                    <div className="h-full w-[78%] bg-[#95d600]" />
                  </div>
                </div>

                {/* SKILLS */}

                <div className="p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">
                      Skill signals
                    </p>

                    <span className="text-xs text-white/25">
                      4 tracked
                    </span>
                  </div>

                  <div className="space-y-5">
                    <SkillBar
                      name="Java"
                      score="92"
                      width="92%"
                    />

                    <SkillBar
                      name="Spring Boot"
                      score="84"
                      width="84%"
                    />

                    <SkillBar
                      name="React"
                      score="71"
                      width="71%"
                    />

                    <SkillBar
                      name="SQL"
                      score="76"
                      width="76%"
                    />
                  </div>
                </div>

                {/* PREVIEW FOOTER */}

                <div className="flex items-center justify-between border-t border-white/[0.07] px-6 py-4 sm:px-7">
                  <span className="text-xs text-white/30">
                    Last assessment · Today
                  </span>

                  <span className="text-xs font-medium text-[#95d600]">
                    View intelligence →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            VALUE STATEMENT
        ========================================================= */}

        <section className="border-y border-white/[0.07]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
            <p className="max-w-4xl text-3xl font-medium leading-tight tracking-[-0.035em] text-white/85 sm:text-4xl lg:text-5xl">
              Your career preparation should be based on{" "}
              <span className="text-[#95d600]">evidence</span>, not guesswork.
            </p>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/45">
              CareerMetric brings your technical profile, performance,
              target-role requirements, and preparation progress into one
              connected workspace.
            </p>
          </div>
        </section>

        {/* =========================================================
            HOW IT WORKS
        ========================================================= */}

        <section id="how-it-works">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <SectionHeading
              eyebrow="THE WORKFLOW"
              title="From profile to preparation."
              description="A focused workflow designed around the questions that actually matter when preparing for a technical role."
            />

            <div className="mt-14 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              <WorkflowStep
                number="01"
                title="Understand your profile"
                description="Analyze your resume and identify the technologies and skills your profile actually demonstrates."
              />

              <WorkflowStep
                number="02"
                title="Measure your readiness"
                description="Use assessments and technical interviews to build measurable signals around your current preparation."
              />

              <WorkflowStep
                number="03"
                title="Close the gaps"
                description="Compare your profile with target jobs and turn missing skills into focused preparation."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            CAPABILITIES
        ========================================================= */}

        <section
          id="capabilities"
          className="border-y border-white/[0.07] bg-[#080a08]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <SectionHeading
              eyebrow="ONE WORKSPACE"
              title="Everything connected to readiness."
              description="CareerMetric is built around your preparation journey—not isolated AI features."
            />

            <div className="mt-14 grid border-l border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <Capability
                  key={capability.number}
                  number={capability.number}
                  title={capability.title}
                  description={capability.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            READINESS INTELLIGENCE
        ========================================================= */}

        <section>
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
            {/* LEFT */}

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#95d600]">
                READINESS, NOT NOISE
              </p>

              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                Turn scattered preparation into a measurable signal.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
                See how your assessments, interviews, technical skills, and
                job requirements connect. The goal is simple: understand what
                is strong, what needs work, and what to do next.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center text-sm font-semibold text-[#95d600] transition-colors hover:text-[#b6e66c]"
              >
                Build your profile

                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* RIGHT */}

            <div className="border border-white/[0.08] bg-[#0a0c0a] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                <div>
                  <p className="text-xs text-white/35">
                    Preparation focus
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Current priorities
                  </p>
                </div>

                <span className="text-xs text-[#95d600]">
                  3 areas
                </span>
              </div>

              <PriorityItem
                title="Exception Handling"
                type="Required skill"
                priority="HIGH"
                width="34%"
              />

              <PriorityItem
                title="Spring Security"
                type="Skill reinforcement"
                priority="MEDIUM"
                width="58%"
              />

              <PriorityItem
                title="Technical Interview"
                type="Practice"
                priority="MEDIUM"
                width="72%"
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="border-t border-white/[0.07]">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 lg:py-28">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#95d600]">
              START WITH WHAT YOU HAVE
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Measure your readiness.
              <br />
              <span className="text-white/35">
                Then improve it.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/45">
              Build your technical profile and get a clearer direction for
              your next interview.
            </p>

            <Link
              to="/register"
              className="mt-9 inline-flex items-center rounded-md bg-[#95d600] px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#a6ed08]"
            >
              Get started

              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold">
              CareerMetric{" "}
              <span className="text-[#95d600]">AI</span>
            </p>

            <p className="mt-1 text-xs text-white/30">
              Measure Your Readiness. Master Your Skills. Ace Your Interview.
            </p>
          </div>

          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} CareerMetric AI
          </p>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#95d600]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-7 text-white/45">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   WORKFLOW STEP
========================================================= */

function WorkflowStep({
  number,
  title,
  description,
}) {
  return (
    <div className="bg-[#0a0c0a] p-7 sm:p-8">
      <span className="text-xs font-semibold text-[#95d600]">
        {number}
      </span>

      <h3 className="mt-10 text-lg font-semibold tracking-[-0.02em]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/40">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   CAPABILITY
========================================================= */

function Capability({
  number,
  title,
  description,
}) {
  return (
    <div className="border-b border-r border-white/[0.08] bg-[#080a08] p-6 transition-colors hover:bg-[#0d100d] sm:p-7">
      <span className="text-[11px] font-medium tracking-[0.15em] text-white/25">
        {number}
      </span>

      <h3 className="mt-10 text-base font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/40">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   SKILL BAR
========================================================= */

function SkillBar({
  name,
  score,
  width,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-white/60">
          {name}
        </span>

        <span className="text-white/35">
          {score}
        </span>
      </div>

      <div className="h-1 overflow-hidden bg-white/[0.07]">
        <div
          className="h-full bg-[#95d600]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   PRIORITY ITEM
========================================================= */

function PriorityItem({
  title,
  type,
  priority,
  width,
}) {
  return (
    <div className="border-b border-white/[0.07] py-5 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/80">
            {title}
          </p>

          <p className="mt-1 text-xs text-white/30">
            {type}
          </p>
        </div>

        <span className="text-[10px] font-semibold tracking-wider text-[#95d600]">
          {priority}
        </span>
      </div>

      <div className="mt-4 h-1 overflow-hidden bg-white/[0.07]">
        <div
          className="h-full bg-[#95d600]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default LandingPage;