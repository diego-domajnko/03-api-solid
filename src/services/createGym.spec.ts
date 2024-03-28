import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGyms.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymService } from "./createGym.services";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("CreateGym use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      description: null,
      name: "Academia",
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
