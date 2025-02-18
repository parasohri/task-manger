import mongoose from "mongoose"
import userModel from "./user.model.js";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },  
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    done:{
        type:Boolean,
        default:false
    }
});
export default mongoose.model('Task', taskSchema);