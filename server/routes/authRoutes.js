// routes/userRouter.js
import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import validateUser from '../validations/userValidation.js';  // Importing the Joi validation
import { deleteUserController, getUsersByIdController, getUsersController, loginController, signupController } from '../controller/auth.js';

const userRouter = express.Router();

// Signup route with validation
userRouter.post('/signup', (req, res, next) => {
    // Validate the user data
    const { error } = validateUser(req.body);

    // If validation fails, return errors
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details,
        });
    }

    // If validation passes, proceed to the signup controller
    next();
}, signupController);

userRouter.post('/login', loginController)
userRouter.get('/get-users', isAdmin, getUsersController)
userRouter.get('/get-users-by-id/:id', isAdmin, getUsersByIdController)
userRouter.delete('/delete-users-by-id/:id', isAdmin, deleteUserController)

export default userRouter;
