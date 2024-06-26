import { InvalidCredentialsError } from "@/services/errors/invalidCredentialsError";
import { makeAuthenticateService } from "@/services/factories/make_authenticate.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateController(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateService = makeAuthenticateService();
    const { user } = await authenticateService.execute({ email, password });

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    res
      .setCookie("token", token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
