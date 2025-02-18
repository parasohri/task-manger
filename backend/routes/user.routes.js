import fastify from "fastify";
import * as userController from "../controller/user.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
export const userRoute=(fastify)=>{ fastify.route({
    method: 'post',
    url: '/register',
    handler: userController.register
});
fastify.route({
    method: 'post',
    url: '/login',
    handler: userController.login
})
fastify.route({
    method: 'get',
    url: '/getuser',
    preHandler:  authMiddleware.auth,
    handler: userController.getuser
})}