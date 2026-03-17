import { User } from "../models/userModels"; 
import { Project } from "../models/projectModels";
import { ProjectMember } from "../models/projectMembersModels";
import ApiResponse from "../utils/api-response";
import ApiError from "../utils/api-error";
import asyncHandler from "../utils/async-handler";
import mongoose from "mongoose";


const getProjects=asyncHandler(
    async(req,res)=>{
       const projects=await ProjectMember.aggregate([
        {
          $match: {
              user:new mongoose.Types.ObjectId(req.user._id)
                 }  
        },
        {
            $lookup: {
                from: "projects",
                localField: "projects",
                foreignField: "_id",
                as: "projects",
                pipeline: [
                    {
                        $lookup: {
                            from: "projectmembers",
                            localField: "_id",
                            foreignField: "projects",
                            as: "projectMembers",
                            
                    }
                    
              },
              {
                $addFields: {
                    members:{
                        $size:"$projectMembers"
                    }
                }
              }
            
            ]

            }
        },
        {
            $unwind:"$projects"
        },
        {
            $project: {
                project:{
                    _id:1,
                    name:1,
                    description:1,
                    members:1,
                    createdAt:1,
                    createdBy:1

                },
                role:1,
                _id:0
            }
        }
       
         


    ] )
    
        return res
        .status(200)
        .json(new ApiResponse(200,
            projects,
            "projects fetched successfully"))


    }
        
)

const getProjectById=asyncHandler(
    async(req,res)=>{
        // test
    }
        
)
const createProjects=asyncHandler(
    async(req,res)=>{
       const {name,description}=req.body
        await Project.create({
            name,
            description,
            createdBy:new mongoose.Types.ObjectId(req.user._id)
        });

        await ProjectMember.create({

            user:new mongoose.Types.ObjectId(req.user._id),
             project:new mongoose.Types.ObjectId(project._id),
            role:UserRolesEnum.ADMIN

        })

        return res
        .status(200)
        .json(new ApiResponse(200,
            {},
            "project created successfully"))

    }
        
)
const updateProjects=asyncHandler(
    async(req,res)=>{
       const {name,description}=req.body 
       const {projectId}=req.params

     const project=await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description
        },
        {new:true}
     )
     if(!project){
        throw new ApiError(404,"project not found")
     }
        return res
        .status(200)
        .json(new ApiResponse(200,
            project,
            "project updated successfully"))

    }
        
)
const deleteProjects=asyncHandler( 
    async(req,res)=>{
       const {projectId}=req.params
       
     const project=await Project.findByIdAndDelete(projectId) 
     if(!project){
        throw new ApiError(404,"project not found")
     }
        return res
        .status(200)
        .json(new ApiResponse(200,
            {},
            "project deleted successfully"))


    }
        
)
const addMenbersToProjects=asyncHandler(
    async(req,res)=>{
        // test
    }
        
)
const getProjectMembers=asyncHandler(
    async(req,res)=>{
        // test
    }
        
)
const UpdateMemberRole=asyncHandler(
    async(req,res)=>{
        // test
    }
        
)

const deleteMember=asyncHandler(
    async(req,res)=>{
        // test
    }
)

export {
    getProjects,
    getProjectById,
    createProjects,
    updateProjects,
    deleteProjects,
    addMenbersToProjects,
    getProjectMembers,
    UpdateMemberRole,
    deleteMember
}


 