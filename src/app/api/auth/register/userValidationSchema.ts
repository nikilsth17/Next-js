import Joi from "joi";

// Define types for register and login user data
export interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  location: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

// Register user validation schema
export const registerUserValidationSchema = Joi.object<RegisterUser>({
  email: Joi.string().email().required().trim().min(5).max(55).lowercase(),
  password: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password")) // Ensure it matches `password`
    .messages({ "any.only": "Passwords do not match" }),

  firstName: Joi.string().required().trim().min(2).max(55),
  lastName: Joi.string().required().trim().min(3).max(55),
  gender: Joi.string().required().trim().valid("male", "female", "other"),
  location: Joi.string().required().trim().min(2).max(55),
});

// Login user validation schema
export const loginUserValidationSchema = Joi.object<LoginUser>({
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string().required().trim(),
});
