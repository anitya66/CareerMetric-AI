import apiClient from "../api/apiClient";

export async function getMyPreparationPlans() {
  const response = await apiClient.get(
    "/preparation-plans"
  );

  return response.data.data;
}

export async function getPreparationPlan(planId) {
  const response = await apiClient.get(
    `/preparation-plans/${planId}`
  );

  return response.data.data;
}