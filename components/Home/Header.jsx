import React from 'react';
import ReactPlayer from 'react-player'
import Link from 'next/link';
import Creator from '../../Files/Images/Creator.gif'
import Image from 'next/image';

const Header = () => {

  const Video=()=>{
    return(
        <div className='px-4 py-4 ' >
          <Image src={Creator} className=' h-full w-60' />

        </div>
    )
  }

  const ScreenSm=()=>(
    <>
        <div className='flex flex-col justify-start my-5'>
            <p className='text-4xl text-green-500 my-3 oswald'>Showcase your Content</p>
            <p className='text-lg text-white my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita quos vitae provident ducimus perspiciatis, molestias repellendus saepe nemo at! Consequatur aliquid eveniet totam fuga impedit repellat delectus accusamus eum.</p>
            <Link href="" className='px-5 py-1 text-lg text-center nutino text-white bg-black border-2 border-green-500 rounded-md font-sans shadow-md hover:bg-green-500 w-40'>Dashboard</Link>

        </div>
        <div className='my-5 flex flex-row justify-center'>
            <Video/>
        </div>
    </>
  )
  const ScreenLg=()=>(
    <>
        <div className='flex flex-col  w-2/5 mx-5 '>
            <p className='text-7xl text-green-500 my-3 oswald '>Showcase your Content</p>
            <p className='text-xl text-white my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita quos vitae provident ducimus perspiciatis, molestias repellendus saepe nemo at! Consequatur aliquid eveniet totam fuga impedit repellat delectus accusamus eum.</p>
            <Link href="" className='px-5 py-1 text-lg text-center nutino text-white bg-black border-2 border-green-500 rounded-md font-sans shadow-md hover:bg-green-500 w-40'>Dashboard</Link>
        </div>
        <div className='mx-5 w-1/2 flex flex-row justify-center'>
            <Video/>
        </div>
    </>
  )
  return (
    <div className='w-full'>
    <div className='hidden  md:flex flex-row  items-center justify-between bg-black w-full py-40 px-20 '>
        <ScreenLg/>
    </div>
    <div className='md:hidden flex-col  justify-center bg-black py-28 px-10 '>
        <ScreenSm/>
    </div>
    </div>
  )
}

export default Header