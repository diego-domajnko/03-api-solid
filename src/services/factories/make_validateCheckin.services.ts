import { CheckinsRepository } from "@/repositories/prisma/checkins.repository";
import { ValidateChekinService } from "../validateCheckin.services";

export function makeValidateCheckinService() {
  const checkinsRepository = new CheckinsRepository();
  const validateCheckinService = new ValidateChekinService(checkinsRepository);

  return validateCheckinService;
}
