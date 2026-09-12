export type AuthUser = {
  name: string;
  email: string;
};

export type SignupPayload = {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  userRole: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

