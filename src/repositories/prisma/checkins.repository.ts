import { CheckIn, Prisma } from "@prisma/client";
import { ICheckinRepository } from "../checkins.interface";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class CheckinsRepository implements ICheckinRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = await prisma.checkIn.create({
      data,
    });

    return checkin;
  }

  async findById(checkinId: string) {
    const checkin = await prisma.checkIn.findUnique({
      where: {
        id: checkinId,
      },
    });

    return checkin;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("day");
    const endOfTheDay = dayjs(date).endOf("day");

    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkin;
  }

  async findManyCheckinsByUserId(userId: string, page: number) {
    const checkins = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkins;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async save(data: CheckIn) {
    const checkin = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return checkin;
  }
}
