import { makeGetUserProfileService } from "@/services/factories/make_getUserProfile.services";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const userId = req.user.sub;
  const getUserProfile = makeGetUserProfileService();
  const { user } = await getUserProfile.execute({ userId });

  return res.status(200).send({
    user: { ...user, password_hash: undefined },
  });
}
