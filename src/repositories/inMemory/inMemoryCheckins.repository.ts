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

  async findById(id: string) {
    const checkin = this.items.find((item) => item.id === id) || null;

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

  async findManyCheckinsByUserId(userId: string, page: number) {
    const checkins = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return checkins;
  }

  async countByUserId(userId: string): Promise<number> {
    const counter = await this.items.filter((item) => item.user_id === userId).length;

    return counter;
  }

  async save(checkin: CheckIn) {
    const checkinIdx = this.items.findIndex((item) => item.id === checkin.id);

    if (checkinIdx >= 0) {
      this.items[checkinIdx] = checkin;
    }

    return checkin;
  }
}
