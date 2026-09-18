import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDeleteResume,
  useResumes,
  useUploadResume,
} from "./useResumes";

function ResumePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState("");

  const {
    data: resumes,
    isLoading,
    isError,
    error,
  } = useResumes();

  const uploadMutation = useUploadResume();
  const deleteMutation = useDeleteResume();

  const resumeList = Array.isArray(resumes) ? resumes : [];

  function handleChooseFile() {
    setValidationError("");
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const validationResult = validateResumeFile(file);

    if (!validationResult.valid) {
      setSelectedFile(null);
      setValidationError(validationResult.message);
      event.target.value = "";
      return;
    }

    setValidationError("");
    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setValidationError(
        "Please choose a PDF or DOCX resume first."
      );
      return;
    }

    setValidationError("");

    try {
      await uploadMutation.mutateAsync(selectedFile);

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (uploadError) {
      setValidationError(
        getApiErrorMessage(
          uploadError,
          "Unable to upload your resume."
        )
      );
    }
  }

  async function handleDelete(resumeId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(resumeId);
    } catch (deleteError) {
      setValidationError(
        getApiErrorMessage(
          deleteError,
          "Unable to delete this resume."
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#050605]">
      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#95d600]">
                Resume Intelligence
              </p>

              <h1 className="text-2xl font-semibold tracking-[-0.035em] text-[#f4f6f3] sm:text-3xl">
                Your resume, understood.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                Upload, inspect, and analyze your resume to build
                your CareerMetric intelligence profile.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-fit text-xs font-medium text-white/35 transition-colors hover:text-[#95d600]"
            >
              ← Back to dashboard
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <section className="rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
              Add resume
            </p>

            <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-white/80">
              Upload your latest resume
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/35">
              CareerMetric accepts PDF and DOCX resumes. Your
              resume is processed by the backend before AI
              analysis becomes available.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mt-7">
            <button
              type="button"
              onClick={handleChooseFile}
              disabled={uploadMutation.isPending}
              className="flex min-h-32 w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.1] bg-white/[0.015] px-5 text-center transition-colors hover:border-[#95d600]/30 hover:bg-[#95d600]/[0.025] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-lg text-white/50">
                ↑
              </span>

              <span className="mt-3 text-sm font-medium text-white/65">
                Choose a resume
              </span>

              <span className="mt-1 text-[11px] text-white/25">
                PDF or DOCX
              </span>
            </button>
          </div>

          {selectedFile && (
            <div className="mt-4 flex flex-col gap-4 rounded-lg border border-[#95d600]/15 bg-[#95d600]/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium text-white/70">
                  Selected file
                </p>

                <p className="mt-1 truncate text-sm text-white/45">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-[10px] text-white/25">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
                className="shrink-0 rounded-md bg-[#95d600] px-5 py-2.5 text-xs font-semibold text-[#050605] transition-colors hover:bg-[#a6ed08] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadMutation.isPending
                  ? "Uploading..."
                  : "Upload resume"}
              </button>
            </div>
          )}

          {validationError && (
            <div className="mt-4 rounded-lg border border-red-400/15 bg-red-400/[0.035] px-4 py-3">
              <p className="text-xs leading-5 text-red-300/80">
                {validationError}
              </p>
            </div>
          )}

          {uploadMutation.isSuccess && (
            <div className="mt-4 rounded-lg border border-[#95d600]/15 bg-[#95d600]/[0.035] px-4 py-3">
              <p className="text-xs leading-5 text-[#b6e66c]">
                Resume uploaded successfully.
              </p>
            </div>
          )}
        </section>

        <section className="mt-5 rounded-xl border border-white/[0.08] bg-[#080a08] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
                Your resumes
              </p>

              <h2 className="mt-1.5 text-base font-semibold tracking-[-0.02em] text-white/80">
                Resume library
              </h2>
            </div>

            <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-white/35">
              {resumeList.length}{" "}
              {resumeList.length === 1
                ? "resume"
                : "resumes"}
            </span>
          </div>

          {isLoading && <ResumeListSkeleton />}

          {isError && (
            <div className="mt-6 rounded-lg border border-red-400/15 bg-red-400/[0.035] px-5 py-6">
              <p className="text-sm font-medium text-red-300/80">
                Unable to load your resumes.
              </p>

              <p className="mt-1 text-xs leading-5 text-white/30">
                {getApiErrorMessage(
                  error,
                  "Please make sure the backend is running and try again."
                )}
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            resumeList.length === 0 && (
              <EmptyResumeState
                onUpload={handleChooseFile}
              />
            )}

          {!isLoading &&
            !isError &&
            resumeList.length > 0 && (
              <div className="mt-6 divide-y divide-white/[0.06]">
                {resumeList.map((resume) => (
                  <ResumeRow
                    key={getResumeId(resume)}
                    resume={resume}
                    deleting={
                      deleteMutation.isPending &&
                      deleteMutation.variables ===
                        getResumeId(resume)
                    }
                    onView={() =>
                      navigate(
                        `/resume/${getResumeId(resume)}`
                      )
                    }
                    onDelete={() =>
                      handleDelete(getResumeId(resume))
                    }
                  />
                ))}
              </div>
            )}
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-3">
          <IntelligenceStep
            number="01"
            title="Upload"
            description="Add your PDF or DOCX resume to CareerMetric."
          />

          <IntelligenceStep
            number="02"
            title="Understand"
            description="CareerMetric extracts and structures the information in your resume."
          />

          <IntelligenceStep
            number="03"
            title="Analyze"
            description="AI analysis, scoring, technologies, and recommendations become available."
          />
        </section>
      </main>
    </div>
  );
}

function ResumeRow({
  resume,
  deleting,
  onView,
  onDelete,
}) {
  const resumeId = getResumeId(resume);
  const fileName = getFileName(resume);
  const fileType = getFileType(resume);
  const status = getStatus(resume);

  return (
    <div className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-[10px] font-semibold uppercase text-white/35">
          {getFileBadge(fileType)}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white/70">
            {fileName}
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.12em] text-white/25">
              {fileType}
            </span>

            <span className="h-1 w-1 rounded-full bg-white/15" />

            <span className="text-[10px] text-white/25">
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onView}
          disabled={!resumeId}
          className="rounded-md border border-white/[0.08] px-3.5 py-2 text-[11px] font-medium text-white/45 transition-colors hover:border-[#95d600]/25 hover:text-[#95d600] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Open intelligence
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={deleting || !resumeId}
          className="rounded-md border border-red-400/10 px-3.5 py-2 text-[11px] font-medium text-red-300/50 transition-colors hover:border-red-400/20 hover:text-red-300/80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

function EmptyResumeState({ onUpload }) {
  return (
    <div className="mt-6 rounded-lg border border-dashed border-white/[0.07] px-5 py-12 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-white/35">
        ↑
      </div>

      <h3 className="mt-4 text-sm font-medium text-white/60">
        No resume uploaded yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/25">
        Upload your resume to start building your
        CareerMetric intelligence profile.
      </p>

      <button
        type="button"
        onClick={onUpload}
        className="mt-5 text-xs font-medium text-[#95d600] transition-colors hover:text-[#b6e66c]"
      >
        Choose a resume
        <span className="ml-1.5">→</span>
      </button>
    </div>
  );
}

function IntelligenceStep({
  number,
  title,
  description,
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#080a08] p-5">
      <span className="text-[10px] font-semibold tracking-[0.14em] text-[#95d600]">
        {number}
      </span>

      <h3 className="mt-4 text-sm font-semibold text-white/65">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-white/25">
        {description}
      </p>
    </div>
  );
}

function ResumeListSkeleton() {
  return (
    <div className="mt-6 divide-y divide-white/[0.06] animate-pulse">
      <ResumeSkeletonRow />
      <ResumeSkeletonRow />
    </div>
  );
}

function ResumeSkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-5">
      <div className="h-11 w-11 rounded-lg bg-white/[0.05]" />

      <div className="flex-1">
        <div className="h-3 w-48 max-w-full rounded bg-white/[0.05]" />

        <div className="mt-2 h-2.5 w-24 rounded bg-white/[0.04]" />
      </div>
    </div>
  );
}

