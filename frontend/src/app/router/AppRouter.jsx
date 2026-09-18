import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout/PublicLayout";
import AppLayout from "../../layouts/AppLayout/AppLayout";

import ProtectedRoute from "../../components/auth/ProtectedRoute";

import LandingPage from "../../pages/landing/LandingPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

import DashboardPage from "../../pages/dashboard/DashboardPage";
import ResumePage from "../../pages/resume/ResumePage";
import ResumeDetailPage from "../../pages/resume/ResumeDetailPage";
import CareerCoachPage from "../../pages/careerCoach/CareerCoachPage";

function AppRouter() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Route>


      {/* =========================
          PROTECTED ROUTES
      ========================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/resume"
            element={<ResumePage />}
          />

          <Route
            path="/resume/:resumeId"
            element={<ResumeDetailPage />}
          />

          <Route
            path="/career-coach"
            element={<CareerCoachPage />}
          />

        </Route>
      </Route>


      {/* =========================
          FALLBACK
      ========================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRouter;