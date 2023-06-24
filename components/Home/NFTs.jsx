import React from 'react'
import Link from 'next/link'
import ImageNft from '../../Files/Images/ImageNft.gif';
import Image from 'next/image';

const NFTs = () => {
  const array=[1,2,3]
  const NFT=()=>{return(

              <div className='px-3 py-5 mx-5 my-5 rounded-md shadow-md border w-[400px] h-[500px]  text-center'>
                <Image src={ImageNft} className=" w-full h-[350px] flex items-center " />
                <br/>
                    <p className='text-white text-3xl   text-center mb-5 oswald italic'>LEGENDARY DEMO</p>
                <Link href="" className='px-5 py-1 text-lg text-center nutino text-white bg-black border-2 border-green-500 rounded-md font-sans shadow-md hover:bg-green-500 w-40'>View NFT</Link>

               </div>
  )}
  return (
    <div className=' bg-black text-center '>
        <div className='text-center'>
            <p className='text-5xl nutino text-green-500 oswald'>Our Contents</p>
            <p className='text-lg text-white w-3/5 m-auto mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit provident esse facilis? Quibusdam aspernatur explicabo excepturi facilis. </p>
        </div>
        <div className='relative flex flex-wrap  justify-around my-10 px-20'>

            {array.map((object,id)=>{return(
               <NFT/>
               )}
            )}
        </div>
        <Link href="" className='px-10 py-2 text-lg text-center nutino text-white  border-2 border-green-500 rounded-md font-sans shadow-md bg-green-500 w-96'>Explore Out</Link>
        <br/><br/><br/><br/><br/>
    </div>
  )
}

export default NFTs