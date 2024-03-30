import { UserRepository } from "@/repositories/prisma/user.repository";
import { GetUserProfileService } from "../getUserProfile.services";

export function makeGetUserProfileService() {
  const usersRepository = new UserRepository();
  const getUserProfileService = new GetUserProfileService(usersRepository);

  return getUserProfileService;
}