function validateResumeFile(file) {
  const fileName = file.name?.toLowerCase() || "";

  const isPdf =
    file.type === "application/pdf" ||
    fileName.endsWith(".pdf");

  const isDocx =
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx");

  if (!isPdf && !isDocx) {
    return {
      valid: false,
      message:
        "Only PDF and DOCX resume files are supported.",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      message: "The selected file is empty.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

function getResumeId(resume) {
  return resume?.id ?? resume?.resumeId ?? null;
}

function getFileName(resume) {
  return (
    resume?.fileName ||
    resume?.name ||
    "Resume"
  );
}

function getFileType(resume) {
  const fileType =
    resume?.fileType ||
    resume?.contentType ||
    "";

  if (
    String(fileType)
      .toLowerCase()
      .includes("pdf")
  ) {
    return "PDF";
  }

  if (
    String(fileType)
      .toLowerCase()
      .includes("word") ||
    String(fileType)
      .toLowerCase()
      .includes("docx")
  ) {
    return "DOCX";
  }

  const fileName = getFileName(resume);

  if (
    fileName
      .toLowerCase()
      .endsWith(".pdf")
  ) {
    return "PDF";
  }

  if (
    fileName
      .toLowerCase()
      .endsWith(".docx")
  ) {
    return "DOCX";
  }

  return "FILE";
}

function getFileBadge(fileType) {
  if (fileType === "PDF") {
    return "PDF";
  }

  if (fileType === "DOCX") {
    return "DOC";
  }

  return "FILE";
}

function getStatus(resume) {
  const status = resume?.status;

  if (!status) {
    return "Uploaded";
  }

  return String(status)
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function formatFileSize(bytes) {
  if (!bytes || bytes < 1) {
    return "Unknown size";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const exponent = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    ),
    units.length - 1
  );

  const value =
    bytes /
    Math.pow(1024, exponent);

  return `${value.toFixed(
    exponent === 0 ? 0 : 1
  )} ${units[exponent]}`;
}

function getApiErrorMessage(
  error,
  fallback
) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export default ResumePage;