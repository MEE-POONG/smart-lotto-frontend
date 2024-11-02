import { CreateOrder, GetOrderById, GetOrders } from "@/services/order";
import { CreateOrderType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => GetOrders(),
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderType) => CreateOrder(data),
  });
};

export const useGetOrderById = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => GetOrderById(id),
  });
};
