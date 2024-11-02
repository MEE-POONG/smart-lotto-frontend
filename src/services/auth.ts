import { api } from "../utils/api";

export const SignInService = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const GetUserByEmailService = async (email: string) => {
  const response = await api.get(`/users/email/${email}`);
  return response.data;
};

export const GetUserProfileService = async () => {
  const response = await api.get("/users/profile");
  const profile = await GetUserByEmailService(response.data.email);
  return profile;
};
