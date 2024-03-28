import { UserRepository } from "@/repositories/prisma/user.repository";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import { User } from "@prisma/client";

interface IGetUserProfileServiceRequest {
  userId: string;
}

interface IGetUserProfileServiceResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
  }: IGetUserProfileServiceRequest): Promise<IGetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
