import {Router} from "express"
import {helathCheck} from "../controllers/healthController.js" 


const router=Router();

router.route("/").get(helathCheck)



export default router