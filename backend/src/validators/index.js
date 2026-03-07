import { body } from "express-validator";


// write the user register validation function here

const userRegisterValidator =()=>{
   return[
    body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),

    body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLowercase()
    .withMessage("username must be lowercase")
    .isLength({ min: 3, max: 20 })
    .withMessage("username must be between 3 and 20 characters"),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password must be between 6 and 20 characters"),

    body("fullName")
    .optional()
    .trim()

    
   ]

}
// write the user login validator
 const userLoginValidator =()=>{
     
    return[
        body("email")
        .optional()
        .isEmail()
        .withMessage("email is invalid"),

        body("password")
        .notEmpty()
        .withMessage("password is required"),
        
    ]

 }



export {userRegisterValidator,userLoginValidator}




