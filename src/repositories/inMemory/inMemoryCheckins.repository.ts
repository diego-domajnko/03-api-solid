import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ICheckinRepository } from "../checkins.interface";
import dayjs from "dayjs";

export class InMemoryCheckinsRepository implements ICheckinRepository {
  public items: CheckIn[] = [];

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
      gym_id,
      user_id,
    } as CheckIn;

    this.items.push(checkin);

    return checkin;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("day");
    const endOfTheDay = dayjs(date).endOf("day");
    const checkOnSameDate = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at);
      const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return item.user_id === userId && isOnSameDay;
    });

    if (!checkOnSameDate) return null;

    return checkOnSameDate;
  }
}
