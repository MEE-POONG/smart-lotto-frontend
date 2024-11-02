import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Lottery } from "@/types";
import { GetLotteries, GetLotteryById } from "@/services/lotteries";

export function useGetLotteries(): UseQueryResult<Lottery[], Error> {
  return useQuery({
    queryKey: ["lotteries"],
    queryFn: () => GetLotteries(),
  });
}

export function useGetLotteryById(id: number): UseQueryResult<Lottery, Error> {
  return useQuery({
    queryKey: ["lottery", id],
    queryFn: () => GetLotteryById(id),
  });
}