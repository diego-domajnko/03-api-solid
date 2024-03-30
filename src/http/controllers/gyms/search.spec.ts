import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search gym by name (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to find a gym by name", async () => {
    const { token } = await createAndAuthUser(app, "ADM");

    await request(app.server)
      .post("/gyms")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "Gym javascript",
        latitude: 0,
        longitude: 0,
        description: null,
        phone: null,
      });

    await request(app.server)
      .post("/gyms")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "Gym typescript",
        latitude: 0,
        longitude: 0,
        description: null,
        phone: null,
      });

    const res = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "JAVASCRIPT",
      })
      .set("Cookie", [`token=${token}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.gyms).toHaveLength(1);
    expect(res.body.gyms).toEqual([
      expect.objectContaining({
        name: "Gym javascript",
      }),
    ]);
  });
});
