import React, { useState,useContext,useCallback, useEffect } from 'react'
import ListNFT from './NftComponent/ListNft';
import NFT from './NftComponent/NFT';
import { useUser } from '@/hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';
import Heading from './Heading';
import FilterBox from './FilterBox';

const MyNFTs = () => {

  const {user, setUser, tools}=useUser();

  const {getFlowBalance,createCollection,listNFT,createNFT,
      marketplace,getCollectionIds,totalSupply,sendFlow,checkCollection,getOwner,getState,getPrice
                  }=cadenceCode();

  const [list,setList]=useState(false);
  const [ids,setIds]=useState();
  const [nfts,setNfts]=useState([]);

  useEffect(()=>{
     const loadContents=async()=>{
        const id=await getCollectionIds(user.addr);
        console.log(id,id.length);
        setIds(id);

     }
     loadContents();
  },[])
  useEffect(()=>{

    const loadContents=async()=>{
        let array=[];
        try{
            for(let i=0;i<ids.length;i++){

                
                const nft= await marketplace(user.addr,ids[i]);
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
        
    loadContents();
  },[ids])
  
  const HeadingContent=()=>{return(
    <>
        <Heading name="YOUR NFTs"/>
        <FilterBox/>
    </>
        
  )}
  return (
    <div className=' overflow-y-scroll overflow-x-hidden scroll-smooth py-28 px-5 h-screen bg-black text-center w-full'>
        {nfts && 
        <div className='h-full w-full '>
        <HeadingContent/>
        <div className='flex flex-row flex-wrap justify-center w-4/5 mx-auto text-center'>
            {nfts.map((object,id)=>{
                return(
                    <div className='my-5'>
                    <NFT object={object} id={id}/>
                    <button className='px-5 py-2 bg-green-500 rounded-sm text-white text-center oswald ' onClick={()=>{setList(true)}}>LIST ON SALE</button>
                    </div>
                )
            })}            
        </div>
        {list && <ListNFT setList={setList}/>}
        </div>}
    </div>
  )
}

export default MyNFTs