import '@/styles/globals.css';
import React,{useState,useEffect,createContext} from 'react';
import InteractSmartContract from '@/interactSmartContract/interact';
import UseCurrentUser from '../hooks/userAuth';



export default function App({ Component, pageProps }) {


  return(
  <> 
   < UseCurrentUser>
      <InteractSmartContract>
         <Component {...pageProps} />
      </InteractSmartContract>
   </ UseCurrentUser>
  </>
)
}
