import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import { prisma } from "@/lib/prisma";

describe("Metrics checkins of an user (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list the metrics of an checkin", async () => {
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
      .get("/checkins/metrics")
      .set("Cookie", [`token=${token}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.checkinsCount).toEqual(2);
  });
});
