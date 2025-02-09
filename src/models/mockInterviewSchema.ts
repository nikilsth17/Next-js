import mongoose from "mongoose";

// Define the schema
const mockInterviewSchema = new mongoose.Schema({
    mockId: { type: String, required: true },
    jsonMockResp: { type: Array, required: true },
    jobPosition: { type: String, required: true },
    jobDes: { type: String, required: true },
    jobExp: { type: String, required: true },
    createdAt: { type: String, required: true },
});

// Ensure that the model is correctly initialized
const MockInterview = mongoose.models.MockInterview || mongoose.model("MockInterview", mockInterviewSchema);

export default MockInterview;  // Default export
