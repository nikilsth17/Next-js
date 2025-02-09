'use client'





import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '@radix-ui/react-label'
import { chatSession } from '@/lib/GeminiAiModal'
import { LoaderCircle } from 'lucide-react'
import DisplayResult from './DisplayResult'


// Connect to MongoDB
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDes, setJobDes] = useState("");
    const [jobExp, setJobExp] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const inputPrompt = `Job position: ${jobPosition}, Description: ${jobDes}, Years of Experience: ${jobExp}. Give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Provide 'question' and 'answer' fields in the JSON.`;

        try {
            const result = await chatSession.sendMessage(inputPrompt);
            const responseText = await result.response.text();
            console.log("Raw Response:", responseText);

            const cleanedJson = responseText
                .replace('```json', '')  // Remove the opening "```json"
                .replace('```', '')      // Remove the closing "```"
                .trim();                 // Remove any extra whitespace around the content

            console.log("Cleaned JSON:", cleanedJson);

            let parsedData;
            try {
                parsedData = JSON.parse(cleanedJson);
                console.log("Parsed Data:", parsedData);
                setAiResponse(parsedData);  // Update state with the parsed data
            } catch (error) {
                console.error("Error parsing cleaned JSON:", error);
                return;  // Prevent further execution if JSON parsing fails
            }

            // Check if parsedData is in the expected format (e.g., an array of questions and answers)
            if (!Array.isArray(parsedData) || !parsedData.every(item => item.question && item.answer)) {
                console.error("Invalid data format:", parsedData);
                return;  // Exit if the data format is not as expected
            }

            // Send the parsed data to the API route
            const response = await fetch("/api/MockInterview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobPosition,
                    jobDes,
                    jobExp,
                    parsedData,  // Send the cleaned parsed data
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log("Interview saved successfully:", responseData.message);
                setOpenDialog(false)
            } else {
                console.error("Error saving interview:", responseData.error);
            }

        } catch (error) {
            console.error("Error fetching interview questions:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='page-content container mx-auto px-4'>
            <div className='flex justify-center content-center flex-col items-center gap-3'>
                <h5>Dashboard</h5>
                <h6>Create and Start your AI Mockup Interview</h6>

                <div className='p-10 w-96 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                    <h2>+ Add new</h2>
                </div>
            </div>
            <DisplayResult aiResponse={aiResponse} />
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Tell us more about your interview</DialogTitle>
                            <DialogDescription>Add details about the job position, your skills, and years of experience.</DialogDescription>
                        </DialogHeader>

                        <Label>Job position/Role Name</Label>
                        <Input
                            type="text"
                            placeholder="Job position/Role Name"
                            value={jobPosition}
                            onChange={(e) => setJobPosition(e.target.value)}
                            required
                        />

                        <Label>Job description</Label>
                        <Textarea
                            placeholder="Job description"
                            value={jobDes}
                            onChange={(e) => setJobDes(e.target.value)}
                            required
                        />

                        <Label>Number of years of experience</Label>
                        <Input
                            type="number"
                            placeholder="Number of years of experience"
                            value={jobExp}
                            onChange={(e) => setJobExp(e.target.value)}
                            required
                        />

                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button type="submit" variant="default" disabled={loading}>
                                {loading ?
                                    <>

                                        <LoaderCircle className='animate-spin' /> Generating from AI
                                    </> : "Start Interview"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;