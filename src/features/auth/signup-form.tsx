"use client";

import DawarLogo from "@/components/ui/dawar-logo";
import InputField from "@/components/ui/input-field";
import { signup } from "@/services/auth-api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type SignupValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userRole: string;
};

type SignupErrors = Partial<Record<keyof SignupValues, string>>;

type SignupField = {
  id: keyof Omit<SignupValues, "userRole">;
  label: string;
  placeholder: string;
  type: "email" | "password" | "tel" | "text";
  icon?: "email" | "phone" | "password";
};

const initialValues: SignupValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  userRole: "delivery-agent",
};

const fields = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    type: "text",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    type: "text",
  },
  {
    id: "email",
    label: "Email ID",
    placeholder: "Enter your email id",
    type: "email",
    icon: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter mobile number",
    type: "tel",
    icon: "phone",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    icon: "password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Enter your password",
    type: "password",
    icon: "password",
  },
] satisfies SignupField[];

function validateSignup(values: SignupValues) {
  const errors: SignupErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{8,}$/;

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.userRole) {
    errors.userRole = "Select a user role.";
  }

  return errors;
}

export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFieldErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateValue(name: keyof SignupValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await signup(values);
      router.push("/login");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Signup failed. Try again.",
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
              {fields.map((field) => {
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
      </section>
    </main>
  );
}
