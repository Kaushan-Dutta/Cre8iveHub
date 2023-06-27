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
      marketplace,getCollectionIds,totalSupply,sendFlow,checkCollection,getOwner,getState,getPrice,getCollectionNfts
                  }=cadenceCode();

  const [list,setList]=useState(false);
  const [ids,setIds]=useState([]);
  const [nfts,setNfts]=useState([]);

  useEffect(()=>{
     const loadContents=async()=>{
        
        const getNfts= await getCollectionNfts(user.addr);
        setIds(getNfts.length);

        setNfts(getNfts); 
     }
     loadContents();
  },[])
    
  const HeadingContent=()=>{return(
    <>
        <Heading name="YOUR NFTs"/>
        <FilterBox totalNFT={ids}/>
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
                    {object.state=="NotSale" && <button className='px-5 py-2 bg-green-500 rounded-sm text-white text-center oswald ' onClick={()=>{setList(true)}}>LIST ON SALE</button>}
                    {list && <ListNFT setList={setList} object={object}/>}

                    </div>
                )
            })}            
        </div>
        </div>}
    </div>
  )
}

export default MyNFTs