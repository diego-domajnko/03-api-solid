import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test/createAndAuthUser";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to access the profile", async () => {
    const { token } = await createAndAuthUser(app);

    const {
      statusCode,
      body: { user },
    } = await request(app.server)
      .get("/profile")
      .set("Cookie", [`token=${token}`]);

    expect(statusCode).toEqual(200);
    expect(user).toEqual(
      expect.objectContaining({
        email: "jhondoe@example.com",
      })
    );
  });
});
