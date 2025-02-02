import React from 'react'
import About from './About'
import Education from './Education'
import { Card, CardContent } from '../ui/card'

function Intro() {
    return (
        <div className="col-span-full md:col-span-9 h-screen overflow-auto p-4">
            <Card >
                <CardContent>

                    <h1 className='text-5xl'>
                        Say Hi from Drake, Webflow Designer and Developer

                    </h1>
                    <h6>
                        I design and code beautifully simple things and i love what i do. Just simple like that!
                    </h6>
                </CardContent>
            </Card>
            <About />
            <Education /></div>
    )
}

export default Intro