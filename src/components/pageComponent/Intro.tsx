import { Card } from '@chakra-ui/react'
import React from 'react'
import About from './About'
import Education from './Education'

function Intro() {
    return (
        <div className="col-span-full md:col-span-9 h-screen overflow-auto p-4"><Card.Root shadow="md" >
            <Card.Body>

                <h1 className='text-5xl'>
                    Say Hi from Drake, Webflow Designer and Developer

                </h1>
                <h6>
                    I design and code beautifully simple things and i love what i do. Just simple like that!
                </h6>
            </Card.Body>
        </Card.Root>
            <About />
            <Education /></div>
    )
}

export default Intro