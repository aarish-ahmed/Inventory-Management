import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
        type:String,
    },
    verificationExpires:{
        type:Date,
    }
})

export const User=mongoose.model('User',userSchema)