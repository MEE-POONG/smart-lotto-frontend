import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetCustomers } from "@/services/customer";
import { Customer } from "@/types";

export function useGetCustomers(): UseQueryResult<Customer[], Error> {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => GetCustomers(),
  });
}