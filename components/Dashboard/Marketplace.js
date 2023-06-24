import React,{useState,useContext,useCallback, useEffect} from 'react'
import NFT from './NftComponent/NFT' ;
import { useUser } from '@/hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';
import Heading from './Heading';
import FilterBox from './FilterBox';

const Marketplace = () => {

  const {user, setUser, tools}=useUser();

  const {getFlowBalance,createCollection,listNFT,createNFT,
    marketplace,getCollectionIds,totalSupply,sendFlow,checkCollection,getOwner,getState,getPrice
                }=cadenceCode();

  const [totalNFT,setTotalNFT]=useState();
  const [nfts,setNfts]=useState();

  useEffect(()=>{
     const loadContents=async()=>{
        try{
        const supply=await totalSupply();
        console.log(user.addr,supply)
        setTotalNFT(supply);}
        catch(err){
            console.log("Error",err)
        }

     }
     loadContents();
  },[])

  useEffect(()=>{
    const loadContents=async()=>{
        let array=[]
        const ids=totalNFT;
        try{
            for(let i=0;i<ids;i++){
                const owner=await getOwner(i);
                console.log(owner);
                const nft= await marketplace(owner,i);
                console.log(nft);
                const state=await getState(i);
                if(state=="OnSale"){
                    const price=await getPrice(i);
                    array.push({nft,state,price,owner});
                }
                array.push({nft,state,owner});
                
            }
            setNfts(array)
        }
        catch(err){
            console.log("Error in market",err);
        }
    }
    loadContents();
  },[totalNFT])
  
  
  const HeadingContent=()=>{return(
    <>
        <Heading name="Minted Content"/>
        <FilterBox/>
    </>
  )}

  return (
    <div className='overflow-y-scroll overflow-x-hidden scroll-smooth py-28 px-5 h-screen bg-black text-center w-full'>
    {nfts && 
    <div className='h-full w-full '>
        <HeadingContent/>
        <div className='flex flex-row flex-wrap justify-center w-4/5 mx-auto text-center'>
            {nfts.map((object,id)=>{
                console.log(object);
                return(
                    <NFT object={object} id={id}/>
                )
            })}            
        </div>
    </div>}</div>
  )
}

export default Marketplace