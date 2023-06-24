import React from 'react'

const About = () => {
  return (
    <div className='bg-black lg:px-20 sm:px-10 '>
        <div className='w-3/5 mx-auto px-10 py-5  rounded-2xl border border-green-500 shadow-md shadow-green-500 flex flex-row flex-wrap justify-around items-center'>
            <div className='px-3 text-center my-5'>
                <img src="https://api.dicebear.com/6.x/pixel-art/svg?seed=0x29" className='rounded-full w-28 my-3 relative left-5'/>
                <p className='text-white oswald text-2xl'> Users:</p>
                <p className='text-green-500 oswald text-5xl'>15</p>
                <p className='text-white font-mono text-lg'><b>Last 24 Hrs: <span className='text-green-500'>+2</span></b></p>
                <p className='text-white font-mono text-lg'><b>Last Month: <span className='text-green-500'>+31</span></b></p>
            </div>
            <div className='px-3 text-center my-5'>
                <img src="https://api.dicebear.com/6.x/pixel-art/svg?seed=0x2w9" className='rounded-full my-3 w-28 relative left-5'/>
                <p className='text-white oswald text-2xl'> NFTs Minted:</p>
                <p className='text-green-500 oswald text-5xl'>15</p>
                <p className='text-white font-mono text-lg'><b>Last 24 Hrs: <span className='text-green-500'>+2</span></b></p>
                <p className='text-white font-mono text-lg'><b>Last Month: <span className='text-green-500'>+31</span></b></p>
            </div>
        </div>
        <br/><br/><br/><br/><br/>

    </div>
  )
}

export default About