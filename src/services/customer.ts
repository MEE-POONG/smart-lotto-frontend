import { api } from "../utils/api";

export const GetCustomers = async () => {
  const response = await api.get(`/customers`);
  return response.data;
};
