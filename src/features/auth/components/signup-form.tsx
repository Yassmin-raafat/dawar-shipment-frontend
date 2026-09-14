"use client";

import DawarLogo from "@/components/ui/dawar-logo";
import { signupSchema, type SignupValues } from "@/features/auth/schemas/signup-schema";
import { getFieldErrors, type FieldErrors } from "@/features/auth/schemas/field-errors";
import { signupInitialValues, signupFields } from "@/features/auth/config/signup-fields";
import InputField from "@/components/ui/input-field";
import { signup } from "@/features/auth/services/auth-api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";

export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState(signupInitialValues);
  const [errors, setErrors] = useState<FieldErrors<SignupValues>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFieldErrors = Object.keys(errors).length > 0;
  const validationAttempted = useRef(false);
  const submitting = useRef(false);

  function updateValue(name: keyof SignupValues, value: string) {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (validationAttempted.current) {
      const result = signupSchema.safeParse(nextValues);
      setErrors(result.success ? {} : getFieldErrors(result.error));
    }
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting.current) return;
    validationAttempted.current = true;
    const result = signupSchema.safeParse(values);
    setErrors(result.success ? {} : getFieldErrors(result.error));
    if (!result.success) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    submitting.current = true;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await signup(result.data);
      router.push("/login");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Signup failed. Try again.",
      );
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-[445px]">
      <DawarLogo />

      <div className="mt-8 sm:mt-10 lg:mt-11">
        <h1 className="text-[28px] font-bold leading-tight tracking-normal text-text-primary sm:text-[29px]">
          Join Us!
        </h1>
        <p className="mt-3 max-w-[405px] text-[14px] leading-[1.45] text-text-secondary">
          Create your account to streamline logistics and track deliveries
          effortlessly.
        </p>
      </div>

      <button
        className="mt-6 flex h-12 w-full items-center justify-center gap-4 rounded-[8px] border border-border bg-card text-[13px] font-medium text-text-primary shadow-[0_1px_2px_rgba(17,24,39,0.02)] transition hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/10"
        type="button"
      >
        <span className="text-[18px] font-semibold text-[#4285F4]">G</span>
        Sign up with Google
      </button>

      <div className="my-7 flex items-center gap-5 sm:my-8">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-medium uppercase text-text-muted">
          OR
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {submitError ? (
        <div
          aria-live="polite"
          className={`mb-5 rounded-[8px] border px-4 py-3 text-[13px] ${
            hasFieldErrors
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-warning/40 bg-warning/10 text-text-primary"
          }`}
        >
          {submitError}
        </div>
      ) : null}

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
          {signupFields.map((field) => {
            const error = errors[field.id];

            return (
              <InputField
                error={error}
                icon={field.icon}
                id={field.id}
                key={field.id}
                label={field.label}
                onChange={(event) =>
                  updateValue(field.id, event.target.value)
                }
                placeholder={field.placeholder}
                type={field.type}
                value={values[field.id]}
              />
            );
          })}
        </div>

        <label
          className="block text-[11px] font-medium text-text-secondary"
          htmlFor="userRole"
        >
          User Role
          <span className="relative mt-2 block">
            <select
              aria-describedby={
                errors.userRole ? "userRole-error" : undefined
              }
              aria-invalid={Boolean(errors.userRole)}
              className={`h-10 w-full appearance-none rounded-[8px] border bg-card px-3 pr-10 text-[13px] text-text-primary outline-none transition focus:ring-2 ${
                errors.userRole
                  ? "border-destructive focus:border-destructive focus:ring-destructive/10"
                  : "border-input focus:border-ring focus:ring-primary/10"
              }`}
              id="userRole"
              name="userRole"
              onChange={(event) => updateValue("userRole", event.target.value)}
              value={values.userRole}
            >
              <option value="delivery-agent">Delivery Agent</option>
              <option value="merchant">Merchant</option>
              <option value="admin">Admin</option>
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="m6 8 4 4 4-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          {errors.userRole ? (
            <span
              className="mt-1.5 block text-[11px] font-medium text-destructive"
              id="userRole-error"
            >
              {errors.userRole}
            </span>
          ) : null}
        </label>

        <button
          className="mt-7 flex h-12 w-full items-center justify-center rounded-[8px] bg-primary text-[13px] font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-7 text-center text-[12px] text-text-secondary">
        Already have an account?{" "}
        <Link className="font-semibold text-primary" href="/login">
          Login here now
        </Link>
      </p>
    </div>
  );
}
