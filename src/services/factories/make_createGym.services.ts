import { GymsRepository } from "@/repositories/prisma/gyms.repository";
import { CreateGymService } from "../createGym.services";

export function makeCreateGymService() {
  const gymsRepository = new GymsRepository();
  const createGymService = new CreateGymService(gymsRepository)

  return createGymService
}