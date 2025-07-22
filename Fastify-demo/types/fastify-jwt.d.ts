import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; email: string }; // token payload type
    user: { id: number; email: string }; // decoded token type
  }
}
