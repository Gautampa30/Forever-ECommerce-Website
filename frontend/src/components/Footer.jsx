import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 sm:gap-8 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nisi dicta exercitationem quos impedit hic ea tempore eveniet illum quod, veritatis aut sapiente placeat cumque ad vel perferendis ab delectus quasi in quaerat at. Excepturi pariatur voluptas fugiat expedita eaque!
            </p>
        </div>
        <div>
            <p className='text-xl font-semibold mb-5'>
               COMPANY 
            </p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                   <li>Home</li>
                   <li>About us</li>
                   <li>Delivery</li>
                   <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-semibold mb-5'>GET IN TOUCH</p>
            <ul  className='flex flex-col gap-3 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@foreveryou.com</li>
            </ul>
        </div>
        <div className='col-span-full w-full'>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer