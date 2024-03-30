import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGyms.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearByGymsService } from "./fetchNearByGyms.services";

let gymRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsService;

describe("Fetch nearby gyms", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new FetchNearByGymsService(gymRepository);
  });

  it("should be able to fetch all gyms within 10km", async () => {
    gymRepository.create({
      latitude: 0,
      longitude: 0,
      name: "Gym 1",
    });

    gymRepository.create({
      latitude: 1,
      longitude: 1,
      name: "Gym 2",
    });

    const { gyms } = await sut.execute({ userLatitude: 0, userLongitude: 0 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Gym 1" })]);
  });

  it("should not be able to fetch a gym that is further than 10km", async () => {
    gymRepository.create({
      latitude: 1,
      longitude: 1,
      name: "Gym 1",
    });

    const { gyms } = await sut.execute({ userLatitude: 0, userLongitude: 0 });

    expect(gyms).toHaveLength(0)
  });
});
