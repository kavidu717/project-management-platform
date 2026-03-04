import { Router } from "express";
import registerUser from "../controllers/authController.js";

import {validate} from "../middleware/validatorMiddleware.js";
 import {userRegisterValidator} from "../validators/index.js";


const router = Router();

// before create the user validate the data
router.route("/register").post( userRegisterValidator(),validate,registerUser)




export default router