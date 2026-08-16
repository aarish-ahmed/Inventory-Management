import mongoose from "mongoose";

const userSchema= mongoose.Schema({
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
    role:{
        type: String,
    enum:[
        'admin',
        'staff',
     ],

    default:'staff'
    },
    status:{
        type: String,
    enum:[
        'active',
        'inactive',
     ],

    default:'inactive'
    },
    isVerified:{
        type:Boolean,
        default:true,
    },
    verificationCode:{
        type:String,
    },
    verificationExpires:{
        type:Date,
    }
})

export const User=mongoose.model('User',userSchema)