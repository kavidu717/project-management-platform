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

export default registerUser;