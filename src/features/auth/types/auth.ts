export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  status: string;
  data: {
    accessToken: string;
    expiresIn: number;
  };
  message: string;
};

export type AuthUser = {
  name: string;
  email: string;
};
