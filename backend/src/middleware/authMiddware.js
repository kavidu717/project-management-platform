import { User } from "../models/userModels.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import jwt from "jsonwebtoken";


export  const verifyJWT = asyncHandler(async (req, res, next) => {
    const token  =req.cookies?.accessToken|| req.header("Authorization")
        replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
  

 try {
         const decodedToken = jwt.verify(token, "super_secret_access_key_123456789");
     const user=   await User.findById(decodedToken._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
       
     if(!user){
        throw new ApiError(401, "invalid token");
     }
     req.user = user;
     next();
     

    
 }catch (error) {
     throw new ApiError(401, "invalid token");
 }




})