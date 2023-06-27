import React,{useState,useContext,createContext,useEffect} from 'react'
import {v4 as uuidv4} from 'uuid';
import {databases} from './appwrite';

export const Data=createContext();
const interact = ({children}) => {
     
    const createDoc=async(id,name,description,ipfs,creation)=>{
     try{
        const promise = await databases.createDocument(process.env.database_id, process.env.collection_id, uuidv4(), {uuid:id,name:name,description:description,ipfs:ipfs,creation});
        console.log(promise);}
     catch(err){
        console.log(err)}
     
    }
    const updateLike=async(uuid,val)=>{
        try{
           const promise = await databases.updateDocument(process.env.database_id, process.env.collection_id, uuid, {likes:likes+val});
           console.log(promise);}
        catch(err){
           console.log(err)}
        
    }
    const updateComment=async(uuid,val)=>{
        try{
           const promise = await databases.updateDocument(process.env.database_id, process.env.collection_id, uuid, {comment:comment.append(val)});
           console.log(promise);}
        catch(err){
           console.log(err)}
        
    }
    const getDoc=async(uuid)=>{
        try{
           const promise = await databases.listDocuments(process.env.database_id, process.env.collection_id,
            [
               Query.equal('uuid', uuid),
            ])
           console.log(promise);}
        catch(err){
           console.log(err)}
        
    }
    const value={createDoc,updateLike,updateComment,getDoc};
    return(
      <Data.Provider value={value}>
         {children}
      </Data.Provider>
    )
}

export default interact
export const useDatabase=()=>{
   return useContext(Data);
}