// Import the framework and instantiate it
import Fastify from 'fastify';
import dotenv from 'dotenv';
 import fastifyCors from '@fastify/cors';
const fastify = Fastify({
    logger: true
  })
  import {dbconnect} from './db/mongodb.js';
  import {userRoute} from './routes/user.routes.js';
  import { taskRoute } from './routes/task.routes.js';
  dotenv.config();
  fastify.register(fastifyCors, {
    origin: ['https://task-manger-frontend-xi.vercel.app'],  // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],               // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],       // Add Content-Type
    credentials: true                                        // Allow cookies if needed
  });
  dbconnect();
  userRoute(fastify);
  taskRoute(fastify);
  fastify.get('/', (request, reply) => {
    return reply.send('Hello World!');
});
  
  
  try {
     fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }