import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetCustomers, CreateCustomer, UpdateCustomer, DeleteCustomer } from "@/services/customer";
import { Customer, CustomerInput } from "@/types";

export function useGetCustomers(): UseQueryResult<Customer[], Error> {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => GetCustomers(),
  });
}

export function useCreateCustomer(): UseMutationResult<Customer, Error, CustomerInput> {
  return useMutation({
    mutationFn: (customer: CustomerInput) => CreateCustomer(customer),
  });
}

export function useUpdateCustomer(): UseMutationResult<Customer, Error, CustomerInput> {
  return useMutation({
    mutationFn: (customer: CustomerInput) => UpdateCustomer(customer),
  });
}

export function useDeleteCustomer(): UseMutationResult<Customer, Error, CustomerInput> {
  return useMutation({
    mutationFn: (customer: CustomerInput) => DeleteCustomer(customer),
  });
}