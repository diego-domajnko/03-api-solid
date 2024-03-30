import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { FastifyInstance } from "fastify";
import { create } from "./create.controller";
import { validate } from "./validate.controller";
import { history } from "./history.controller";
import { metrics } from "./metrics.history";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole";

export async function checkinsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/checkin", create);
  app.get("/checkins/history", history);
  app.get("/checkins/metrics", metrics);
  app.patch("/checkins/:checkinId/validate", { onRequest: [verifyUserRole("ADM")] }, validate);
}
