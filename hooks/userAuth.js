import { useEffect, useState,createContext,useContext } from 'react'
import * as fcl from "@onflow/fcl"

const Data=createContext()

export default function UseCurrentUser({children}) {
  const [user, setUser] = useState({loggedIn:false})

  const tools = {
    logIn: fcl.authenticate,
    logOut: fcl.unauthenticate,
  }

  useEffect(() => {
 
      /* fcl.currentUser().subscribe(newUser => {
        if (newUser?.loggedIn) {
          setUser(newUser)
        } else {
          setUser({loggedIn:false})
        }}) */
      fcl.currentUser().subscribe(setUser);
  
  }, [setUser])

  return <>
      <Data.Provider value={{user,setUser,tools}}>
       {children}
      </Data.Provider>
  </>
}
export function useUser(){
   return useContext(Data);
}