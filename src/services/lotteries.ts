import { LotteryInput } from "@/types";
import { api } from "../utils/api";

export const GetLotteries = async () => {
  const response = await api.get(`/lotteries`);
  return response.data;
};

export const GetLotteryById = async (id: number) => {
  const response = await api.get(`/lotteries/${id}`);
  return response.data;
};

export const CreateLottery = async (lottery: LotteryInput) => {
  const response = await api.post(`/lotteries`, lottery);
  return response.data;
};

export const UpdateLottery = async (lottery: LotteryInput) => {
  const response = await api.patch(`/lotteries/${lottery.lottery_id}`, lottery);
  return response.data;
};

export const DeleteLottery = async (id: number) => {
  const response = await api.delete(`/lotteries/${id}`);
  return response.data;
};
