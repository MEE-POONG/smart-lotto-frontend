import { UseMutationResult, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Lottery, LotteryInput } from "@/types";
import { CreateLottery, DeleteLottery, GetLotteries, GetLotteryById, UpdateLottery } from "@/services/lotteries";

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

export function useCreateLottery(): UseMutationResult<Lottery, Error, LotteryInput> {
  return useMutation({
    mutationFn: CreateLottery,
  });
}

export function useUpdateLottery(): UseMutationResult<Lottery, Error, LotteryInput> {
  return useMutation({
    mutationFn: UpdateLottery,
  });
}

export function useDeleteLottery(): UseMutationResult<Lottery, Error, number> {
  return useMutation({
    mutationFn: DeleteLottery,
  });
}
