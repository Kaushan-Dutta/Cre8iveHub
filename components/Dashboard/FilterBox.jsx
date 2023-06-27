import React from 'react'

const FilterBox = ({totalNFT}) => {
  return (
    <div className='text-white w-full  bg-slate-200 px-5 py-5 rounded-md my-5 flex flex-row justify-between items-center '>
            <button className=' py-2 w-20 text-white bg-slate-400 rounded-sm oswald mx-3'>SEARCH</button>
            <div className='flex flex-row justify-between items-center mx-3 bg-slate-400 rounded-sm oswald text-white px-5 py-2 w-4/5'>
                <p className='w-20'>  SORT BY :</p>
                <select className='w-full  bg-slate-400 rounded-sm oswald text-white'>

                    <option value="0">ALL NFTS</option>
                    <option value="1">RECENTLY ADDED</option>
                    <option value="2">FOR SALE</option>
                    <option value="3">NOT ON SALE</option>

                </select>

            </div>
             <p className='px-3 py-2 w-20 text-white bg-slate-400 rounded-sm oswald mx-3 text-sm'>{totalNFT} <span>ITEMS</span></p>
    </div>
  )
}

export default FilterBox