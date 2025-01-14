import { db_connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import argon2 from 'argon2';
import { registerUserValidationSchema } from "./userValidationSchema";

// Connect to the database
db_connect();




export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();

        // Validate user input
        await registerUserValidationSchema.validateAsync(body);

        // Check if user already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email address already exists." },
                { status: 409 }
            );
        }

        // Hash the password using argon2
        const hashedPassword = await argon2.hash(body.password);

        // Create new user
        await User.create({ ...body, password: hashedPassword });

        return NextResponse.json({ message: "User is successfully registered." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 400 });
    }
}
