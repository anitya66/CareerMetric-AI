import { useNavigate } from "react-router-dom";

import { useDashboard } from "./useDashboard";

function DashboardPage() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
  } = useDashboard();

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (error) {
    return (
      <DashboardError
        message={error?.message}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050605]">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#95d600]">
                Overview
              </p>

              <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#f4f6f3] sm:text-3xl">
                Your readiness at a glance.
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                See where you stand, understand your skill gaps, and know what
                to focus on next.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/resume")}
              className="w-fit rounded-md border border-[#95d600]/30 bg-[#95d600]/[0.06] px-4 py-2.5 text-sm font-medium text-[#95d600] transition-colors hover:border-[#95d600]/50 hover:bg-[#95d600]/[0.1]"
            >
              Analyze Resume
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          DASHBOARD CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        {/* ===================================================
            TOP INTELLIGENCE ROW
        =================================================== */}

        <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr]">
          <ReadinessCard
            readiness={data.readiness}
          />

          <ResumeMetricCard
            resumes={data.resumes}
            navigate={navigate}
          />

          <PreparationMetricCard
            preparationPlans={data.preparationPlans}
            navigate={navigate}
          />
        </section>

        {/* ===================================================
            SECOND ROW
        =================================================== */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
          <SkillIntelligence
            skillDashboard={data.skillDashboard}
            skillProgress={data.skillProgress}
            navigate={navigate}
          />

          <PriorityFocus
            skillProgress={data.skillProgress}
            preparationPlans={data.preparationPlans}
            navigate={navigate}
          />
        </section>

        {/* ===================================================
            THIRD ROW
        =================================================== */}

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <JobIntelligence
            jobs={data.jobs}
            navigate={navigate}
          />

          <RecentActivity
            resumes={data.resumes}
            assessments={data.assessments}
            interviews={data.interviews}
            preparationPlans={data.preparationPlans}
          />
        </section>

        {/* ===================================================
            AI CAREER COACH
        =================================================== */}

        <section className="mt-5">
          <CareerCoachCard
            navigate={navigate}
          />
        </section>
      </main>
    </div>
  );
}

/* ============================================================
   READINESS CARD
============================================================ */

