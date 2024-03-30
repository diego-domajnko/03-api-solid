import { GymsRepository } from "@/repositories/prisma/gyms.repository";
import { SearchGymService } from "../searchGym.services";

export function makeSearchGymService() {
  const gymsRepository = new GymsRepository();
  const searchGymService = new SearchGymService(gymsRepository);

  return searchGymService;
}
