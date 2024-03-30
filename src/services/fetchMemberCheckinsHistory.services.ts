import { ICheckinRepository } from "@/repositories/checkins.interface";
import { CheckIn } from "@prisma/client";

interface IFetchMemberCheckinHistoryServicesRequest {
  userId: string;
  page?: number;
}

interface IFetchMemberCheckinHistoryServicesResponse {
  checkins: CheckIn[];
}

export class FetchMemberCheckinHistoryService {
  constructor(private checkinsRepository: ICheckinRepository) {}

  async execute({
    userId,
    page = 1,
  }: IFetchMemberCheckinHistoryServicesRequest): Promise<IFetchMemberCheckinHistoryServicesResponse> {
    const checkins = await this.checkinsRepository.findManyCheckinsByUserId(userId, page);

    return { checkins };
  }
}
