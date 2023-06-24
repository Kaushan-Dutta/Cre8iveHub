import React from 'react'

const Heading = ({name}) => {
  return (
    <div className='flex flex-row justify-between items-center '>
            <p className='text-5xl w-1/4  oswald text-green-500 '>{name}</p>
            <hr className='w-3/4 bg-green-500'/>
    </div>
  )
}

export default Heading