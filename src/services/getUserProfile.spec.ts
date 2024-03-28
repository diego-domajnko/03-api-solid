import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsers.repository";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./getUserProfile.services";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("get user authenticate", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "jhondoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with invalid id", async () => {
    expect(async () => {
      await sut.execute({
        userId: "invalid-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
