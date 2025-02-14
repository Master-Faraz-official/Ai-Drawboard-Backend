import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js";

const registerUserController = asyncHandler(async (req, res) => {

    // Extracting user details  
    const { username, email, password } = req.body

    // Validation 
    if (
        [username, email, password].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // Checking if user already exist or not 
    const existedUser = User.findOne({ email })

    if (existedUser) {
        throw new ApiError(40 9, "Email already exists")
    }

    // Creating user in  DB

    const user = await User.create({ username, email, password })

    //    Checking if user is created or not and we dont want password and refresh token
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) throw new ApiError(500, "Something went wrong while creating the user")

    // Sending Response

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User Registered Successfully")
    )
})

export default registerUserController