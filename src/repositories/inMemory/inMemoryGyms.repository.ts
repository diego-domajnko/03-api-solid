import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { FindManyByDistance, IGymsRepostory } from "../gyms.interface";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinate } from "@/utils/getDistanceBetweenCoordinates";

export class InMemoryGymsRepository implements IGymsRepostory {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(String(data.latitude)),
      longitude: new Decimal(String(data.longitude)),
      id: data.id ?? randomUUID(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }

  async searchManyByQuery(query: string, page: number) {
    query = query.toLowerCase();
    const gyms = this.items
      .filter(({ name }) => name.toLowerCase().includes(query))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async fetchManyByDistance({ latitude, longitude }: FindManyByDistance) {
    const gyms = this.items
      .filter((gym) => {
        const distanceInKm = getDistanceBetweenCoordinate(
          {
            latitude,
            longitude,
          },
          {
            latitude: Number(gym.latitude),
            longitude: Number(gym.longitude),
          }
        );

        return distanceInKm <= 10;
      })

    return gyms;
  }
}
