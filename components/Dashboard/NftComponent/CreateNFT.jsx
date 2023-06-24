import React,{useState,useContext,useCallback, useEffect} from 'react'
import { ImCross } from 'react-icons/im';
import {useDropzone} from 'react-dropzone'
import { useUser } from '@/hooks/userAuth';
import { cadenceCode } from '@/interactSmartContract/interact';
import { Web3Storage, getFilesFromPath } from 'web3.storage'


const Create = ({create,setCreate}) => {

  const {user, setUser, tools}=useUser();
  const {getFlowBalance,createCollection,listNFT,createNFT,marketplace,getCollectionIds,totalSupply,sendFlow}=cadenceCode();
  const [video,setVideo]=useState();
  const [state,set]=useState({title:"",description:""});
 
  const storage = new Web3Storage({ token:process.env.web3storage });

  const onDrop = useCallback(acceptedFiles => {
    setVideo(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
    }
  })

  let Name,Value;

  const sendData=async(e)=>{
    Name=e.target.name;
    Value=e.target.value;
    set({...state,[Name]:Value})
  }
  const createItem=async(e)=>{

    e.preventDefault();
    console.log(video,state)
    const newFile = new File([video], state.title, {type: video.type});
    const cid = await storage.put([newFile], {
        name: state.title,
    });
    const nftURI = `https://${cid}.ipfs.dweb.link/${state.title}`;
    console.log(nftURI);

    try{
    const createNft=await createNFT(state.title,nftURI,user.addr);
    console.log(createNft);
    setCreate(false);
    }
    catch(err){
      console.log(err);
    }

    
  }

  return (
    <div className='w-screen h-screen bg-black opacity-90 fixed z-30 justify-center items-center flex flex-row top-0 left-0' >
    <div className=' bg-black px-5 py-3 m-auto flex flex-col rounded-md w-[500px] border-2 border-green-500 text-white' >
        <label className='flex flex-row justify-end text-white' onClick={()=>{
          setCreate(false)
        }}><ImCross/></label>
        <label className='my-1'><b >Name of Your NFT:</b></label>
        <input type='text' placeholder='Your Title...' className='border border-white py-1 px-2 bg-black text-white' name="title" value={state.title} onChange={sendData}/>
        <label className='my-1'><b >Description:</b></label>
        <textarea  rows={3} className='w-full border border-white py-1 px-2 bg-black text-white' style={{resize:'none'}} placeholder='Enter the description..' name="description" value={state.description} onChange={sendData}/>
        <label className='mt-1'><b >Your Content:</b></label>

        <p className='nutino text-sm px-2 py-1 border-2  rounded-sm w-40 text-center my-1 cursor-pointer' {...getRootProps()}>
          <input {...getInputProps()} />
          Upload Here
        </p>
        <button className='rounded-md bg-green-500 text-white px-5 py-2 w-40 font-mono text-lg my-2 m-auto ' onClick={createItem}> Create</button>
        
        
    </div>
    </div>
  )
}

export default Create