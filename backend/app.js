import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import { dbconnect } from './db/mongodb.js';
import { userRoute } from './routes/user.routes.js';
import { taskRoute } from './routes/task.routes.js';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, {
  origin: ['https://task-manger-frontend-xi.vercel.app'],  // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],             // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],     // Allow headers for content type & authorization
  credentials: true,                                     // Allow cookies if needed
});

const startServer = async () => {
  try {
    await dbconnect(); // Ensure DB connection before starting the server
    userRoute(fastify);  // Register user routes
    taskRoute(fastify);  // Register task routes

    fastify.get('/', (request, reply) => {
      reply.send('Hello World!');
    });

    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);  // Gracefully shutdown the process if an error occurs
  }
};

startServer();
