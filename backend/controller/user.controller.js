import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
const generatetoken=(user)=>{
    console.log("sad",process.env.TOKEN_SECRET);
    
return jwt.sign({id:user._id,email:user.email},process.env.TOKEN_SECRET,{ expiresIn: "1h" });
}
export const register = async (request, reply) => {
    try {
        const { name, email, password } = request.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return reply.status(400).send({ error: "Please enter all the details" });
        }
const y=await userModel.findOne({email:email});
if(y){
    return reply.status(400).send({error:"User already exists"});
} 
const u=await userModel.findOne({ name: name });
if(u){
    return reply.status(400).send({error:"Username already registered"});
} 
// Create a new user
        const newUser = await userModel.create({ name, email, password });
const token=generatetoken(newUser);
        // Send success response
        return reply.status(201).send({ message: "User registered successfully!", user: newUser ,token:token});
    } catch (error) {
        console.error("Error in register:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
};
export const login=async(request,reply)=>{
    try{
        const {email,password}=request.body;
        if(!email||!password){
            return reply.status(400).send({error:"Please enter all the details"});  
        }
        const pass=await userModel.findOne({email:email});
        if(!pass){
            return reply.status(400).send({error:"User not found"});
        }
        if(pass.password!==password){
            return reply.status(400).send({error:"Invalid credentials"});
        }
      const rr=  generatetoken(pass);
        return reply.status(200).send({message:"User logged in successfully",token:rr,pass});
    }
    catch(error){
        console.error("Error in login:",error);
        return reply.status(500).send({error:"Internal Server Error"});
    }
};
export const getuser=async(request,reply)=>{
    try{
        const user=request.user;
        return reply.status(200).send(user);
    }
    catch(error){
        console.error("Error in getuser:",error);
        return reply.status(500).send({error:"Internal Server Error"});
    }
};