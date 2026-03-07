import { User } from "../models/userModels.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import  asyncHandler  from "../utils/async-handler.js"; // ✅ fixed
import { sendEmail } from "../utils/mail.js";
import jwt from "jsonwebtoken";





const emailVerificationMailgenContext = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome! Please verify your email.",
      action: {
        instructions: "Click the button below to verify your email:",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: verificationUrl
        }
      },
      outro: "If you did not create this account, ignore this email."
    }
  };
};

// ✅ token generator helper
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId); // ✅ fixed
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens");
  }
};

// ✅ Register controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1) check existing user
  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExist) {
    throw new ApiError(400, "user already exist", []);
  }

  // 2) create user
  const user = await User.create({
    email,
    username,
    password,
    isEmailVerified: false,
  });

  // 3) create email verification token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken(); // ✅ fixed

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  //4) send verification email
  await sendEmail({
    email: user.email,
    subject: "please verify your email",
    mailgenContent: emailVerificationMailgenContext(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  // 5) return created user (without sensitive fields)
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: createdUser },
      "user registered successfully"
    )
  );
});


// write the user login function here
const login =asyncHandler(async (req, res) => {
    // write the logic here
    const {email,password,username} = req.body

    // check if email or password is provided
    if( !email){
       throw new ApiError(400,"email are required")
    }

    const user = await User.findOne({email})
  
    if(!user){
       throw new ApiError(400,"user not found")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
       throw new ApiError(400,"password is incorrect")
    }
     
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
   
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

   // consider cookie
    const options={
        httpOnly:true,
        secure:true
        
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,
        {user:loggedInUser,
            accessToken,
            refreshToken
        },
        "user logged in successfully"))
    
})

// write the user logout function here
const logoutUser =asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        { new: true }

    )
  
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,
        {},
        "user logged out successfully"))

})
 
 // write the current user function here
const getCurrentUser=asyncHandler(async(req,res)=>{
    
    return res.status(200).json(new ApiResponse(200,req.user,"current user fetch successfully"))

})
  
    // write the verify email function here
const verifyEmail=asyncHandler(async(req,res)=>{
    const {verificationToken} =req.params

    if(!verificationToken){
        throw new ApiError(400,"email verification token is missing"

        )
    }
    
    let hashedToken=crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex")
   
    const user = await User.findOne({
        emailVerificationToken:hashedToken,
        emailVerificationExpiry:{$gt:Date.now()},
    })

    if(!user){
        throw new ApiError(400,"invalid token or expired")
    }
    user.emailVerificationToken=undefined
    user.emailVerificationExpiry=undefined

    user.isEmailVerified=true
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json
    (new ApiResponse(200,{
        isEmailVerified:true
    }
    ,"email verified successfully"))

    

    
})

    // write the resend email verification function here
   const resendEmailVerification=asyncHandler(async(req,res)=>{
       const user=await User.findById(req.user._id)

       if(!user){
          throw new ApiError(404,"user not found") 
       } 

       if(user.isEmailVerified){
        throw new ApiError(409,"email is already verified")
       }
        
       const {unHashedToken,hashedToken,tokenExpiry}=
       user.generateTemporaryToken()

       user.emailVerificationToken=hashedToken
       user.emailVerificationExpiry=tokenExpiry

       await user.save({validateBeforeSave:false})

       await sendEmail({
        email:user.email,
        subject:"please verify your email",
        mailgenContent:emailVerificationMailgenContext(user.username,`${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`)
       })
       return res
       .status(200)
       .json
       (new ApiResponse(200,{},
        'email has been sent to your email id'))
   })

   // write the refresh access token function here
   const refreshAccessToken=asyncHandler(async(req,res)=>{
       
    const inComingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
   if(!inComingRefreshToken){
     throw new ApiError(401,"unauthorized access")

   }
    try{
        const decodedToken=jwt.verify(inComingRefreshToken,"super_secret_access_key_123456789")
        const user=await User.findById(decodedToken?._id)
      
        if(!user){
            throw new ApiError(401,"invalid refresh token")

        }
         if(user.refreshToken!==inComingRefreshToken){
            throw new ApiError(401,"refresh token is exppired")
            
         }
         const options={
            httpOnly:true,
            secure:true
         }
         
         const { accessToken, refreshToken: newRefreshToken }=await generateAccessAndRefreshToken(user._id)
          user.refreshToken=newRefreshToken
          await user.save()
          return res
          .status(200)
          .cookie("accessToken",accessToken,options)
          .cookie("refreshToken",newRefreshToken,options)
          .json(new ApiResponse(200,
            {
                accessToken,
                refreshToken:newRefreshToken
            },
            "access token has been refreshed successfully"))

    }catch(error){
        throw new ApiError(401,"invalid refresh token")
    }
     

   })

   // write the forgot password request function here
   const forgotPasswordRequest=asyncHandler(async(req,res)=>{
    const {email}=req.body
     
    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(400,"user does not exist",[])

    }
    const {unHashedToken,hashedToken,tokenExpiry}=user.generateTemporaryToken()
    user.forgotPasswordToken=hashedToken
    user.forgotPasswordExpiry=tokenExpiry

    await user.save({validateBeforeSave:false})
    await sendEmail({
        email:user.email,
        subject:"password reset request",
        mailgenContent:ForgotPasswordMailgenContext(user.username,`${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${unHashedToken}`)
    })
    return res
    .status(200)
    .json(new ApiResponse(200,{},
        "password reset mail has been send on your mail id"))
    



   })

    // write the reset gorgot password function here
    const reserForgotPassword=asyncHandler(async(req,res)=>{
        
         const {resetToken} =req.params
         const {newPassword}=req.body

         let hashedToken=crypto
         .createHash("sha256")
         .update(resetToken)
         .digest("hex")

         const user=await User.findOne({
            forgotPasswordToken:hashedToken,
            forgotPasswordExpiry:{$gt:Date.now()}
         })

         if(!user){
            throw new ApiError(400,"invalid token or expired")
         }
         user.forgotPasswordToken=undefined
         user.forgotPasswordExpiry=undefined

         user.password=newPassword
         await user.save({validateBeforeSave: false})
         return res
         .status(200)
         .json(new ApiResponse(200,{},
            "password has been reset successfully"))
         
         


    })

    // change the password function here
   const changeCurrentPassword=asyncHandler(async(req,res)=>{
       
    const {oldPassword,newPassword}=req.body
     
    const user=await User.findById(req.user?._id)
    const isPasswordValid=await user.isPasswordCorrect(oldPassword)

    if(!isPasswordValid){
        throw new ApiError(400,"old password is incorrect")
    }
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(new ApiResponse(200,{},
        "password has been changed successfully"))
   

   })



export {
    registerUser ,
    login,logoutUser,
    getCurrentUser,
    verifyEmail,
    resendEmailVerification,
    refreshAccessToken,
    forgotPasswordRequest,
    reserForgotPassword,
    changeCurrentPassword
  
};