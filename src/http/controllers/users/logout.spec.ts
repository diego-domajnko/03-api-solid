import request from "supertest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Logout (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to logout the logged user", async () => {
    const { token } = await createAndAuthUser(app);

    const res = await request(app.server)
      .get("/logout")
      .set("Cookie", [`token=${token}`])
      .send();
    expect(res.statusCode).toEqual(200);
  });
});
