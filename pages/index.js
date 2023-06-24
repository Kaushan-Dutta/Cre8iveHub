import React,{useEffect,useContext,useState} from 'react'
import Nav from '@/components/Home/Nav';
import Header from '@/components/Home/Header';
import NFTs from '@/components/Home/NFTs';
import About from '@/components/Home/About';
import Footer from '@/components/Home/Footer';
import { Data } from '@/pages/_app';
import * as fcl from "@onflow/fcl";
import "../flow/config";
import { useUser } from '@/hooks/userAuth';

const index = () => {
  const {user, setUser, tools}=useUser();

  return (
    <div>
      <Nav/>
      <Header/>

      {user?.loggedIn?<NFTs/>:''}
      <About/>
      <Footer/>   
    </div>
  )
}

export default index