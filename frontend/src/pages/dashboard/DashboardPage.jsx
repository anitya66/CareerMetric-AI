import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

function DashboardPage() {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  function handleLogout() {

    logout();

    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-3xl font-semibold">
        Dashboard
      </h1>

      <p className="mt-3 text-neutral-400">
        Welcome, {user?.name}
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg border border-neutral-700 px-4 py-2"
      >
        Logout
      </button>

    </div>
  );
}

export default DashboardPage;