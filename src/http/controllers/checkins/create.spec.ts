import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create checkin (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a checkin", async () => {
    const { token } = await createAndAuthUser(app);

    const { id: gymId } = await prisma.gym.create({
      data: {
        name: "Gym 1",
        latitude: 0,
        longitude: 0,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gymId}/checkin`)
      .set("Cookie", [`token=${token}`])
      .send({
        latitude: 0,
        longitude: 0,
      });

    expect(response.statusCode).toEqual(201);
  });
});
