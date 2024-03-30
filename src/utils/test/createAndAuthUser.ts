import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthUser(app: FastifyInstance, role: "ADM" | "USER" = "USER") {
  const user = await prisma.user.create({
    data: {
      name: "Jhone Doe",
      email: "jhondoe@example.com",
      password_hash: await hash("123456", 6),
      role,
    },
  });

  const {
    body: { token },
  } = await request(app.server).post("/auth").send({
    email: "jhondoe@example.com",
    password: "123456",
  });

  return { token };
}
