import { IGymsRepostory } from "@/repositories/gyms.interface";
import { Gym } from "@prisma/client";

interface ICreateGymServiceRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymServiceResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymsRepository: IGymsRepostory) {}

  async execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  }: ICreateGymServiceRequest): Promise<ICreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      name,
      description,
      phone,
    });

    return { gym };
  }
}
