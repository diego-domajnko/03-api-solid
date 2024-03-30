import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate.services";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("authenticate", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate a user", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jhondoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jhondoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(async () => {
      await sut.execute({
        email: "jhondoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jhondoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(async () => {
      await sut.execute({
        email: "jhondoe@example.com",
        password: "1234567",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
