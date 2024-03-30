import { InMemoryCheckinsRepository } from "@/repositories/inMemory/inMemoryCheckins.repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateChekinService } from "./validateCheckin.services";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import { LateCheckinValidationError } from "./errors/lateCheckinValidationError";

let checkinRepository: InMemoryCheckinsRepository;
let sut: ValidateChekinService;

describe("Validate checkin use case", () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckinsRepository();
    sut = new ValidateChekinService(checkinRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the checkin", async () => {
    const createCheckin = await checkinRepository.create({
      gym_id: "1",
      user_id: "1",
    });

    const { checkin } = await sut.execute({ checkinId: createCheckin.id });

    expect(checkin.validated_at).toEqual(expect.any(Date));
    expect(checkinRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent checkin", async () => {
    expect(async () => await sut.execute({ checkinId: "blablabla" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
  it("should not be able to validate the checkin after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2021, 1, 1, 8, 0, 0));
    const createCheckin = await checkinRepository.create({
      gym_id: "1",
      user_id: "1",
    });

    vi.advanceTimersByTime(1000 * 60 * 30); // 30 minutes

    expect(async () => await sut.execute({ checkinId: createCheckin.id })).rejects.toBeInstanceOf(
      LateCheckinValidationError
    );
  });
});
