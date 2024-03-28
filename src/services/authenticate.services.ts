import { UserRepository } from "@/repositories/prisma/user.repository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";

interface IAuthenticateServiceRequest {
  email: string;
  password: string;
}

interface IAuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMatches = await compare(password, user.password_hash);

    if (!isPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
