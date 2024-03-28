import { InMemoryCheckinsRepository } from "@/repositories/inMemory/inMemoryCheckins.repository";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGyms.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckinService } from "./checkin.services";
import { MaxNumberOfCheckinsError } from "./errors/maxNumbersOfCheckinsError";
import { MaxDistanceError } from "./errors/maxDistanceError";

let checkinsRepository: InMemoryCheckinsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckinService;
const DATE = "2024-01-01 10:00:00";
const DATE2 = "2024-01-02 10:00:00";

describe("Checkin use case", () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckinsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckinService(checkinsRepository, gymsRepository);
    await gymsRepository.create({
      description: "Academia",
      id: "1",
      latitude: 0,
      longitude: 0,
      name: "Academia",
      phone: "",
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create checkin", async () => {
    vi.setSystemTime(new Date(DATE));

    const { checkin } = await sut.execute({
      userId: "1",
      gymId: "1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to make more then one checkin in the same day", async () => {
    vi.setSystemTime(new Date(DATE));
    await sut.execute({ userId: "1", gymId: "1", userLatitude: 0, userLongitude: 0 });

    expect(async () => {
      await sut.execute({ userId: "1", gymId: "1", userLatitude: 0, userLongitude: 0 });
    }).rejects.toBeInstanceOf(MaxNumberOfCheckinsError);
  });

  it("should be able to create two checkins in different days", async () => {
    vi.setSystemTime(new Date(DATE));
    await sut.execute({ userId: "1", gymId: "1", userLatitude: 0, userLongitude: 0 });
    vi.setSystemTime(new Date(DATE2));
    const { checkin } = await sut.execute({
      userId: "1",
      gymId: "1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to checkin on large distance from gym", async () => {
    vi.setSystemTime(new Date(DATE));
    gymsRepository.items.push({
      description: "Academia",
      id: "2",
      latitude: new Decimal(-29.9499629),
      longitude: new Decimal(-51.1089208),
      name: "Academia",
      phone: "",
    });
    expect(async () => {
      await sut.execute({
        userId: "1",
        gymId: "2",
        userLatitude: -29.997271,
        userLongitude: -51.1058072,
      });
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
