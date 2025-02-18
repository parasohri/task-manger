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
  fastify.register(fastifyCors,{ origin: '*' });
  dbconnect();
  userRoute(fastify);
  taskRoute(fastify);
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      // request needs to have a querystring with a `name` parameter
      querystring: {
        type: 'object',
        properties: {
            name: { type: 'string'}
        },
        required: ['name'],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    //   if (request.query.name !== "paras") {
    //     reply.status(401).send({ error: "Unauthorized" });
    // }
    },
    handler: async (request, reply) => {
      return { hello: 'world' }
    }
  })
  
  try {
     fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }