import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistError";
import { UserService } from "./user.services";

let usersRepository: InMemoryUsersRepository;
let sut: UserService;

describe("Users routes", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UserService(usersRepository);
  });

  it("should hash user password upon registrations", async () => {
    const password = "123456";

    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password,
    });

    const isSamePasswordHashed = await compare(password, user.password_hash);

    expect(isSamePasswordHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(async () => {
      await sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
