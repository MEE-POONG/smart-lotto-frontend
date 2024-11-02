import { api } from "../utils/api";

export const GetLotteries = async () => {
  const response = await api.get(`/lotteries`);
  return response.data;
};

export const GetLotteryById = async (id: number) => {
  const response = await api.get(`/lotteries/${id}`);
  return response.data;
};
