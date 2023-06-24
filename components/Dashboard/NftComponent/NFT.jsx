import React from 'react'
import { AiOutlineHeart} from 'react-icons/ai';
import { AiFillHeart} from 'react-icons/ai';

const NFT=({object,id})=>{
    console.log(object.nft)
    return(
            <div className='border-2 border-green-500 rounded-md flex flex-col w-72 h-[400px] cursor-pointer m-5' key={id}>
                <div className='border-b-2 border-green-500 h-2/3'>
                    <div className=' flex flex-row justify-end '>
                    <button className='px-3 py-2 border-l-2 border-b-2 w-16 border-green-500 text-white nutino flex items-center justify-between'><AiOutlineHeart/>12</button>
                    </div>
                    <video src={object.nft.ipfs}  autoPlay loop muted className='overflow-hidden bg-cover w-full h-2/3'/>
                </div>
                <div className='flex flex-row justify-around text-white oswald list-none px-2 py-5 h-1/3 text-sm '>

                    <div className='w-1/2 h-full text-left border-r-2 mx-2 border-white '>
                        <li>LIKES</li>
                        <li>SALE PRICE</li>
                        <li>OWNER</li>
                        <li>NAME</li>
                    </div>
                    <div className='w-1/2  text-left px-2'>
                        <li>*23</li>
                        <li>{object.state}</li>
                        <li>{object?.owner}</li>
                        <li className='text-red-500'>{object.nft.name}</li>
                    </div>

                </div>
            </div>
    )
  }

export default NFT