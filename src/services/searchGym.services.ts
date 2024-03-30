import { IGymsRepostory } from "@/repositories/gyms.interface";
import { Gym } from "@prisma/client";

interface ISearchGymServiceRequest {
  query: string;
  page?: number;
}

interface ISearchGymServiceResponse {
  gyms: Gym[];
}

export class SearchGymService {
  constructor(private gymRepository: IGymsRepostory) {}

  async execute({ query, page = 1 }: ISearchGymServiceRequest): Promise<ISearchGymServiceResponse> {
    const gyms = await this.gymRepository.searchManyByQuery(query, page);

    return { gyms };
  }
}
