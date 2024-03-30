import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGyms.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymService } from "./searchGym.services";

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymService;

describe("Search gym use case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymService(gymRepository);
  });

  it("should be able to search gyms by name", async () => {
    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      name: "Gym 1",
    });

    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      name: "Gym JavaScript",
    });

    const { gyms } = await sut.execute({ query: "JavaScript" });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Gym JavaScript" })]);
  });

  it("should be able to search gyms by query case insensitive", async () => {
    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      name: "Gym 1",
    });

    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      name: "Gym JavaScript",
    });

    const { gyms } = await sut.execute({ query: "JAVASCRIPT" });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Gym JavaScript" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      gymRepository.create({
        latitude: 0,
        longitude: 0,
        name: `JavaScript ${i}`,
      });
    }

    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      name: "gym",
    });

    const { gyms } = await sut.execute({ query: "JavaScript", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "JavaScript 21" }),
      expect.objectContaining({ name: "JavaScript 22" }),
    ]);
  });
});
