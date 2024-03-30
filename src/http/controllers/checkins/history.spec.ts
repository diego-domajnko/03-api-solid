import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("History checkin of an user (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list  the history of an checkin", async () => {
    const { token } = await createAndAuthUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const { id: gymId } = await prisma.gym.create({
      data: {
        name: "Gym 1",
        latitude: 0,
        longitude: 0,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gymId,
          user_id: user.id,
        },
        {
          gym_id: gymId,
          user_id: user.id,
        },
      ],
    });

    const res = await request(app.server)
      .get("/checkins/history")
      .set("Cookie", [`token=${token}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.checkins).toHaveLength(2);
    expect(res.body.checkins).toEqual([
      expect.objectContaining({ gym_id: gymId, user_id: user.id }),
      expect.objectContaining({ gym_id: gymId, user_id: user.id }),
    ]);
  });
});
