import User  from "../models/userModels";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import  {sendEmail}  from "../utils/mail.js";
import Mailgen from "mailgen";

const generateAccessAndRefreshToken =async(userId)=>{
  try{
        const user=await User.findByI(userId)
        const accessToken=    user.generateAccessToken()
        const refreshToken=   user.generateRefreshToken()
          
        user.refreshToken=refreshToken
         await user.save({validateBeforeSave:false})
      return{accessToken,refreshToken}

          

  }catch(error){
    throw new ApiError(500,"something went wrong while generating access token");
    

  }
}

// write the user register method


const registerUser =asyncHandler(
    async(req,res,next)=>{

const {username,email,password,role}=req.body
  // first check the user is alrreay exist or not

  const userExist=await User.findOne({
    $or:[{email},{username}]
  })



  if(userExist){
    throw new ApiError(400,"user already exist",[])
  }
  const user=await User.create({
    email,
    username,
    password,
    isEmailVerified:false,
  })

  const {unHashedToken,hashedToken,tokenExpiry}=user.generateTemporyToken()
   user.emailVerificationToken=hashedToken
   user.emailVerificationExpiry=tokenExpiry

   await user.save({validateBeforeSave:false})


 await sendEmail(
    {
    email:user?.email,
    subject:"please verify your email",
    mailgenContent:emailVerificationMailgenContext(
        user.username,
        `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`

    )

    }
)

  const createUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry", )

  if(!createUser){
     throw new ApiError(500,"something went wrong while registering the user")
  }
  return res
  .status(200)
  .json(
    new ApiResponse(200,{
        user:createUser},
       "user registered successfully",

    )
  )


    }
)
export default registerUser

