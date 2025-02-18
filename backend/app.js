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
    handler:(request,reply)=>{
reply.status(201).send("ds")
    }
    },
    
    
  )
  
  try {
     fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }