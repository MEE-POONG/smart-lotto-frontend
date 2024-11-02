import { CreateOrderItemType } from "@/types";
import { api } from "../utils/api";

export const GetOrderItems = async () => {
  const response = await api.get(`/order-items`);
  return response.data;
};
export const CreateOrderItem = async (data: CreateOrderItemType) => {
  const response = await api.post(`/order-items`, data);
  return response.data;
};
export const CreateOrderItems = async (data: CreateOrderItemType[]) => {
  const response = await api.post(`/order-items/many`, data);
  return response.data;
};