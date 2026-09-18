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

import SkillIntelligencePage from "../../pages/skills/SkillIntelligencePage";
import SkillDetailPage from "../../pages/skills/SkillDetailPage";

import AssessmentPage from "../../pages/assessments/AssessmentPage";
import AssessmentDetailPage from "../../pages/assessments/AssessmentDetailPage";
import AssessmentAttemptPage from "../../pages/assessments/AssessmentAttemptPage";
import AssessmentResultPage from "../../pages/assessments/AssessmentResultPage";

import CareerCoachPage from "../../pages/careerCoach/CareerCoachPage";

function AppRouter() {
  return (
    <Routes>
      {/* ======================================================
          PUBLIC
      ====================================================== */}

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

      {/* ======================================================
          PROTECTED
      ====================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* ==================================================
              RESUME
          ================================================== */}

          <Route
            path="/resume"
            element={<ResumePage />}
          />

          <Route
            path="/resume/:resumeId"
            element={<ResumeDetailPage />}
          />

          {/* ==================================================
              SKILL INTELLIGENCE
          ================================================== */}

          <Route
            path="/skills"
            element={<SkillIntelligencePage />}
          />

          <Route
            path="/skills/:technologyId"
            element={<SkillDetailPage />}
          />

          {/* ==================================================
              ASSESSMENTS
          ================================================== */}

          <Route
            path="/assessments"
            element={<AssessmentPage />}
          />

          <Route
            path="/assessments/:assessmentId"
            element={<AssessmentDetailPage />}
          />

          {/* ==================================================
              ASSESSMENT ATTEMPT
          ================================================== */}

          <Route
            path="/assessments/:assessmentId/attempt/:attemptId"
            element={<AssessmentAttemptPage />}
          />

          {/* ==================================================
              ASSESSMENT RESULT
          ================================================== */}

          <Route
            path="/assessments/:assessmentId/attempt/:attemptId/result"
            element={<AssessmentResultPage />}
          />

          {/* ==================================================
              CAREER COACH
          ================================================== */}

          <Route
            path="/career-coach"
            element={<CareerCoachPage />}
          />

        </Route>
      </Route>

      {/* ======================================================
          FALLBACK
      ====================================================== */}

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