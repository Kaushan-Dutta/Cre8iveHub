import React from 'react'
import Link from 'next/link'
import {Links} from '../../labels/SocialLinks'

const Footer = () => {
  return (
    <div className='py-5 bg-black'>
       <div className='py-5  px-10 border-t border-green-500 shadow shadow-slate-600 flex flex-wrap flex-row justify-around items-center'>
            <div className='m-3'>
                <p className='text-3xl  text-white bagel' >Cre<span className='text-green-500'>8</span>ive<span className='text-green-500'>Hub</span></p>
            </div>
            <div className='nutino flex flex-col m-3'>
                <Link href="/" className='hover:text-green-500 text-white'>DashBoard</Link>
                <Link href="/" className='hover:text-green-500 text-white'>Contest</Link>
            </div>
            <div className='m-3'>
                <img src="https://nbatopshot.com/static/img/flow.svg"/>
            </div>
       </div>
       <div className='py-5  px-10  flex flex-col justify-around  text-center items-center'>
           <div className='w-80 flex flex-row justify-around text-white'>
             {Links.map((object,id)=>(
                  <Link href={object.link} className='px-2 py-2 rounded-full text-xl  hover:text-green-500 border border-white'>{object.icon}</Link>
             ))}
             
           </div>
           <p className='text-white text-md nutino mt-5'>© Cre8iveHub 2023 | Kaushan Dutta | All rights reserved</p>
       </div>
    </div>
  )
}

export default Footer