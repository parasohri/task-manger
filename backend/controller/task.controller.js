import taskModel from "../model/task.model.js";
import fastify from "fastify";
export const addTask = async (request, reply) => {
const task=request.body;
try {
    const user=request.user;
    if(!user){
        return reply.status(400).send({error:"please login first"});
    }
    console.log("d",user);
    
    if(!task.title||!task.description){
        return reply.status(400).send({error:"Please enter all the details"})};
        const newTask=await taskModel.create({title:task.title,description:task.description,userid:user.id,date:task.date});
    return reply.status(201).send(newTask);
} catch (error) {
    console.log(error);
    
    
}
}
export const getTask=async(request,reply)=>{
    const user=request.user;
    const date=request.query.date;
    if(!user){
        return reply.status(400).send({error:"please login first"});
    }
    const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);  
    console.log(date);
    
    const tasks=await taskModel.find({userid:user.id,date: { $gte: startDate, $lte: endDate }});
    return reply.status(200).send(tasks);
}
export const deletetask = async (request, reply) => {
    const id = request.query.id;
console.log("id",id);

    try {
        const h = await taskModel.deleteOne({ _id: id });
        if (h.deletedCount === 1) {
            return reply.status(200).send({ message: "Deleted successfully", id });
        } else {
            return reply.status(404).send({ message: "Task not found" });
        }
    } catch (error) {
        return reply.status(500).send({ error: "Error deleting task", details: error });
    }
};
export const updatedone=async(request,reply)=>{
    const id=request.query.id;
  const t=await taskModel.findOneAndUpdate({_id:id},{done:true}, 
    { new: true })
    return reply.status(201).send(t)
}