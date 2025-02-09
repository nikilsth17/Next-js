import { db_connect } from "@/dbConfig/dbConfig";  // Adjust path as necessary
import MockInterview from "@/models/mockInterviewSchema";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        // Connect to MongoDB
        await db_connect();

        // Parse the JSON body from the request
        const { jobPosition, jobDes, jobExp, parsedData } = await req.json();

        // Create a new interview document
        const interview = new MockInterview({
            mockId: uuidv4(),
            jsonMockResp: parsedData,
            jobPosition,
            jobDes,
            jobExp,
            createdAt: moment().format("DD-MM-yyyy"),
        });

        // Save the interview document to MongoDB
        await interview.save();

        // Return a success response
        return NextResponse.json({ message: "Interview saved successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error in database operation:", error);
        return NextResponse.json({ error: "Error saving interview data" }, { status: 500 });
    }
}
