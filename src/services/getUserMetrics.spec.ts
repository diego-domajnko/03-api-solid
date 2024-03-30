import { InMemoryCheckinsRepository } from "@/repositories/inMemory/inMemoryCheckins.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsService } from "./getUserMetrics.services";

let checkinsRepository: InMemoryCheckinsRepository;
let sut: GetUserMetricsService;

describe("Get userr metrics", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckinsRepository();
    sut = new GetUserMetricsService(checkinsRepository);
  });

  it("should be able to get the user checkins count", async () => {
    for (let i = 1; i <= 15; i++) {
      await checkinsRepository.create({
        gym_id: `gym_${i}`,
        user_id: "user_01",
      });
    }

    const { checkinsCount } = await sut.execute({ userId: "user_01" });

    expect(checkinsCount).toEqual(15);
  });
});
