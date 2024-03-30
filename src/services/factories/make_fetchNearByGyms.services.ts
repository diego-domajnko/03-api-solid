import { GymsRepository } from "@/repositories/prisma/gyms.repository";
import { FetchNearByGymsService } from "../fetchNearByGyms.services";

export function makeFetchNearByService() {
  const gymsRepository = new GymsRepository();
  const fetchNearByService = new FetchNearByGymsService(gymsRepository);

  return fetchNearByService;
}
