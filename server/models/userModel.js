import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);