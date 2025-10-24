import jwt from "jsonwebtoken";
import ENV from "../config.js";

//authentication for users
export default async function Auth(req,res,next) {
    try {
        //access authorization heeader to validate request
        const token=req.headers.authorization.split(" ")[1];


        //retrive the data of logged in user
        const decodeToken= await jwt.verify(token,ENV.JWT_SECRET);

        req.user=decodeToken;

        next();
    } catch (error) {
         res.status(401).json({error:"Authentication Failed"})
    }
}



export function localVariables(req,res,next) {

    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next();
}
