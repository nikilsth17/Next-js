import Image from 'next/image'
import React from 'react'
import image from "@/assets/image/image.jpg"
import { Card, CardContent } from '../ui/card'
import { FaFacebook } from 'react-icons/fa'
import { LiaLinkedinIn } from 'react-icons/lia'

function Sidebar() {
  return (
    <> <Card className="col-span-full md:col-span-3 h-screen sticky top-0 flex">
      <CardContent>
        <Image
          src={image}
          alt="image"
          className="w-15 rounded-lg"
          width={200}
          height={200}
        />
        <h6>hello@gmail.com</h6>
        <div>
          <i className="ri-instagram-line" style={{ fontSize: "20px" }}></i>
          <FaFacebook />
          <LiaLinkedinIn />       </div>
        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 ">Hire Me</button>

      </CardContent>
    </Card></>
  )
}

export default Sidebar