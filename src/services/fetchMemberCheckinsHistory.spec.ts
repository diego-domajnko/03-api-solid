import { InMemoryCheckinsRepository } from "@/repositories/inMemory/inMemoryCheckins.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchMemberCheckinHistoryService } from "./fetchMemberCheckinsHistory.services";

let checkinsRepository: InMemoryCheckinsRepository;
let sut: FetchMemberCheckinHistoryService;

describe("Fetch history of an user", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckinsRepository();
    sut = new FetchMemberCheckinHistoryService(checkinsRepository);
  });

  it("should be able to fetch the checkins history of an user", async () => {
    await checkinsRepository.create({
      gym_id: "gym_01",
      user_id: "user_01",
    });

    await checkinsRepository.create({
      gym_id: "gym_02",
      user_id: "user_01",
    });

    const { checkins } = await sut.execute({ userId: "user_01" });

    expect(checkins).toHaveLength(2);
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: "gym_01" }),
      expect.objectContaining({ gym_id: "gym_02" }),
    ]);
  });

  it("should be able to fetch paginated user checkin history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        gym_id: `gym_${i}`,
        user_id: "user_01",
      });
    }
    const { checkins } = await sut.execute({ userId: "user_01", page: 2 });

    expect(checkins).toHaveLength(2);
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: "gym_21" }),
      expect.objectContaining({ gym_id: "gym_22" }),
    ]);
  });
});
