import { User } from "../models/userModels.js";
import { Project } from "../models/projectModels.js";
import { Task } from "../models/taskModels.js";
import{Subtask} from "../models/subTaskModels.js"
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import mongoose from "mongoose";


const getTask=asyncHandler(async(req,res)=>{
    // test
})

const createTask=asyncHandler(async(req,res)=>{
    // test
})

const getTaskById=asyncHandler(async(req,res)=>{
    // test
})

const updateTask=asyncHandler(async(req,res)=>{
    // test
})

const deleteTask=asyncHandler(async(req,res)=>{
    // test
})

const createSubTask=asyncHandler(async(req,res)=>{
    // test
})

const updateSubTask=asyncHandler(async(req,res)=>{
    // test
})

const deleteSubTask=asyncHandler(async(req,res)=>{
    // test
})


export {
    getTask,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask
}