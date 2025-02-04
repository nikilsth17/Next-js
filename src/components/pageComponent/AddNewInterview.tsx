'use client'





import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '@radix-ui/react-label'

function AddNewInterview() {

    const [openDialog, setOpenDialog] = useState(false)
    return (
        <div>
            <h5>Dashboard</h5>
            <h6>Create and Start your AI Mockup Interview</h6>

            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                <h2>+ Add new</h2>
            </div>



            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader >
                        <DialogTitle>Tell us more about you are interviewing</DialogTitle>

                        <DialogDescription>Add Details about job position. Your skills and year of experience</DialogDescription>
                    </DialogHeader>
                    <Label>Job position/Role Name</Label>
                    <Input type="text" placeholder="Job position/Role Name" />
                    <Label>JJob description</Label>

                    <Textarea placeholder="Job description" />
                    <Label>Number of year experience</Label>
                    <Input type="text" placeholder="Number of year experience" />

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="default">Start Interview</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview