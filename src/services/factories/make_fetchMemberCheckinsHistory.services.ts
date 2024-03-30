import { CheckinsRepository } from "@/repositories/prisma/checkins.repository";
import { FetchMemberCheckinHistoryService } from "../fetchMemberCheckinsHistory.services";

export function makeFetchMemberCheckinsHistoryService() {
  const checkinsRepository = new CheckinsRepository();
  const fetchMemberCheckinHistoryService = new FetchMemberCheckinHistoryService(checkinsRepository);

  return fetchMemberCheckinHistoryService;
}
