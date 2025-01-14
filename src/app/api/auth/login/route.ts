import { NextRequest, NextResponse } from "next/server";
import { loginUserValidationSchema } from "../register/userValidationSchema";
import { User } from "@/models/userModel";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { db_connect } from "@/dbConfig/dbConfig";


// Connect to the database
db_connect();

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const newUser = await req.json();

        // Validate user input
        await loginUserValidationSchema.validateAsync(newUser);

        // Check if the user exists
        const user = await User.findOne({ email: newUser.email });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        // Check if the password matches
        const passwordMatch = await argon2.verify(user.password, newUser.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }
        // Ensure secret key is defined
        const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
        if (!secretKey) {
            throw new Error("JWT secret key is not defined in environment variables.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email },
            secretKey,
            { expiresIn: "1d" }
        );

        // Hide user password before sending response
        user.password = undefined;

        // Return user and token
        return NextResponse.json(
            { user, token, message: "Login successful" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 400 });
    }
}
