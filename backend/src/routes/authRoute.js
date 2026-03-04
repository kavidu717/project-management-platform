import { Router } from "express";
import {registerUser,login} from "../controllers/authController.js";

import {validate} from "../middleware/validatorMiddleware.js";
 import {userLoginValidator, userRegisterValidator} from "../validators/index.js";


const router = Router();

// before create the user validate the data
router.route("/register").post( userRegisterValidator(),validate,registerUser)
router.route("/login").post(userLoginValidator(),validate,login)



export default router