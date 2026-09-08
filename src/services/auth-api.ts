type SignupPayload = {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  userRole: string;
};

type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

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
      rememberMe: payload.rememberMe,
    },
  };
}

export async function logout() {
  const { removeAccessToken } = await import("@/services/auth-storage");

  removeAccessToken();
}
