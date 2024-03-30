import { Gym, Prisma } from "@prisma/client";
import { FindManyByDistance, IGymsRepostory } from "../gyms.interface";
import { prisma } from "@/lib/prisma";

export class GymsRepository implements IGymsRepostory {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async searchManyByQuery(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async fetchManyByDistance({ latitude, longitude }: FindManyByDistance) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms_table
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
