import { Router } from "express";
import {registerUser,login, logoutUser} from "../controllers/authController.js";

import {validate} from "../middleware/validatorMiddleware.js";
 import {userLoginValidator, userRegisterValidator} from "../validators/index.js";
 import { verifyJWT } from "../middleware/authMiddware.js";

const router = Router();

// before create the user validate the data
router.route("/register").post( userRegisterValidator(),validate,registerUser)
router.route("/login").post(userLoginValidator(),validate,login)

// secure route
router.route("/logout").post(verifyJWT,logoutUser)


export default router