import { ICheckinRepository } from "@/repositories/checkins.interface";

interface IGetUserMetricsServiceRequest {
  userId: string;
}

interface IGetUserMetricsServiceResponse {
  checkinsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkinRepository: ICheckinRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsServiceRequest): Promise<IGetUserMetricsServiceResponse> {
    const checkinsCount = await this.checkinRepository.countByUserId(userId);

    return { checkinsCount };
  }
}
