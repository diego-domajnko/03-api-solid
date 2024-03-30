import { ICheckinRepository } from "@/repositories/checkins.interface";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/lateCheckinValidationError";

interface IValidateChekinReq {
  checkinId: string;
}

interface IValidateCheckinRes {
  checkin: CheckIn;
}

export class ValidateChekinService {
  constructor(private checkinRepository: ICheckinRepository) {}

  async execute({ checkinId }: IValidateChekinReq): Promise<IValidateCheckinRes> {
    const checkin = await this.checkinRepository.findById(checkinId);

    if (!checkin) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutes = dayjs(new Date()).diff(dayjs(checkin.created_at), "minutes");

    if (distanceInMinutes > 20) {
      throw new LateCheckinValidationError();
    }

    checkin.validated_at = new Date();

    await this.checkinRepository.save(checkin);

    return { checkin };
  }
}
