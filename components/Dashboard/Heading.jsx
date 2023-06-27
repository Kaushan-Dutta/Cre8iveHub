import React from 'react'

const Heading = ({name}) => {
  return (
    <div className='flex flex-row justify-center items-center '>
            <p className='text-5xl  oswald text-green-500 text-left '>{name}</p>
            <hr className='w-full bg-green-500 mx-5'/>
    </div>
  )
}

export default Heading