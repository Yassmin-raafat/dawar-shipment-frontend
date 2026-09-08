import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

type FieldIconName = "email" | "password" | "phone";

type InputFieldProps = {
  error?: string;
  icon?: FieldIconName;
  id: string;
  label: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  variant?: "boxed" | "underline";
};

function FieldIcon({ type }: { type: FieldIconName }) {
  if (type === "phone") {
    return (
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
        <path
          d="M6.43 3.4 7.5 5.82c.22.5.1 1.08-.3 1.45l-.77.72a7.45 7.45 0 0 0 3.58 3.58l.72-.77c.37-.4.95-.52 1.45-.3l2.42 1.07c.58.25.9.88.76 1.5l-.36 1.58c-.14.62-.7 1.05-1.33 1.02C8.6 15.44 4.56 11.4 4.33 6.33c-.03-.64.4-1.2 1.02-1.34l1.58-.35c.62-.14 1.25.18 1.5.76Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (type === "password") {
    return (
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
        <path
          d="M2.5 10s2.75-4.25 7.5-4.25S17.5 10 17.5 10 14.75 14.25 10 14.25 2.5 10 2.5 10Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M10 11.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M5 5.75h10A1.25 1.25 0 0 1 16.25 7v6A1.25 1.25 0 0 1 15 14.25H5A1.25 1.25 0 0 1 3.75 13V7A1.25 1.25 0 0 1 5 5.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m4.25 7 5.04 3.36c.43.29.99.29 1.42 0L15.75 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Wrapper({
  children,
  error,
  id,
  label,
}: {
  children: ReactNode;
  error?: string;
  id: string;
  label: string;
}) {
  return (
    <label
      className="block text-[11px] font-medium text-text-secondary"
      htmlFor={id}
    >
      {label}
      {children}
      {error ? (
        <span
          className="mt-1.5 block text-[11px] font-medium text-destructive"
          id={`${id}-error`}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default function InputField({
  error,
  icon,
  id,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
  variant = "boxed",
}: InputFieldProps) {
  const isBoxed = variant === "boxed";

  return (
    <Wrapper error={error} id={id} label={label}>
      <span className="relative mt-2 block">
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          className={
            isBoxed
              ? `h-10 w-full rounded-[8px] border bg-card px-3 text-[13px] text-text-primary outline-none transition placeholder:text-text-placeholder focus:ring-2 ${
                  error
                    ? "border-destructive focus:border-destructive focus:ring-destructive/10"
                    : "border-input focus:border-ring focus:ring-primary/10"
                } ${icon ? "pr-10" : ""}`
              : `h-8 w-full border-0 border-b bg-transparent px-0 pb-2 text-[14px] font-medium text-text-primary outline-none transition placeholder:font-normal placeholder:text-text-placeholder focus:ring-0 ${
                  error
                    ? "border-destructive focus:border-destructive"
                    : "border-border-strong focus:border-ring"
                } ${icon ? "pr-8" : ""}`
          }
          id={id}
          name={name ?? id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {icon ? (
          <span
            className={`pointer-events-none absolute right-0 flex items-center text-text-muted ${
              isBoxed ? "inset-y-0 right-3" : "top-1"
            }`}
          >
            <FieldIcon type={icon} />
          </span>
        ) : null}
      </span>
    </Wrapper>
  );
}
