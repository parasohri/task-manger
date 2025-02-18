import jwt from "jsonwebtoken";

export const auth = async (request, reply) => {
    try {
        // Get token from headers
        const authHeader = request.headers.authorization;
console.log("authHeader",authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return reply.status(401).send({ error: "Access denied. No token provided." });
        }

       
        const token = authHeader.split(" ")[1];
console.log("token2",token);

     
        const decoded =jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("decoded",decoded);
        
         
        request.user = decoded;

    } catch (error) {
        return reply.status(401).send({ error: "Invalid or expired token" });
    }
};
