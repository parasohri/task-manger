import * as taskController from '../controller/task.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import fastify from 'fastify';
export const taskRoute = (fastify) => {
    fastify.route({method: 'POST',url: '/addtask',preHandler: authMiddleware.auth,handler: taskController.addTask});
fastify.route({method: 'GET',url: '/gettask',preHandler: authMiddleware.auth,handler: taskController.getTask});
fastify.route({method:'DELETE',url:'/deletetask',handler:taskController.deletetask})
fastify.route({method:'PATCH',url:'/done',handler:taskController.updatedone})
}