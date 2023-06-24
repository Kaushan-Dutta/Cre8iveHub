import React,{useState,useEffect,useContext} from 'react'
import Nav from '@/components/Dashboard/Nav'
import SideBar from '@/components/Dashboard/SideBar';
import MarketPlace from '../components/Dashboard/Marketplace';
import Collection from '@/components/Dashboard/Collection';
import MyNFTs from '@/components/Dashboard/MyNfts';
import { Data } from '@/pages/_app';
import * as fcl from "@onflow/fcl";
import "../flow/config";
import {useRouter}  from 'next/router';
import {useUser} from '../hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';

const props = () => {

  const router=useRouter();
  const {user, setUser, tools}=useUser();
  const {getFlowBalance,createCollection,listNFT,createNFT,marketplace,getCollectionIds,totalSupply,sendFlow}=cadenceCode();

  const [state,setState]=useState("Market");

  useEffect(()=>{
    const loadContents=async()=>{
     try{
     console.log(user.addr)
     const flow_bal=await getFlowBalance(user.addr);
     console.log(".............",flow_bal);
     }
     catch(err){
        console.log("..................",err);
     }
    }
    loadContents();
  },[])

  useEffect(()=>{
    const loadContents=async()=>{
     try{
     console.log(user.addr);
     const cllc=await createCollection();
     console.log(".............",cllc);
     }
     catch(err){
        console.log("..................",err);
     }
    }
    loadContents();
  },[])

  const Navigate=()=>{
    
       if(state=="Market"){
         return(<MarketPlace/>);
       }
       else if(state=="MyNft"){
        return(<MyNFTs/>);
       }
       else if(state=="Collection"){
        return(<Collection/>)
       }
      
    
  }
  const LogIn=()=>{
    return(
      <div>
      <Nav/>
      <div className='flex flex-row justify-between w-full '>
          <SideBar state={state} setState={setState} />
          <Navigate/>
      </div>
      </div>
    )
  }

 
  return (
    <>
    {user.loggedIn && <LogIn/>}
    </>
  )
}

export default props