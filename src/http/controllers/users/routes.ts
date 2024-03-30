import { FastifyInstance } from "fastify";
import { userController } from "./user.controller";
import { authenticateController } from "./authenticate.controller";
import { profile } from "./profile.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";
import { logout } from "./logout.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", userController);
  app.post("/auth", authenticateController);

  /* User authenticated */
  app.get("/profile", { onRequest: [verifyJwt] }, profile);
  app.get("/logout", { onRequest: [verifyJwt] }, logout);
}
