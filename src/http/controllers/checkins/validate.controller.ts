import { LateCheckinValidationError } from "@/services/errors/lateCheckinValidationError";
import { ResourceNotFoundError } from "@/services/errors/resourceNotFoundError";
import { makeValidateCheckinService } from "@/services/factories/make_validateCheckin.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateSchemaParams = z.object({
    checkinId: z.string(),
  });

  const { checkinId } = validateSchemaParams.parse(req.params);

  try {
    const validateCheckin = makeValidateCheckinService();
    await validateCheckin.execute({ checkinId });

    res.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof LateCheckinValidationError) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
