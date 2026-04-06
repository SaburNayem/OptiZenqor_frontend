import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, validateMinLength, validateRequired } from "../../../utils/validation";

function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", code: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const config = useMemo(() => ({
    "sign-in": { title: "Sign in", headline: "Welcome back to your premium storefront account.", submit: "Continue", helper: <Link className="hint-link" to="/forgot-password">Forgot password?</Link> },
    "sign-up": { title: "Create account", headline: "Create your Optizenqor customer profile.", submit: "Create account", helper: <Link className="hint-link" to="/sign-in">Already have an account?</Link> },
    "forgot-password": { title: "Forgot password", headline: "We will send a secure recovery code to your email.", submit: "Send code", helper: <Link className="hint-link" to="/sign-in">Back to sign in</Link> },
    "verify-code": { title: "Verify code", headline: "Enter the verification code we sent you.", submit: "Verify code", helper: <Link className="hint-link" to="/reset-password">Continue to reset</Link> },
    "reset-password": { title: "Reset password", headline: "Create a new password for your account.", submit: "Reset password", helper: <Link className="hint-link" to="/sign-in">Return to sign in</Link> },
  }), []);

  const active = config[mode] ?? config["sign-in"];

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (mode === "sign-up" && !validateRequired(form.name)) nextErrors.name = "Full name is required.";
    if (["sign-in", "sign-up", "forgot-password"].includes(mode) && !isEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (["sign-in", "sign-up", "reset-password"].includes(mode) && !validateMinLength(form.password, 6)) nextErrors.password = "Use at least 6 characters.";
    if (mode === "verify-code" && !validateMinLength(form.code, 4)) nextErrors.code = "Enter the code you received.";
    if (mode === "reset-password" && form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords must match.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
    window.setTimeout(() => navigate(mode === "forgot-password" ? "/verify-code" : mode === "verify-code" ? "/reset-password" : "/account"), 500);
  }

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <div className="auth-promo">
          <p className="eyebrow">Optizenqor Store</p>
          <h1>{active.headline}</h1>
          <p>Elegant auth layouts, clearer validation, social login UI, and responsive trust-building design.</p>
          <div className="trust-row">
            <span>Secure account protection</span>
            <span>Faster checkout</span>
            <span>Order tracking access</span>
          </div>
        </div>

        <form className="auth-panel" onSubmit={submit}>
          <h2>{active.title}</h2>
          {submitted ? <div className="success-banner">Looks good. Redirecting to the next step.</div> : null}
          {mode === "sign-up" ? (
            <label className="field">
              <span>Full name</span>
              <input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              {errors.name ? <small className="field-error">{errors.name}</small> : null}
            </label>
          ) : null}
          {["sign-in", "sign-up", "forgot-password"].includes(mode) ? (
            <label className="field">
              <span>Email</span>
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              {errors.email ? <small className="field-error">{errors.email}</small> : null}
            </label>
          ) : null}
          {["sign-in", "sign-up", "reset-password"].includes(mode) ? (
            <label className="field">
              <span>Password</span>
              <div className="password-row">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                <button className="button ghost small" type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
              </div>
              {errors.password ? <small className="field-error">{errors.password}</small> : null}
            </label>
          ) : null}
          {mode === "verify-code" ? (
            <label className="field">
              <span>Verification code</span>
              <input type="text" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
              {errors.code ? <small className="field-error">{errors.code}</small> : null}
            </label>
          ) : null}
          {mode === "reset-password" ? (
            <label className="field">
              <span>Confirm password</span>
              <input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} />
              {errors.confirmPassword ? <small className="field-error">{errors.confirmPassword}</small> : null}
            </label>
          ) : null}

          <button className="button primary full-width" type="submit">{active.submit}</button>
          <div className="social-login-row">
            <button className="button ghost full-width" type="button">Continue with Google</button>
            <button className="button ghost full-width" type="button">Continue with Apple</button>
          </div>
          {active.helper}
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
