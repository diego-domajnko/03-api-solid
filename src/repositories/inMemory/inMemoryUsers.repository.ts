import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IUserRepository } from "../user.interface";

export class InMemoryUsersRepository implements IUserRepository {
  public items: User[] = [];

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);
    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id);
    if (!user) return null;

    return user;
  }
}
