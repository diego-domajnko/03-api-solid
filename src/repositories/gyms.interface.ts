import { Gym, Prisma } from "@prisma/client";

export type FindManyByDistance = {
  latitude: number;
  longitude: number;
};

export interface IGymsRepostory {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchManyByQuery(query: string, page: number): Promise<Gym[]>;
  fetchManyByDistance(params: FindManyByDistance): Promise<Gym[]>;
}
