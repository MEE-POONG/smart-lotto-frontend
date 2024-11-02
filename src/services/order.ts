import { CreateOrderType } from "@/types";
import { api } from "../utils/api";

export const GetOrders = async () => {
  const response = await api.get(`/orders`);
  return response.data;
};
export const GetOrderById = async (id: number) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};
export const CreateOrder = async (data: CreateOrderType) => {
  const response = await api.post(`/orders`, data);
  return response.data;
};