import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../services/authService";
import { isEmail, validateMinLength, validateRequired } from "../../../utils/validation";

function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const isSignIn = mode === "sign-in";

  function validateForm() {
    const nextErrors = {};

    if (!isSignIn && !validateRequired(form.name)) {
      nextErrors.name = "Your full name is required.";
    }

    if (!isEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!validateMinLength(form.password, 6)) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    if (isSignIn) {
      await signIn(form);
    } else {
      await signUp(form);
    }
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
              {errors.name ? <small className="field-error">{errors.name}</small> : null}
            </label>
          ) : null}
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            {errors.email ? <small className="field-error">{errors.email}</small> : null}
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            {errors.password ? <small className="field-error">{errors.password}</small> : null}
          </label>
          <button className="button primary full-width" type="submit">
            {submitting ? "Processing..." : isSignIn ? "Continue" : "Create Account"}
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
