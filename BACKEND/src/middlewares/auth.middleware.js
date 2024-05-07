import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";



export const verifyJWT = async (req, res, next) => {
    try {
        let token = req.body.accessToken || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // if (req.cookies && req.cookies.accessToken) {
        //     token = req.cookies.accessToken;
        // } else if (req.body && req.body.accessToken) {
        //     token = req.body;
        // } else if (req.headers.authorization) {
        //     const authHeader = req.headers.authorization;
        //     token = authHeader.replace("Bearer ", "");
        // }
        if(!token){
            return  res.status(401).json({
                success: false,
                message: "Unauthorized request!",
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -AccessToken")

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid access token!",
            })
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong! while verifying access token",
        })
    }
}