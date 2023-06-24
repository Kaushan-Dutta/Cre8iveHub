import React,{useState} from 'react'

const SearchBar = ({setSearchUser}) => {

  const [search,setSearch]=useState();

  return (
    <div className='text-white w-full  bg-slate-200 px-5 py-5 rounded-md my-5 flex flex-row justify-between items-center '>
            <button className=' py-2 w-20 text-white bg-slate-400 rounded-sm oswald mx-3' onClick={(e)=>{
                e.preventDefault();
                console.log("hello this is kaushan")
                setSearchUser(search)
            }}>SEARCH</button>
            <input type="text" className='w-4/5 text-black  px-5 py-2 rounded-md oswald' placeholder='TYPE THE ADDRESS' onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
            <p className='px-3 py-2 w-20 text-white bg-slate-400 rounded-sm oswald mx-3 text-sm'>23 <span>ITEMS</span></p>
    </div>
  )
}

export default SearchBar