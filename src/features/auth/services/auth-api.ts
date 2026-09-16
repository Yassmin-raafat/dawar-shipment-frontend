import { getMockProfileName } from "@/features/auth/services/auth-storage";
import type { AuthUser, LoginPayload } from "@/features/auth/types/auth";

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
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
