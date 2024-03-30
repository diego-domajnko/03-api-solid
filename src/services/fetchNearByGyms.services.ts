import { IGymsRepostory } from "@/repositories/gyms.interface";
import { Gym } from "@prisma/client";

interface IFetchNearByGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearByGymsResponse {
  gyms: Gym[];
}

export class FetchNearByGymsService {
  constructor(private gymRepository: IGymsRepostory) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearByGymsRequest): Promise<IFetchNearByGymsResponse> {
    const gyms = await this.gymRepository.fetchManyByDistance({
      latitude: userLatitude,
      longitude: userLongitude,
    });
    return { gyms };
  }
}
