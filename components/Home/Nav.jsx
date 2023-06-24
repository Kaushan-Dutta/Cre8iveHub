import React,{useState,useContext,useEffect} from 'react'
import Link from 'next/link';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineTrophy } from 'react-icons/ai';
import { AiOutlineLogout} from 'react-icons/ai';
import { AiOutlineLogin} from 'react-icons/ai';
import { Data } from '@/pages/_app';
import * as fcl from "@onflow/fcl";
import "../../flow/config";
import {useUser} from '../../hooks/userAuth';


const Nav = () => {

  const {user, setUser, tools}=useUser();

  const [state,setState]=useState(true);
  const Login=()=>{
    return(
    <div className='flex flex-row justify-around items-center text-lg nutino'>

           <Link href={`/${user?.addr}`} className='hover:text-green-500 text-white  mx-3'>DashBoard</Link>
           <Link href="/" className='hover:text-green-500 text-white  mx-3'>Contest</Link>
           <button className=' mx-2 px-5 py-1  text-white bg-black border-2 border-green-500 rounded-md  shadow-md hover:bg-green-500' onClick={tools.logOut}>Log Out</button>

    </div>
    )
  }
  const LogOut=()=>{
    return(
    <div className=''>
       <button className='px-5 py-1 text-lg text-white bg-black border-2 border-green-500 rounded-md font-sans shadow-md hover:bg-green-500' onClick={ tools.logIn}>Login</button>
    </div>)
  } 
 
  const LoginSm=()=>{
    return(
    <div className='flex flex-row justify-around items-center text-2xl '>

           <Link href="/" className='hover:text-green-500 text-white font-mono mx-3'><RxDashboard/></Link>
           <Link href="/" className='hover:text-green-500 text-white font-mono mx-3'><AiOutlineTrophy/></Link>
           <button className=' mx-2   text-green-500 text-2xl' onClick={tools.logOut}><AiOutlineLogout/></button>

    </div>
    )
  }
  const LogOutSm=()=>{
    return(
    <div className=''>
       <button className='text-2xl text-green-500' onClick={ tools.logIn }><AiOutlineLogin/></button>
    </div>)
  } 
 
 
  return (
    <nav className='px-5 py-4 bg-black w-full  shadow-sm shadow-green-500 fixed z-10'>
      <div className='hidden  md:flex justify-between items-center  px-5'>
        <div className=''>
           <Link href="/" className='text-3xl  text-white bagel' >Cre<span className='text-green-500'>8</span>ive<span className='text-green-500'>Hub</span></Link>
        </div>
        
        {user.loggedIn?<Login/>:<LogOut/>}
        
      </div>
      <div className='md:hidden justify-between items-center flex'>
        <div className=''>
          <Link href="/" className='text-3xl  text-white bagel' >Cre<span className='text-green-500'>8</span>ive<span className='text-green-500'>Hub</span></Link>
        </div>
          
        {user.loggedIn?<LoginSm/>:<LogOutSm/>}
      </div>
    </nav>
  )
}

export default Nav