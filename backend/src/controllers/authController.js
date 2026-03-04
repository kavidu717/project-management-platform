import { User } from "../models/userModels.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import  asyncHandler  from "../utils/async-handler.js"; // ✅ fixed
import { sendEmail } from "../utils/mail.js";





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



export {registerUser ,login};