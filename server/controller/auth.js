import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const signupController = async (req, res) => {
    try {
        const { email, name, country, password, answer } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists',
            });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            name,
            country,
            password: hashedPassword,
            answer,
            role,
        });

        // Save the new user to the database
        await newUser.save();

        // Return a success response without the token
        return res.status(201).json({
            message: 'User successfully created',
            user: {
                email: newUser.email,
                name: newUser.name,
                country: newUser.country,
                role: newUser.role,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error creating user',
            error: err.message,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials',
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with the JWT token
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error logging in',
            error: err.message,
        });
    }
};


export const getUsersController = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            success: true,
            message: "All Users Data",
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

export const getUsersByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const users = await User.findById(id)
        res.status(200).json({
            success: true,
            message: "User Data",
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id
        await User.deleteOne(id)
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}