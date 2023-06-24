import React, { useState,useContext } from 'react'

import ListNFT from '@/components/Dashboard/NftComponent/ListNft';
import CreateNFT from '../Dashboard/NftComponent/CreateNFT';
import "../../flow/config";
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';
import {Links} from '../../labels/DashBoardLinks';

const SideBar = ({state,setState}) => {

  const {user, setUser, tools}=useUser();
  const {getFlowBalance,createCollection,listNFT,createNFT,marketplace,getCollectionIds,totalSupply,sendFlow}=cadenceCode();

  const router=useRouter();

  const [create,setCreate]=useState(false);


  return (
    <div className='h-screen w-52 bg-black px-5 py-2  border-r-2 border-green-500 '>
        <div className='text-md nutino text-white py-28 text-left list-none cursor-pointer h-4/5'>
          
            
            {Links.map((object,id)=>(

               <li className={`w-40 px-2 py-1  mb-5 hover:shadow-md border-2 border-black hover:shadow-slate-700 hover:border-2 hover:border-green-500 flex flex-row items-center ${state==object.name?'border-2 border-green-500':''}`} key={id} onClick={()=>{setState(object.name)}}><span>{object.icon}</span>&nbsp;&nbsp;{object.link}</li>

            ))}

        </div>
        <div className='text-center'>
            <hr/>
            <br/>
            <button className=' px-5 py-2 w-40 mb-3 text-white nutino   rounded-lg  shadow-md bg-green-500' onClick={()=>{setCreate(true)}}>Create +</button>
            <br/>

            <button className=' px-5 py-2 w-40 text-white nutino   rounded-lg  shadow-md border-2 border-green-500' onClick={()=>{tools.logOut;setUser({loggedIn:false});router.push('/')}}>Logout</button>
        </div>
        {create && <CreateNFT create={create} setCreate={setCreate}/>}
    </div>
  )
}

export default SideBar