import { Card } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import image from "@/assets/image/image.jpg"

function Sidebar() {
  return (
    <> <Card.Root shadow="md" className="col-span-full md:col-span-3 h-screen sticky top-0 flex">
      <Card.Body>
        <Image
          src={image}
          alt="image"
          className="w-15 rounded-lg"
          width={200}
          height={200}
        />                        <h6>hello@gmail.com</h6>
      </Card.Body>
    </Card.Root></>
  )
}

export default Sidebar