import '@/styles/globals.css';
import React,{useState,useEffect,createContext} from 'react';
import InteractSmartContract from '@/interactSmartContract/interact';
import UseCurrentUser from '../hooks/userAuth';
import InteractDatabase from '../interactDatabase/interact'



export default function App({ Component, pageProps }) {


  return(
  <> 
    < UseCurrentUser>
      <InteractDatabase>
       <InteractSmartContract>
            <Component {...pageProps} />
       </InteractSmartContract>
      </InteractDatabase>
    </ UseCurrentUser>


  </>
)
}
