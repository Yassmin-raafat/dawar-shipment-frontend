"use client";

import DawarLogo from "@/components/ui/dawar-logo";
import InputField from "@/components/ui/input-field";
import { login } from "@/services/auth-api";
import { saveAccessToken } from "@/services/auth-storage";
import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

type LoginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const initialValues: LoginValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function validateLogin(values: LoginValues) {
  const errors: LoginErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export default function LoginForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFieldErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateValue(name: keyof LoginValues, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
    setSubmitError("");
    setSubmitSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const response = await login(values);
      saveAccessToken(response.token);
      setSubmitSuccess(response.message);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Login failed. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-card text-text-primary lg:grid-cols-[50.2%_49.8%]">
      <section
        aria-hidden="true"
        className="hidden min-h-screen bg-primary bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/images/signup-visual.png')" }}
      />

      <section className="flex min-h-screen items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-[462px]">
          <DawarLogo />

          <div className="mt-16 sm:mt-20">
            <h1 className="text-[29px] font-bold leading-tight tracking-normal text-text-primary">
              Welcome Back!
            </h1>
            <p className="mt-3 text-[14px] leading-[1.45] text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link className="font-semibold text-primary underline" href="/signup">
                Create a new account now
              </Link>
              , it&apos;s FREE!
              <br />
              Takes less than a minute.
            </p>
          </div>

          {submitError ? (
            <div
              aria-live="polite"
              className={`mt-8 rounded-[8px] border px-4 py-3 text-[13px] ${
                hasFieldErrors
                  ? "border-destructive/30 bg-destructive/5 text-destructive"
                  : "border-warning/40 bg-warning/10 text-text-primary"
              }`}
            >
              {submitError}
            </div>
          ) : null}
          {submitSuccess ? (
            <div
              aria-live="polite"
              className="mt-8 rounded-[8px] border border-success/30 bg-success/10 px-4 py-3 text-[13px] text-success"
            >
              {submitSuccess}
            </div>
          ) : null}

          <form
            className={`${submitError || submitSuccess ? "mt-7" : "mt-10"} space-y-8`}
            noValidate
            onSubmit={handleSubmit}
          >
            <InputField
              error={errors.email}
              icon="email"
              id="email"
              label="Email Address"
              onChange={(event) => updateValue("email", event.target.value)}
              placeholder="Enter your email"
              type="email"
              value={values.email}
              variant="underline"
            />

            <InputField
              error={errors.password}
              icon="password"
              id="password"
              label="Password"
              onChange={(event) => updateValue("password", event.target.value)}
              placeholder="Enter your password"
              type="password"
              value={values.password}
              variant="underline"
            />

            <div className="flex items-center justify-between gap-4 text-[12px] text-text-secondary">
              <label className="flex items-center gap-2">
                <input
                  checked={values.rememberMe}
                  className="size-4 rounded border-border text-primary focus:ring-primary/20"
                  onChange={(event) =>
                    updateValue("rememberMe", event.target.checked)
                  }
                  type="checkbox"
                />
                Remember me
              </label>

              <p>
                Forgot password?{" "}
                <Link className="font-semibold text-primary" href="/forgot-password">
                  Click here
                </Link>
              </p>
            </div>

            <div className="pt-32 sm:pt-36">
              <button
                className="flex h-12 w-full items-center justify-center rounded-[8px] bg-primary text-[16px] font-medium text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Login Now"}
              </button>

              <button
                className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-[8px] border border-border bg-card text-[15px] font-medium text-text-primary shadow-[0_1px_2px_rgba(17,24,39,0.02)] transition hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/10"
                type="button"
              >
                <span className="text-[18px] font-semibold text-[#4285F4]">
                  G
                </span>
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
