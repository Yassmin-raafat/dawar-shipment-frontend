import { getMockProfileName, saveMockProfileName } from "@/features/auth/services/auth-storage";
import type { AuthUser, LoginPayload, SignupPayload } from "@/features/auth/types/auth";

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function signup(payload: SignupPayload) {
  await wait(700);

  if (payload.email.toLowerCase() === "fail@example.com") {
    throw new Error("This email is already registered.");
  }

  saveMockProfileName(payload.email, payload.firstName.trim());

  return {
    message: "Account created successfully.",
    user: {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      userRole: payload.userRole,
    },
  };
}

export async function login(payload: LoginPayload) {
  await wait(700);

  if (payload.email.toLowerCase() === "fail@example.com") {
    throw new Error("Invalid email or password.");
  }

  return {
    message: "Logged in successfully.",
    token: "mock-auth-token",
    user: {
      email: payload.email,
      name: getMockProfileName(payload.email) ?? payload.email.split("@")[0].split(/[._-]/)[0].replace(/^./, (letter) => letter.toUpperCase()),
    } satisfies AuthUser,
  };
}

export async function logout() {
  const { removeAccessToken } = await import("@/features/auth/services/auth-storage");

  removeAccessToken();
}
