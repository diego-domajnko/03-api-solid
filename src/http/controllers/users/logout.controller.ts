import { FastifyReply, FastifyRequest } from "fastify";

export async function logout(req: FastifyRequest, res: FastifyReply) {
  res.clearCookie("token");

  return res.status(200).send({ message: "Logged out." });
}
