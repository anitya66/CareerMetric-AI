import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/auth/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await register(formData);

      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-[#f4f6f3]">
      {/* Subtle background accent */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#95d600]/[0.025] blur-3xl" />

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="relative z-10 border-b border-white/[0.07]">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
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

          <Link
            to="/login"
            className="text-sm text-white/55 transition-colors hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* =========================================================
          REGISTER CONTENT
      ========================================================= */}

      <section className="relative flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          {/* HEADING */}

          <div className="mb-8 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#95d600]">
              START YOUR PROFILE
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Create your account
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
              Build your CareerMetric profile and start measuring your
              technical readiness.
            </p>
          </div>

          {/* FORM CARD */}

          <div className="border border-white/[0.08] bg-[#0a0c0a] p-6 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="h-12 w-full rounded-md border border-white/10 bg-[#080a08] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#95d600]/50 focus:ring-1 focus:ring-[#95d600]/20"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-md border border-white/10 bg-[#080a08] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#95d600]/50 focus:ring-1 focus:ring-[#95d600]/20"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium text-white/60"
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
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="h-12 w-full rounded-md border border-white/10 bg-[#080a08] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#95d600]/50 focus:ring-1 focus:ring-[#95d600]/20"
                />
              </div>

              {/* ERROR */}

              {error && (
                <div
                  role="alert"
                  className="border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm leading-5 text-red-400"
                >
                  {error}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-md bg-[#95d600] px-4 text-sm font-semibold text-black transition-colors hover:bg-[#a6ed08] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* LOGIN LINK */}

            <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
              <p className="text-sm text-white/35">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-block text-sm font-medium text-[#95d600] transition-colors hover:text-[#b6e66c]"
              >
                Sign in →
              </Link>
            </div>
          </div>

          {/* BACK */}

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              ← Back to CareerMetric AI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;