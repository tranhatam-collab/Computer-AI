import type { FastifyRequest, FastifyReply } from "fastify";
import { getUserFromToken } from "../routes/auth.js";

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = await getUserFromToken(token);
  if (!user) {
    reply.status(401);
    return { success: false, error: "Unauthorized" };
  }
  (req as any).user = user;
}
