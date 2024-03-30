import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { FastifyInstance } from "fastify";
import { create } from "./create.controller";
import { search } from "./search.controller";
import { searchNearby } from "./searchNearby.controller";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/", { onRequest: [verifyUserRole("ADM")] }, create);
  app.get("/search", search);
  app.get("/nearby", searchNearby);
}
