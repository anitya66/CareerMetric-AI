import apiClient from "../api/apiClient";

export async function getMyJobs() {
  const response = await apiClient.get("/jobs");

  return response.data;
}

export async function getJob(jobDescriptionId) {
  const response = await apiClient.get(
    `/jobs/${jobDescriptionId}`
  );

  return response.data;
}

export async function matchResumeWithJob(
  resumeId,
  jobDescriptionId
) {
  const response = await apiClient.post(
    "/jobs/match",
    {
      resumeId,
      jobDescriptionId,
    }
  );

  return response.data;
}