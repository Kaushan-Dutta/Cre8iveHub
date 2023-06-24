import React, { useState,useContext,useCallback, useEffect } from 'react'
import NFT from './NftComponent/NFT';
import { useUser } from '@/hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';
import Heading from './Heading';
import SearchBar from './SearchBar';

const Collection = () => {

  const {user, setUser, tools}=useUser();


  const {getFlowBalance,createCollection,listNFT,createNFT,
        marketplace,getCollectionIds,totalSupply,sendFlow,checkCollection,getOwner,getState,getPrice
                    }=cadenceCode();

  const [nfts,setNfts]=useState();
  const [searchUser,setSearchUser]=useState();

  useEffect(()=>{
    const loadContents=async()=>{
        console.log("........--------------",searchUser);
        if(searchUser)
        {
        const id=await getCollectionIds(searchUser);
        console.log(id,id.length);
        getNFTs(id);}
        
    }
    loadContents();
  },[searchUser])

  const getNFTs=async(id)=>{
    let array=[];
        try{
        for(let i=0;i<id.length;i++){

            const owner=await getOwner(i);
            console.log(owner);
            const nft= await marketplace(owner,id[i]);
            const state=await getState(i);
            if(state=="OnSale"){
                const price=await getPrice(i);
                array.push({nft:{nft},state,price});
            }
            else{
            array.push({nft,state});}
        }
        setNfts(array);   }
        catch(err){
            console.log(err)
        }
  }

  return (
    
    <div className=' overflow-y-scroll overflow-x-hidden scroll-smooth py-28 px-5 h-screen bg-black text-center w-full'>
        
        <Heading name="Collection"/>
        <SearchBar setSearchUser={setSearchUser}/>
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