import "fastify";

declare module "fastify" {
  interface FastifyContextConfig {
    noAuth?: boolean;
  }
}
