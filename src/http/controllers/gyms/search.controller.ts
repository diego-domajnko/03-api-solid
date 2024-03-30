import { makeSearchGymService } from "@/services/factories/make_searchGym.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymQuerySchema.parse(req.query);

  const searchGym = makeSearchGymService();
  const { gyms } = await searchGym.execute({ query, page });

  res.status(200).send({
    gyms,
  });
}
