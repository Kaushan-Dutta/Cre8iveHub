import React, { useContext } from 'react'
import { ImCross } from 'react-icons/im';

const ListNFT = ({setList}) => {

  
  return (
    <div className='w-screen h-screen bg-black opacity-90 fixed z-30 justify-center items-center flex flex-row top-0 left-0' >

    <div className=' bg-black px-5 py-3 m-auto flex flex-col rounded-md w-96 border border-green-500 text-white' >
        <label className='flex flex-row justify-end text-white' onClick={()=>{setList(false)}}><ImCross/></label>
        <label className='my-1'><b >Enter the price</b></label>
        <input type='number' placeholder='Your Price...' className='border border-white py-1 px-2 bg-black text-white' />        
        <div className='flex flex-row w-full justify-center items-center my-2'>
        <button className='border border-white w-1/2 px-5 py-2 text-slate-100 font-mono hover:bg-green-500'>List NFT</button>
      </div>    
    </div>
    </div>
  )
}

export default ListNFT