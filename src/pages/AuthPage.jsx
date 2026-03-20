import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const isSignIn = mode === "sign-in";

  function submit(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <div className="auth-promo">
          <p className="eyebrow">Website Sign In</p>
          <h1>{isSignIn ? "Welcome back to the storefront." : "Create your customer account."}</h1>
          <p>
            These auth pages now sit outside the shopping shell, which is more typical for
            ecommerce websites than an in-app onboarding flow.
          </p>
          <Link className="button ghost" to="/">
            Return to homepage
          </Link>
        </div>
        <form className="auth-panel" onSubmit={submit}>
          <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
          {!isSignIn ? (
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
          ) : null}
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          <button className="button primary full-width" type="submit">
            {isSignIn ? "Continue" : "Create Account"}
          </button>
          <Link className="hint-link" to={isSignIn ? "/sign-up" : "/sign-in"}>
            {isSignIn ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </Link>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
