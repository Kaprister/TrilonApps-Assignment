import {User} from "../models/user.model.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose";


// generate token
const generateTheAccessToken = async(userId) => {
    try {
        // console.log("under generate");
        const user = await User.findById(userId);
        // console.log(user);
        const accessToken = user.generateAccessToken();
        // console.log(accessToken);
        user.accessToken = accessToken;
        await user.save({validateBeforeSave : false})
        return accessToken
    } catch (error) {
        res.status(500, "Something went wrong, while generating access token!")
        // console.log("Something went wrong, while generating access token!");
    }
}


const signupPlayer = async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        if(!username || !email || !password || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            })
        }

        if(password.toString() !== confirmPassword.toString()){
            console.log("password and confirm password not matched");
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password do not matched!"
            });
        }

        const [existingUsername] = await User.aggregate([
            { $match: { username } }
        ]);
        if(existingUsername){
            return res.status(400).json({
                success: false,
                message: "Username already exists. use another username!"
            });
        }

        // check if user is already exists
        // const existingUser = await User.findOne({email});
        // const existingUser = await User.find({ email: { $regex: new RegExp(email, 'i') } });
        const [existingUser] = await User.aggregate([
            { $match: { email } }
        ]);

        // console.log(existingUser);
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists. please login in to continue."
            });
        }

        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again!"
        })
    }
}


// login
const loginPlayer = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            })
        }

        const user = await User.findOne({email})
        // console.log(user._id);
        // console.log(user);
        // console.log(user.email);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist!"
            });
        }
        

         // correct password correct or not
        const isPasswordValid = await bcrypt.compare(password.toString(), user.password)
        if(!isPasswordValid) {
            return res.status(400).json({
                status: false,
                message: "Password is Incorrect!"
            })
        }

        // access token
        const accessToken = await generateTheAccessToken(user._id);
        // console.log(accessToken);

        // send cookies
        const loggedInPlayer = await User.findById(user._id).select("-password")
        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }

        // return response
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            accessToken: accessToken,
            user: loggedInPlayer,
            message: "User is logged in successfully!",
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, While logging in, Please try again!"
        })
    }
}

// logout
const logoutPlayer = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    accessToken : 1,
                }
            },
            {new : true}
        )
    
        const options = {
            httpOnly: true,
            secure: true,
        }
    
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(
            {
                success: true,
                user,
                message: "Player LoggedOut successfully!"
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, While logging out, Please try again!"
        })
    }
}


// TODO:
// get user
const getPlayerDetails = async (req, res) => {
    try {
        const {username} = req.body;
        // console.log(username);
        // const user = await User.findOne({username}).select('-password -accessToken');
        const [user] = await User.aggregate([
            { $match: { username } },
            {
                $project: {
                    password: 0,
                    accessToken: 0
                }
            }
        ]);
        // console.log(user);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist!"
            });
        }
        return res.status(200).json({
            success: true,
            user,
            message: "User fetched successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, While fetching user details, Please try again!"
        })
    }
}


const getAllPlayers = async (req, res) => {
    try {
        const users = await User.find().select('-password -accessToken');

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found in the database!"
            });
        }

        return res.status(200).json({
            success: true,
            users,
            message: "Users fetched successfully!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching users, please try again!"
        });
    }
}

const getCurrentPlayer = async(req, res) => {
    return res
    .status(200)
    .json(
        {
            success: true,
            user: req.user,
            message: "User Fetched successfully!"
        }
    )
}




export {
    signupPlayer,
    loginPlayer,
    logoutPlayer,
    getPlayerDetails,
    getAllPlayers,
    getCurrentPlayer,
}