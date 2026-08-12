import {z} from "zod";

export const signupSchema =z.object({
    email:z
    .email('please enter a valid email address'),
    username:z
    .string()
    .min('3','username must be at least 3 charcters')
    .max('20','username cannot excess 20 charcters'),
    password:z
    .string()
    .min('6','password must be at least 6 characters')
    .max('20','password cannot excess 20 characters')
    
})

