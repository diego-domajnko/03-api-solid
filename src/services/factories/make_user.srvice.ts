import { UserRepository } from "@/repositories/prisma/user.repository";
import { UserService } from "../user.services";

export function makeUserService() {
  const usersRepository = new UserRepository();
  const userService = new UserService(usersRepository);

  return userService;
}
