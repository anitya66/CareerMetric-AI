import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../app/providers/AuthProvider";

function LoginPage() {

  const navigate = useNavigate();

  const {
    login,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleChange(event) {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      await login(formData);

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {

      setError(
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-semibold">
          Welcome back
        </h1>

        <p className="mt-2 text-neutral-400">
          Sign in to your CareerMetric AI account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 outline-none focus:border-neutral-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 outline-none focus:border-neutral-600"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Signing in..."
              : "Sign in"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;