function ReadinessCard({ readiness }) {
  const score = Number(readiness?.readinessScore ?? 0);

  const level =
    readiness?.readinessLevel ||
    getReadinessLevel(score);

  const trackedSkills =
    readiness?.trackedSkills ?? 0;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
            Career readiness
          </p>

          <h2 className="mt-2 text-sm font-medium text-white/70">
            Overall readiness
          </h2>
        </div>

        <span className="rounded-full border border-[#95d600]/20 bg-[#95d600]/[0.06] px-2.5 py-1 text-[10px] font-medium text-[#95d600]">
          {formatReadinessLevel(level)}
        </span>
      </div>

      <div className="mt-7 flex items-end gap-3">
        <span className="text-6xl font-semibold tracking-[-0.06em] text-[#f4f6f3]">
          {score}
        </span>

        <span className="mb-2 text-sm text-white/30">
          / 100
        </span>
      </div>

      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-[#95d600] transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span className="text-white/30">
          {trackedSkills} tracked skills
        </span>

        <span className="text-white/50">
          {score}%
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   RESUME METRIC
============================================================ */

function ResumeMetricCard({
  resumes,
  navigate,
}) {
  const resumeCount = Array.isArray(resumes)
    ? resumes.length
    : 0;

  const latestResume =
    resumeCount > 0
      ? resumes[resumeCount - 1]
      : null;

  const analyzed =
    latestResume?.analysisAvailable ??
    latestResume?.analyzed ??
    latestResume?.analysisStatus === "COMPLETED";

  return (
    <MetricCard
      eyebrow="Resume"
      title="Resume Intelligence"
      value={
        resumeCount === 0
          ? "Not added"
          : analyzed
            ? "Analyzed"
            : "Ready to analyze"
      }
      description={
        resumeCount === 0
          ? "Add your resume to start building your career intelligence profile."
          : analyzed
            ? "Your resume intelligence is available."
            : "Your latest resume is ready for AI analysis."
      }
      action={
        resumeCount === 0
          ? "Add resume"
          : "View resume"
      }
      onAction={() => navigate("/resume")}
    />
  );
}

/* ============================================================
   PREPARATION METRIC
============================================================ */

function PreparationMetricCard({
  preparationPlans,
  navigate,
}) {
  const plans = Array.isArray(preparationPlans)
    ? preparationPlans
    : [];

  const latestPlan =
    plans.length > 0
      ? plans[plans.length - 1]
      : null;

  const progress = calculatePreparationProgress(
    latestPlan
  );

  return (
    <MetricCard
      eyebrow="Preparation"
      title="Preparation Progress"
      value={
        latestPlan
          ? `${progress}%`
          : "Not started"
      }
      description={
        latestPlan
          ? "Your current preparation plan is underway."
          : "Generate a preparation plan from your career intelligence."
      }
      action={
        latestPlan
          ? "Continue preparation"
          : "Create preparation plan"
      }
      onAction={() => navigate("/preparation")}
    />
  );
}

/* ============================================================
   GENERIC METRIC CARD
============================================================ */

function MetricCard({
  eyebrow,
  title,
  value,
  description,
  action,
  onAction,
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
        {eyebrow}
      </p>

      <div className="mt-5">
        <h2 className="text-sm font-medium text-white/70">
          {title}
        </h2>

        <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#f4f6f3]">
          {value}
        </p>

        <p className="mt-2 max-w-sm text-xs leading-5 text-white/30">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onAction}
        className="mt-6 text-xs font-medium text-[#95d600] transition-colors hover:text-[#b6e66c]"
      >
        {action}

        <span className="ml-1.5">
          →
        </span>
      </button>
    </div>
  );
}

/* ============================================================
   SKILL INTELLIGENCE
============================================================ */

function SkillIntelligence({
  skillDashboard,
  skillProgress,
  navigate,
}) {
  const progressItems = Array.isArray(skillProgress)
    ? skillProgress
    : [];

  const dashboardSkills =
    Array.isArray(skillDashboard?.skills)
      ? skillDashboard.skills
      : [];

  let skills = progressItems
    .filter((skill) => skill?.technologyName)
    .map((skill) => ({
      name: skill.technologyName,
      score: normalizeScore(
        skill.overallScore
      ),
    }));

  if (skills.length === 0) {
    skills = dashboardSkills
      .filter((skill) => skill?.technologyName)
      .map((skill) => ({
        name: skill.technologyName,
        score: normalizeScore(
          skill.overallScore ??
            skill.score ??
            skill.assessmentScore
        ),
      }));
  }

  skills = skills
    .filter((skill) => skill.score !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-7">
      <SectionHeader
        eyebrow="Skill intelligence"
        title="Your technical profile"
        action="View skills"
        onAction={() => navigate("/skills")}
      />

      {skills.length === 0 ? (
        <EmptyState
          message="No skill intelligence available yet."
          action="Build your skill profile"
          onAction={() => navigate("/skills")}
        />
      ) : (
        <div className="mt-7 space-y-5">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-white/65">
                  {skill.name}
                </span>

                <span className="text-[11px] text-white/30">
                  {skill.score}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full bg-[#95d600] transition-all duration-500"
                  style={{
                    width: `${skill.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   PRIORITY FOCUS
============================================================ */

function PriorityFocus({
  skillProgress,
  preparationPlans,
  navigate,
}) {
  const priorities = buildPriorityItems(
    skillProgress,
    preparationPlans
  );

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-7">
      <SectionHeader
        eyebrow="Next focus"
        title="Priority areas"
        action="View plan"
        onAction={() => navigate("/preparation")}
      />

      {priorities.length === 0 ? (
        <EmptyState
          message="No priority areas identified yet."
          action="View preparation"
          onAction={() => navigate("/preparation")}
        />
      ) : (
        <div className="mt-6 divide-y divide-white/[0.06]">
          {priorities.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white/70">
                  {item.title}
                </p>

                <p className="mt-1 text-[11px] text-white/30">
                  {item.type}
                </p>
              </div>

              <span
                className={[
                  "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium",
                  item.priority === "HIGH"
                    ? "border border-[#95d600]/20 bg-[#95d600]/[0.06] text-[#95d600]"
                    : "border border-white/[0.08] bg-white/[0.03] text-white/40",
                ].join(" ")}
              >
                {formatPriority(item.priority)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   JOB INTELLIGENCE
============================================================ */

function JobIntelligence({
  jobs,
  navigate,
}) {
  const jobList = Array.isArray(jobs)
    ? jobs
    : [];

  const latestJob =
    jobList.length > 0
      ? jobList[jobList.length - 1]
      : null;

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-7">
      <SectionHeader
        eyebrow="Job intelligence"
        title="Latest job intelligence"
        action="Explore jobs"
        onAction={() => navigate("/jobs")}
      />

      {!latestJob ? (
        <EmptyState
          message="No job description has been added yet."
          action="Analyze a job description"
          onAction={() => navigate("/jobs")}
        />
      ) : (
        <div className="mt-7">
          <p className="text-lg font-semibold tracking-[-0.02em] text-white/80">
            {getJobTitle(latestJob)}
          </p>

          <p className="mt-1 text-xs text-white/30">
            {getJobDescription(latestJob)}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <InfoPill
              label="Requirements"
              value={
                latestJob.requirementsCount ??
                latestJob.requirementCount ??
                "—"
              }
            />

            <InfoPill
              label="Status"
              value={
                latestJob.status ??
                "Available"
              }
            />
          </div>

          <p className="mt-5 text-[11px] leading-5 text-white/25">
            A match score is calculated when you explicitly
            match a resume against this job description.
          </p>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   RECENT ACTIVITY
============================================================ */

function RecentActivity({
  resumes,
  assessments,
  interviews,
  preparationPlans,
}) {
  const activities = buildRecentActivity(
    resumes,
    assessments,
    interviews,
    preparationPlans
  );

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-7">
      <SectionHeader
        eyebrow="Activity"
        title="Recent activity"
      />

      {activities.length === 0 ? (
        <EmptyState
          message="Your recent activity will appear here."
        />
      ) : (
        <div className="mt-6 divide-y divide-white/[0.06]">
          {activities.map((activity, index) => (
            <div
              key={`${activity.title}-${index}`}
              className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#95d600]" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-white/60">
                  {activity.title}
                </p>
              </div>

              <span className="shrink-0 text-[10px] text-white/25">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   CAREER COACH
============================================================ */

function CareerCoachCard({
  navigate,
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#95d600]/15 bg-[#080a08]">
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#95d600]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#95d600]">
              AI Career Coach
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#f4f6f3] sm:text-2xl">
            Not sure what to work on next?
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/35">
            Ask CareerMetric AI about your skills, preparation
            plan, resume, job matches, or interview readiness.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/career-coach")}
          className="flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#95d600] px-5 py-3 text-sm font-semibold text-[#050605] transition-colors hover:bg-[#a6ed08]"
        >
          Open Career Coach

          <span>
            →
          </span>
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  eyebrow,
  title,
  action,
  onAction,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
          {eyebrow}
        </p>

        <h2 className="mt-1.5 text-base font-semibold tracking-[-0.02em] text-white/80">
          {title}
        </h2>
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-[11px] font-medium text-white/35 transition-colors hover:text-[#95d600]"
        >
          {action}
        </button>
      )}
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  message,
  action,
  onAction,
}) {
  return (
    <div className="mt-7 rounded-lg border border-dashed border-white/[0.07] px-5 py-8 text-center">
      <p className="text-xs leading-5 text-white/30">
        {message}
      </p>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 text-xs font-medium text-[#95d600] hover:text-[#b6e66c]"
        >
          {action}
          <span className="ml-1.5">
            →
          </span>
        </button>
      )}
    </div>
  );
}

/* ============================================================
   INFO PILL
============================================================ */

function InfoPill({
  label,
  value,
}) {
  return (
    <div className="rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-2">
      <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-white/60">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   LOADING STATE
============================================================ */

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#050605]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="animate-pulse">
          <div className="h-3 w-20 rounded bg-white/[0.06]" />

          <div className="mt-4 h-8 w-72 rounded bg-white/[0.06]" />

          <div className="mt-3 h-4 w-[420px] max-w-full rounded bg-white/[0.04]" />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
            <SkeletonCard />
            <SkeletonCard />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="h-56 rounded-xl border border-white/[0.07] bg-[#080a08]" />
  );
}

/* ============================================================
   ERROR STATE
============================================================ */

function DashboardError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050605] px-5">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-red-400/20 bg-red-400/[0.05] text-red-300">
          !
        </div>

        <h1 className="mt-5 text-lg font-semibold text-white/80">
          Dashboard couldn't load
        </h1>

        <p className="mt-2 text-sm leading-6 text-white/35">
          We couldn't retrieve your CareerMetric data.
          Please check that the backend is running and try
          again.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-md border border-white/10 px-4 py-2.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   HELPERS
============================================================ */

function normalizeScore(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const score = Number(value);

  if (Number.isNaN(score)) {
    return null;
  }

  return Math.min(
    Math.max(Math.round(score), 0),
    100
  );
}

function getReadinessLevel(score) {
  if (score >= 80) {
    return "READY";
  }

  if (score >= 60) {
    return "DEVELOPING";
  }

  return "BUILDING";
}

function formatReadinessLevel(level) {
  return String(level)
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function formatPriority(priority) {
  return String(priority || "MEDIUM")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function calculatePreparationProgress(plan) {
  if (!plan) {
    return 0;
  }

  if (
    plan.progressPercentage !== undefined &&
    plan.progressPercentage !== null
  ) {
    return normalizeScore(
      plan.progressPercentage
    );
  }

  if (
    plan.progress !== undefined &&
    plan.progress !== null
  ) {
    return normalizeScore(plan.progress);
  }

  const items =
    plan.items ||
    plan.tasks ||
    plan.steps ||
    [];

  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  const completed = items.filter(
    (item) =>
      item.completed === true ||
      String(item.status).toUpperCase() ===
        "COMPLETED"
  ).length;

  return Math.round(
    (completed / items.length) * 100
  );
}

function buildPriorityItems(
  skillProgress,
  preparationPlans
) {
  const items = [];

  if (Array.isArray(skillProgress)) {
    skillProgress
      .filter(
        (skill) =>
          skill?.technologyName &&
          skill.overallScore !== null &&
          skill.overallScore !== undefined
      )
      .sort(
        (a, b) =>
          Number(a.overallScore) -
          Number(b.overallScore)
      )
      .slice(0, 3)
      .forEach((skill) => {
        const score = normalizeScore(
          skill.overallScore
        );

        if (score === null) {
          return;
        }

        items.push({
          title: skill.technologyName,
          type: "Skill development",
          priority:
            score < 50
              ? "HIGH"
              : "MEDIUM",
        });
      });
  }

  if (
    items.length < 3 &&
    Array.isArray(preparationPlans) &&
    preparationPlans.length > 0
  ) {
    const latestPlan =
      preparationPlans[
        preparationPlans.length - 1
      ];

    const planItems =
      latestPlan?.items ||
      latestPlan?.tasks ||
      latestPlan?.steps ||
      [];

    if (Array.isArray(planItems)) {
      planItems
        .filter(
          (item) =>
            item?.title ||
            item?.skillName ||
            item?.technologyName
        )
        .slice(0, 3 - items.length)
        .forEach((item) => {
          items.push({
            title:
              item.title ||
              item.skillName ||
              item.technologyName,
            type: "Preparation",
            priority:
              String(item.priority).toUpperCase() ===
              "HIGH"
                ? "HIGH"
                : "MEDIUM",
          });
        });
    }
  }

  return items.slice(0, 3);
}

function buildRecentActivity(
  resumes,
  assessments,
  interviews,
  preparationPlans
) {
  const activities = [];

  if (
    Array.isArray(resumes) &&
    resumes.length > 0
  ) {
    activities.push({
      title: "Resume available",
      time: "Recent",
    });
  }

  if (
    Array.isArray(assessments) &&
    assessments.length > 0
  ) {
    activities.push({
      title: "Assessment activity",
      time: "Recent",
    });
  }

  if (
    Array.isArray(interviews) &&
    interviews.length > 0
  ) {
    activities.push({
      title: "Interview activity",
      time: "Recent",
    });
  }

  if (
    Array.isArray(preparationPlans) &&
    preparationPlans.length > 0
  ) {
    activities.push({
      title: "Preparation plan available",
      time: "Recent",
    });
  }

  return activities.slice(0, 4);
}

function getJobTitle(job) {
  return (
    job?.title ||
    job?.jobTitle ||
    job?.position ||
    "Job Description"
  );
}

function getJobDescription(job) {
  return (
    job?.companyName ||
    job?.company ||
    job?.description ||
    "Job intelligence is available for analysis."
  );
}

export default DashboardPage;