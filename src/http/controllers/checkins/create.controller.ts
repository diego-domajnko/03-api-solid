import { MaxDistanceError } from "@/services/errors/maxDistanceError";
import { MaxNumberOfCheckinsError } from "@/services/errors/maxNumbersOfCheckinsError";
import { makeCheckinService } from "@/services/factories/make_checkin.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckinParamsSchema = z.object({
    gymId: z.string(),
  });
  const createCheckinBodySchema = z.object({
    latitude: z.number().refine((v) => v >= -90 && v <= 90),
    longitude: z.number().refine((v) => v >= -180 && v <= 180),
  });

  const { latitude, longitude } = createCheckinBodySchema.parse(req.body);
  const { gymId } = createCheckinParamsSchema.parse(req.params);

  try {
    const createCheckin = makeCheckinService();

    await createCheckin.execute({
      gymId,
      userId: req.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    });

    return res.status(201).send();
  } catch (error) {
    if (error instanceof MaxDistanceError) {
      return res.status(400).send({ message: error.message });
    }
    if (error instanceof MaxNumberOfCheckinsError) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
