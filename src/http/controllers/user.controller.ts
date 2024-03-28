import { UserAlreadyExistsError } from "@/services/errors/userAlreadyExistError";
import { makeUserService } from "@/services/factories/make_user.srvice";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userController(req: FastifyRequest, res: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, name, password } = userBodySchema.parse(req.body);

  try {
    const userService = makeUserService();
    await userService.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }
    throw error;
  }

  res.status(201).send();
}
