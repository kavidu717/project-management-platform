import mongoose,{Schema} from "mongoose";

// import the bcrypt
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from "crypto"





const userSchema=new Schema(
    {
        // attributes:{} should like this
       avatar:{
        type:{
            url:String,
            localpath:String
        },
        default:{
            url:`https://placehold.co/600x400`,
            localpath:""
        }
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowerecase:true,
        trim:true,
        index:true

    },
    email:{
       type:String,
       required:true,
       unique:true,
       loxwecase:true,
       trim:true 
    },
    fullName:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true,
        required:[true,"password id  required"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPaawordExpiry:{
        type:Date
    },
    emailVerificationToken:{
        type:String
    },
    emailVerificationExpiry:{
        type:Date
    }
    
    
    },{
        timestamps:true
    }
);
// this is mongoose hooks
userSchema.pre("save",async function(next){

   if(!this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password,10)
    next()
}
);
// this is mongoose schema
 userSchema.methods.isPsswordCorrct=async function 
 (password) {
    return await bcrypt.compare(password,this.password)
 }

  // we have to create the access token and refresh token
// acess token
   userSchema.methods.generarteAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username

        },
        // access token here
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
   }
   // creste thr refresh token
   userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
           
        } ,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
   }

   // crete thr trmpporary token
   userSchema.methods.generateTemporyToken=function(){

    const unHashedToken=crypto.randomBytes(20).toString("hex")
     const hashedToken=crypto
     .createHash("sha256")
     .update(unHashedToken)
     .digest("hex")

     const tokenExpiry=Date.now() + (60 * 60 * 1000)// 20 minutes
     return{
        unHashedToken,
        hashedToken,
        tokenExpiry
     }
     


   }




// export the user model

export const User =mongoose.model("User",userSchema)