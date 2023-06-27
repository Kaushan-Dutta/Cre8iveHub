import React, { useState,useContext,useCallback, useEffect } from 'react'
import NFT from './NftComponent/NFT';
import { useUser } from '@/hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';
import Heading from './Heading';
import SearchBar from './SearchBar';

const Collection = () => {

  const {user, setUser, tools}=useUser();


  const {getFlowBalance,createCollection,listNFT,createNFT,
        marketplace,getCollectionIds,totalSupply,sendFlow,checkCollection,getOwner,getState,getPrice,getCollectionNfts
                    }=cadenceCode();

  const [nfts,setNfts]=useState();
  const [searchUser,setSearchUser]=useState();
  const [totalNFT,setTotalNFT]=useState(0);

  useEffect(()=>{
    const loadContents=async()=>{
        console.log("........--------------",searchUser);
        if(searchUser)
        {
        const getNfts= await getCollectionNfts(searchUser);
        setTotalNFT(getNfts.length);
        setNfts(getNfts);
    }
        
    }
    loadContents();
  },[searchUser])

  
  return (
    
    <div className=' overflow-y-scroll overflow-x-hidden scroll-smooth py-28 px-5 h-screen bg-black text-center w-full'>
        
        <Heading name="Collection"/>
        <SearchBar setSearchUser={setSearchUser} totalNFT={totalNFT}/>
        {nfts && 
        <div className='flex flex-row flex-wrap justify-center w-4/5 mx-auto text-center'>
            {nfts.map((object,id)=>{
                return(
                    <NFT object={object} id={id}/>
                )
            })}            
        </div> }
    </div>
  )
}

export default Collection