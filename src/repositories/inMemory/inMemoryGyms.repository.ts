import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { IGymsRepostory } from "../gyms.interface";
import { Decimal } from "@prisma/client/runtime/library";

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
}
