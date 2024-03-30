import { makeGetUserMetricsService } from "@/services/factories/make_getUserMetrics.services";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const getMetrics = makeGetUserMetricsService();
  const { checkinsCount } = await getMetrics.execute({ userId: req.user.sub });

  res.status(200).send({ checkinsCount });
}
