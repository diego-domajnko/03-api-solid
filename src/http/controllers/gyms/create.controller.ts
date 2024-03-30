import { makeCreateGymService } from "@/services/factories/make_createGym.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180;
    }),
  });

  const { description, latitude, longitude, name, phone } = createGymBodySchema.parse(req.body);

  const createGym = makeCreateGymService();

  await createGym.execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  });

  return res.status(201).send();
}
