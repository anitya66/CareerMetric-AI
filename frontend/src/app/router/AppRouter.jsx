import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout/PublicLayout";
import AppLayout from "../../layouts/AppLayout/AppLayout";

import ProtectedRoute from "../../components/auth/ProtectedRoute";

import LandingPage from "../../pages/landing/LandingPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import DashboardPage from "../../pages/dashboard/DashboardPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
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

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route element={<AppLayout />}>

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;