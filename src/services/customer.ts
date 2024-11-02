import { api } from "../utils/api";
import { CustomerInput } from "@/types";
export const GetCustomers = async () => {
  const response = await api.get(`/customers`);
  return response.data;
};

export const CreateCustomer = async (customer: CustomerInput) => {
  const response = await api.post(`/customers`, customer);
  return response.data;
};

export const UpdateCustomer = async (customer: CustomerInput) => {
  const response = await api.put(`/customers/${customer.customer_id}`, customer);
  return response.data;
};

export const DeleteCustomer = async (customer: CustomerInput) => {
  const response = await api.delete(`/customers/${customer.customer_id}`);
  return response.data;
};
