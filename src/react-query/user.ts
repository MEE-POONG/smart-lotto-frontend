import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { GetUserByEmailService, GetUserProfileService } from "@/services/auth";
import { User } from "@/types/user";

export function useGetUser(): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => GetUserProfileService(),
  });
}

export function useGetUserByEmail(
  email: string
): UseQueryResult<User[], Error> {
  return useQuery({
    queryKey: ["users", { email }],
    queryFn: () => GetUserByEmailService(email),
  });
}
