import mongoose from "mongoose";
import { Schema } from "mongoose";

import {AvailableTaskStatus,TaskStatusEnum} from "../utils/constant.js"

const taskSchema = new Schema({

 title:{
    type:String,
    required:true,
    trim:true
 },
 description:{
    type:String,
 },
 project:{
    type:Schema.Types.ObjectId,
    ref:"Project",
    required:true
 },
 assignedTo:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
 },
 assignedBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
 },
 status:{
    type:String,
    enum:AvailableTaskStatus,
    default:TaskStatusEnum.TODO
 },
 attachements:{
    type:[{
        url:String,
        mimeType:String,
        size:Number
    }],
    default:[]
 }
    
 

 



},{timestamps:true})


export const Task = mongoose.model("Task", taskSchema);