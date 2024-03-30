import { makeFetchNearByService } from "@/services/factories/make_fetchNearByGyms.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchNearby(req: FastifyRequest, res: FastifyReply) {
  const searchGymsNearBySchema = z.object({
    latitude: z.coerce.number().refine((v) => v >= -90 && v <= 90),
    longitude: z.coerce.number().refine((v) => v >= -180 && v <= 180),
  });

  const { latitude, longitude } = searchGymsNearBySchema.parse(req.query);

  const searchNearbyGym = makeFetchNearByService();
  const { gyms } = await searchNearbyGym.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  res.status(200).send({
    gyms,
  });
}
