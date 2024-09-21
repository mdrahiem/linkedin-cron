import Fastify from "fastify";
import { processAndPost } from "./index.js";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  processAndPost();
  return { hello: "world" };
});

// Run the server!
const port = process.env.PORT || 3000;
try {
  await fastify.listen({ port });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
