import { makeFetchMemberCheckinsHistoryService } from "@/services/factories/make_fetchMemberCheckinsHistory.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(req: FastifyRequest, res: FastifyReply) {
  const getHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });
  const { page } = getHistoryQuerySchema.parse(req.query);

  const getHistoryCheckin = makeFetchMemberCheckinsHistoryService();
  const { checkins } = await getHistoryCheckin.execute({ userId: req.user.sub, page });

  res.status(200).send({ checkins });
}
