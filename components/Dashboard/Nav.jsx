import React,{useState,useContext} from 'react'
import Link from 'next/link';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineTrophy } from 'react-icons/ai';
import { AiOutlineLogout} from 'react-icons/ai';
import { AiOutlineLogin} from 'react-icons/ai';
import { Data } from '@/pages/_app';
import * as fcl from "@onflow/fcl";
import "../../flow/config";
import { useUser } from '@/hooks/userAuth';


const Nav = () => {
  const {user, setUser, tools}=useUser();

  const [state,setState]=useState(true);

 
 
  return (
    <>
    <nav className='px-5 py-2 bg-black w-full  shadow-sm shadow-green-500 fixed z-10'>

      <div className='hidden  md:flex justify-between items-center  px-5'>
        <div className=''>
            <Link href="/" className='text-3xl  text-white bagel' >Cre<span className='text-green-500'>8</span>ive<span className='text-green-500'>Hub</span></Link>
        </div>
        <div className='flex flex-row items-center'>
            <button className='border-green-500 border-2 text-white px-5 py-1 nutino rounded-md mx-5'>{user.addr}</button>
            <img src="https://api.dicebear.com/6.x/pixel-art/svg?seed=0x29a" className='rounded-full w-10 my-3 cursor-pointer'/>
        </div>
               
      </div>
            
    </nav>
    </>
  )
}

export default Nav