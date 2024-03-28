import { IUserRepository } from "@/repositories/user.interface";
import { User } from "@prisma/client";
import hash from "bcrypt";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistError";

interface IUserUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUserUserResponse {
  user: User;
}

export class UserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    email,
    name,
    password,
  }: Readonly<IUserUserRequest>): Promise<IUserUserResponse> {
    const userWithSomeEmail = await this.usersRepository.findByEmail(email);

    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash.hash(password, 6);

    const user = await this.usersRepository.create({ name, email, password_hash });

    return { user };
  }
}
