import mongoose,{Schema} from "mongoose";

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








// export the user model

export const User =mongoose.model("User",userSchema)