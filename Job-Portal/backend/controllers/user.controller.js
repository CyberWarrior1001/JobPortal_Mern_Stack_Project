import {User} from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(req.body)
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const file = req.file;
        const fileUir = getDataUri(file)
        console.log("Buffer Done")

        console.log("uploading file to cloudinary")

        const cloudResponse = await cloudinary.uploader.upload(fileUir.content)
        console.log("File uploaded")


        console.log("Fatching user")
        const user = await User.findOne({ email })
        console.log(user)
        if (user) {
            console.log("user finded")       
            return res.status(400).json({
                message: 'User already exist with this email',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        });
    } catch (error) {
        console.log(error)
        
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Inocorrect email or password.",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Inocorrect email or password.",
                success: false
            })
        };
        // Check role is correct or not

        if(role != user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role.",
                success: false
            })
        }
        const tokenData = {
            userId:user._id
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});
        

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
            message: `Welcome Back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error)

    }

}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        
        
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        
        
        // cloudinnary commes here..
        console.log('Converting File uri request sended...' )
        const fileUri = getDataUri(file);
        console.log("Converting File uri request come out from function with result" )
        console.log("Uploading file uri to cloudinary " )
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Uploaded with response" )



        let skillsArray
        if (skills){

            skillsArray = skills.split(",")
        }
        const userId = req.id;   // Middleware authentication
        let user = await User.findById(userId);
        if (!user){
            return res.status(400).json({
                message: "User not found",
                success:false
            })
        }
        // Updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        
        // resume comes letter here ...
        
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            console.log(file.originalname)
            user.profile.resumeOriginalName = file.originalname  // Save the original file name
        }
        await user.save()

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "profile updated successfully.",
            user,
            success:true
        })

    } catch (error) {
        // console.log(error)
        
    }
}