import { User } from "../models/userModels.js"; 
import { Project } from "../models/projectModels.js";
import { ProjectMember } from "../models/projectMembersModels.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole } from "../utils/constant.js";


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
         const {projectId}=req.params

        const project=await Project.findById(projectId)
        if(!project){
            throw new ApiError(404,"project not found")
        }
        return res
        .status(200)
        .json(new ApiResponse(200,
            project,
            "project fetched successfully"))
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
const addMembersToProjects=asyncHandler(
    async(req,res)=>{
       const{email,role} =req.body
       const {projectId}=req.params

        const user=await User.findOne({email})
        if(!user){
            throw new ApiError(404,"user not found")
        }
        const projectMember=await Project.findByIdAndUpdate(
            {
                user:new mongoose.Types.ObjectId(user._id),
                project:new mongoose.Types.ObjectId(projectId)   
            },
            {
              user:new mongoose.Types.ObjectId(user._id),
              project:new mongoose.Types.ObjectId(projectId),
              role:role  
            },
            {
                new:true,
                upsert:true

            }
        ) 
        return res
        .status(200)
        .json(new ApiResponse(200,
            {},
            "project member added successfully"))
    }
        
)
const getProjectMembers=asyncHandler(
    async(req,res)=>{
       const {projectId}= req.params
       const project=await Project.findById(req.params)
     if(!project){
        throw new ApiError(404,"project not found")
     }
     const projectMembers=await ProjectMember.aggregate([
        {
            $match: {
                project:new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id:1,
                            username:1,
                            fullName:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
           $addFields: {
               user:{$arrayElemAt:["$user",0]}
           }
        },
        {
            $project: {
                project:1,
                user:1,
                role:1,
               createdAt:1,
               updatedAt:1,
               _id:0,

        
            }
        }
       
    
    ])

        return res
        .status(200)
        .json(new ApiResponse(200,
            projectMembers,
            "project members fetched successfully"))
    }
        
)
const UpdateMemberRole=asyncHandler(
    async(req,res)=>{
          const {projectId,userId}=req.params
          const {newRole}=req.body
          if(!AvailableUserRole.includes(newRole)){
              
            throw new ApiError(400,"invalid role")
          }

          let projectMember=await ProjectMember.findOne({
            project:new mongoose.Types.ObjectId(projectId),
            user:new mongoose.Types.ObjectId(userId)
          })
          if(!projectMember){
            throw new ApiError(404,"project member not found")
          }
          projectMember=await ProjectMember.findByIdAndUpdate(
            projectMember._id,
            {
                role:newRole
            },
            {new:true}
         )
       if(!projectMember){
        throw new ApiError(404,"project member not found")
       }
        return res
        .status(200)
        .json(new ApiResponse(200,
            projectMember,
            "project member role updated successfully"))
    }
        
)

const deleteMember=asyncHandler(
    async(req,res)=>{
        
        const {projectId,userId}=req.params
        let projectMember=await ProjectMember.findOne({
            project:new mongoose.Types.ObjectId(projectId),
            user:new mongoose.Types.ObjectId(userId)
        })
        if(!projectMember){
            throw new ApiError(404,"project member not found")
        }
        projectMember=await ProjectMember.findByIdAndDelete(projectMember._id)
        if(!projectMember){
            throw new ApiError(404,"project member not found")
        }
        return res
        .status(200)
        .json(new ApiResponse(200,
            {},
            "project member deleted successfully"))
        



    }
)

export {
    getProjects,
    getProjectById,
    createProjects,
    updateProjects,
    deleteProjects,
    addMembersToProjects,
    getProjectMembers,
    UpdateMemberRole,
    deleteMember
}


 