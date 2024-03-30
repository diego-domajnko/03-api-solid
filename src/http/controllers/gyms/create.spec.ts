import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthUser(app, "ADM");

    const response = await request(app.server)
      .post("/gyms")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "Gym name",
        latitude: 0,
        longitude: 0,
        description: null,
        phone: null
      });

    expect(response.statusCode).toEqual(201);
  });
});
