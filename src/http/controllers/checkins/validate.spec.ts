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

  it("should be able to validate a checkin", async () => {
    const { token } = await createAndAuthUser(app, "ADM");

    const user = await prisma.user.findFirstOrThrow();

    const { id: gymId } = await prisma.gym.create({
      data: {
        name: "Gym 1",
        latitude: 0,
        longitude: 0,
      },
    });

    let checkin = await prisma.checkIn.create({
      data: {
        gym_id: gymId,
        user_id: user.id,
      },
    });

    const res = await request(app.server)
      .patch(`/checkins/${checkin.id}/validate`)
      .set("Cookie", [`token=${token}`])
      .send();

    expect(res.statusCode).toEqual(204);

    checkin = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkin.id,
      },
    });

    expect(checkin.validated_at).toEqual(expect.any(Date))
  });
});
