import { CheckinsRepository } from "@/repositories/prisma/checkins.repository";
import { GymsRepository } from "@/repositories/prisma/gyms.repository";
import { CheckinService } from "../checkin.services";

export function makeCheckinService() {
  const checkinsRepository = new CheckinsRepository();
  const gymsRepository = new GymsRepository();
  const checkinService = new CheckinService(checkinsRepository, gymsRepository);

  return checkinService;
}
