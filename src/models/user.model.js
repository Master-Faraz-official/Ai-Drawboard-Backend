import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
}, { timestamps: true })

// We want to encrypt password before saving it to the DB so we use "Pre middleware" from mongoose

userSchema.pre('save', async function (next) {
    // If the pasword is not modified then run the next middleware
    if (!this.isModified("password")) return next()

    // Hash the password with salt 10
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Creating a custom method for password verification in mongoose

userSchema.methods.isPasswordVerified = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)