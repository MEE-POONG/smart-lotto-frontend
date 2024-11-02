import { CreateOrderItems, GetOrderItems } from "@/services/order-item";
import { CreateOrderItem } from "@/services/order-item";
import { CreateOrderItemType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOrderItems = () => {
  return useQuery({
    queryKey: ["order-items"],
    queryFn: () => GetOrderItems(),
  });
};

export const useCreateOrderItem = () => {
  return useMutation({
    mutationFn: (data: CreateOrderItemType) => CreateOrderItem(data),
  });
};

export const useCreateOrderItems = () => {
  return useMutation({
    mutationFn: (data: CreateOrderItemType[]) => CreateOrderItems(data),
  });
};
