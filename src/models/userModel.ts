import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User model
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  location: string;
}

// Define the schema for the User model
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  location: { type: String, required: true, trim: true },
});

// Create and export the model with the defined schema and interface
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);



export { User };