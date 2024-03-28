import { ICheckinRepository } from "@/repositories/checkins.interface";
import { IGymsRepostory } from "@/repositories/gyms.interface";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import { getDistanceBetweenCoordinate } from "@/utils/getDistanceBetweenCoordinates";
import { MaxDistanceError } from "./errors/maxDistanceError";
import { MaxNumberOfCheckinsError } from "./errors/maxNumbersOfCheckinsError";

interface ICheckinServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckinServiceResponse {
  checkin: CheckIn;
}

export class CheckinService {
  constructor(
    private checkinsRepository: ICheckinRepository,
    private gymsRepository: IGymsRepostory
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckinServiceRequest): Promise<ICheckinServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinate(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkinOnSameDay = await this.checkinsRepository.findByUserIdOnDate(userId, new Date());

    if (checkinOnSameDay) {
      throw new MaxNumberOfCheckinsError();
    }

    const checkin = await this.checkinsRepository.create({ gym_id: gymId, user_id: userId });

    return { checkin };
  }
}
