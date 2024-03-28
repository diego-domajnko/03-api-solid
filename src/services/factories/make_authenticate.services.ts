import { UserRepository } from "@/repositories/prisma/user.repository";
import { AuthenticateService } from "../authenticate.services";

export function makeAuthenticateService() {
  const usersRepository = new UserRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
