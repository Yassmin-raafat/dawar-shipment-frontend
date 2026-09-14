import type { SignupValues } from "@/features/auth/schemas/signup-schema";

type SignupField = {
  id: keyof Omit<SignupValues, "userRole">;
  label: string;
  placeholder: string;
  type: "email" | "password" | "tel" | "text";
  icon?: "email" | "phone" | "password";
};

export const signupInitialValues: SignupValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  userRole: "delivery-agent",
};

export const signupFields = [
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

