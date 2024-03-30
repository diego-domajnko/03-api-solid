import { CheckinsRepository } from "@/repositories/prisma/checkins.repository";
import { GetUserMetricsService } from "../getUserMetrics.services";

export function makeGetUserMetricsService() {
  const checkinsRepository = new CheckinsRepository();
  const getUserMetricsService = new GetUserMetricsService(checkinsRepository);

  return getUserMetricsService;
}
