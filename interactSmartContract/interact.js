import React,{useState,createContext,useContext,useEffect} from 'react'
import * as fcl from "@onflow/fcl";

const Data=createContext();

const interact = ({children}) => {

    const getFlowBalance = async (address) => {
        const cadence = `
          import FlowToken from 0x7e60df042a9c0868
          import FungibleToken from 0x9a0766d93b6608b7
          
          pub fun main(address: Address): UFix64{
            let account = getAccount(address)
            let path = /public/flowTokenBalance
      
            let vaultRef = account.getCapability(path)
              .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
              ?? panic("Could not borrow Balance reference to the Vault")
      
            return vaultRef.balance
          }
        `;
        const args = (arg, t) => [arg(address, t.Address)];
        const balance = await fcl.query({ cadence, args });
        return balance;
    };

    const createCollection=async()=>{
        const cadence=`
            import MyStore from 0xe980ac3a631ef292
            import NonFungibleToken from 0xe980ac3a631ef292
            transaction() {
            
            prepare(acct: AuthAccount) {
            
                acct.save(<- MyStore.createEmptyCollection(),to: /storage/Collection)
                acct.link<&MyStore.Collection{NonFungibleToken.CollectionPublic}>(/public/Collection,target: /storage/Collection)
            
            }
            
            execute {
                log("Collection Created");   
            }
            }
        `;

        const args = (arg, t) => [];
        const proposer= fcl.authz;
        const authorizations= [fcl.authz];
        const limit=999;
        const collection=await fcl.mutate({cadence,args, limit, proposer,authorizations})
        return collection;
      }

      const createNFT=async(_name,_ipfs,_owner)=>{
        const cadence=`
            import MyStore from 0xe980ac3a631ef292
            import NonFungibleToken from 0xe980ac3a631ef292
            transaction(_name:String,_ipfs:String,_owner:Address) {

            prepare(acct: AuthAccount) {
                    
                let collection=acct.borrow<&MyStore.Collection>(from:/storage/Collection)!
                collection.deposit(token:<-MyStore.createNFT(_name:_name,_ipfs:_ipfs,_owner:_owner) )
                
            }

            execute {
                log("NFT Created");   
            }
            }

        `;

        const args = (arg, t) => [arg(_name, t.String), arg(_ipfs, t.String),arg(_owner,t.Address)];
        const proposer= fcl.authz;
        const authorizations= [fcl.authz];
        const limit=999;
        const nft=await fcl.mutate({cadence,args, limit, proposer,authorizations})
        console.log("========================",nft)
        const transaction = await fcl.tx(nft).onceSealed()
        //console.log("//////////////////",transaction.events)
        //console.log("//////////////////",transaction.events[0])
        //console.log("//////////////////",transaction.events[0].data)

        const id=transaction.events[0].data.id
        
        return id;
      }
      
      const listNFT=async(_id,_price)=>{
        const cadence=`
            import MyStore from 0xe980ac3a631ef292
            import NonFungibleToken from 0xe980ac3a631ef292
            transaction(_id:UInt64,_price:UFix64) {
            
            prepare(acct: AuthAccount) {
                    
                MyStore.listNFT(_id:_id,_price:_price);
                
            }
            
            execute {
                log("Price Mentioned");   
            }
            }
   

        `;

        const args = (arg, t) => [arg(_id, t.UInt64), arg(_price, t.UFix64)];
        const proposer= fcl.authz;
        const authorizations= [fcl.authz];
        const limit=999;
        const list=await fcl.mutate({cadence,args, limit, proposer,authorizations})
        return list;
      }
      
  

    const marketplace=async(acc,id)=>{
        const cadence=`
            import MyStore from 0xe980ac3a631ef292
            import NonFungibleToken from 0xe980ac3a631ef292
            
            pub fun main(acc:Address,id:UInt64):&NonFungibleToken.NFT {
            
            let response=getAccount(acc).getCapability(/public/Collection).borrow<&MyStore.Collection{NonFungibleToken.CollectionPublic}>() ?? panic("Not Found")
            return(response.borrowNFT(id:id) )
            }
           
        `;

        const args = (arg, t) => [arg(acc, t.Address), arg(id, t.UInt64)];
        const nft=await fcl.query({cadence,args})
        return nft;
    }

    const getCollectionIds=async(acc)=>{
        const cadence=`
            import MyStore from 0xe980ac3a631ef292
            import NonFungibleToken from 0xe980ac3a631ef292
            
            pub fun main(acc:Address):[UInt64] {
            
            let response=getAccount(acc).getCapability(/public/Collection).borrow<&MyStore.Collection{NonFungibleToken.CollectionPublic}>() ?? panic("Not Found")
            return(response.getIDs())
            }
              
        `;

        const args = (arg, t) => [arg(acc, t.Address)];
        const ids=await fcl.query({cadence,args})
        return ids;
    }
    
    const totalSupply=async()=>{
        const cadence=`
            import MyStore from 0xe980ac3a631ef292
            import NonFungibleToken from 0xe980ac3a631ef292
            
            pub fun main():UInt64 {
            
            return(MyStore.totalSupply)
            
            }
  
        `;

        const args = (arg, t) => [];
        const supply=await fcl.query({cadence,args})
        return supply;
    }
    
    const sendFlow = async (recepient, amount) => {
        const cadence = `
          import FlowToken from 0x7e60df042a9c0868
          import FungibleToken from 0x9a0766d93b6608b7
      
          transaction(recepient: Address, amount: UFix64){
            prepare(signer: AuthAccount){
              let sender = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                ?? panic("Could not borrow Provider reference to the Vault")
      
              let receiverAccount = getAccount(recepient)
      
              let receiver = receiverAccount.getCapability(/public/flowTokenReceiver)
                .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
                ?? panic("Could not borrow Receiver reference to the Vault")
       
              receiver.deposit(from: <- sender.withdraw(amount: amount))
            }
          }
        `;
        const args = (arg, t) => [arg(recepient, t.Address), arg(amount, t.UFix64)];
        const limit = 500;
      
        const txId = await fcl.mutate({cadence, args,limit, proposer: fcl.authz, authorizations: [fcl.authz]});
        return txId
      };
      const checkCollection=async(acc)=>{
        const cadence=`
        import MyStore from 0xe980ac3a631ef292
        import NonFungibleToken from 0xe980ac3a631ef292

        pub fun main(acc:Address):Bool{
        let acct= getAuthAccount(acc)
        
        if(acct.borrow<&MyStore.Collection>(from:/storage/Collection)!=nil){
              return true
        }
        return false
        }
        `
        const args = (arg, t) => [arg(acc, t.Address)];
        const proposer= fcl.authz;
        const authorizations= [fcl.authz];
        const limit=999;
        const checkExist=await fcl.query({cadence,args, limit, proposer,authorizations})
        return checkExist;

      }
      const getOwner=async(id)=>{
        const cadence=`
        import MyStore from 0xe980ac3a631ef292
        import NonFungibleToken from 0xe980ac3a631ef292
        
        pub fun main(id:UInt64):Address {
        
           return(MyStore.owner[id]!)
           
        }
         
        `
        const args = (arg, t) => [arg(id, t.UInt64)];
        const address=await fcl.query({cadence,args})
        return address;
      }
      const getState=async(id)=>{
        const cadence=`
        import MyStore from 0xe980ac3a631ef292
        import NonFungibleToken from 0xe980ac3a631ef292

        pub fun main(id:UInt64):String {

          return(MyStore.state[id]!)
          
        }
         
        `
        const args = (arg, t) => [arg(id, t.UInt64)];
        const state=await fcl.query({cadence,args})
        return state;
      }
      const getPrice=async(id)=>{
        const cadence=`
        import MyStore from 0xe980ac3a631ef292
        import NonFungibleToken from 0xe980ac3a631ef292

        pub fun main(id:UInt64):UFix64 {

          return(MyStore.price[id]!)
          
        }
         
        `
        const args = (arg, t) => [arg(id, t.UInt64)];
        const price=await fcl.query({cadence,args})
        return price;
      }
      const getAllNfts=async()=>{
        const cadence=`
        import MyStore from 0xe980ac3a631ef292
        import NonFungibleToken from 0xe980ac3a631ef292
        
        pub struct NFT {
        
          pub let id:UInt64;
          pub var price:UFix64;
          pub var state:String;
          pub var owner:Address;
          pub let nft:&NonFungibleToken.NFT;
        
          init(id:UInt64,price:UFix64,state:String,owner:Address,nft:&NonFungibleToken.NFT){
             self.id=id;self.price=price;self.state=state;self.owner=owner;self.nft=nft;
          }
        }
        pub fun main():[NFT]{
           let totalSupply=MyStore.totalSupply;
           var NFTs:[NFT]=[]
           var i:UInt64=0
           while(i<totalSupply){
              let owner=MyStore.owner[i]!
              let response=getAccount(owner).getCapability(/public/Collection).borrow<&MyStore.Collection{NonFungibleToken.CollectionPublic}>() ?? panic("Not Found")
        
              let borrowNFT=response.borrowNFT(id:i) 
        
              let state=MyStore.state[i]!
              
              if(state=="OnSale"){
                 let price=MyStore.price[i]!
                 NFTs.append(NFT(id:i,price:price,state:state,owner:owner,nft:borrowNFT))
              }
              else{
                   NFTs.append(NFT(id:i,price:0.0,state:state,owner:owner,nft:borrowNFT))
              }
              i=i+1
        
           }
           return NFTs
        }
        
        `
        const args = (arg, t) => [];
        console.log("Enter to Code")
        const getNfts=await fcl.query({cadence,args})
        return getNfts
      }


      const getCollectionNfts=async(addr)=>{
        const cadence=`
        import MyStore from 0xe980ac3a631ef292
        import NonFungibleToken from 0xe980ac3a631ef292

        pub struct NFT {

          pub let id:UInt64;
          pub var price:UFix64;
          pub var state:String;
          pub var owner:Address;
          pub let nft:&NonFungibleToken.NFT;

          init(id:UInt64,price:UFix64,state:String,owner:Address,nft:&NonFungibleToken.NFT){
            self.id=id;self.price=price;self.state=state;self.owner=owner;self.nft=nft;
          }
        }
        pub fun main(acc:Address):[NFT]{

          let response=getAccount(acc).getCapability(/public/Collection).borrow<&MyStore.Collection{NonFungibleToken.CollectionPublic}>() ?? panic("Not Found")
          let ids=response.getIDs()

          var NFTs:[NFT]=[]
          for i in ids{
              let owner=MyStore.owner[i]!
              let response=getAccount(owner).getCapability(/public/Collection).borrow<&MyStore.Collection{NonFungibleToken.CollectionPublic}>() ?? panic("Not Found")

              let borrowNFT=response.borrowNFT(id:i) 

              let state=MyStore.state[i]!
              
              if(state=="OnSale"){
                let price=MyStore.price[i]!
                NFTs.append(NFT(id:i,price:price,state:state,owner:owner,nft:borrowNFT))
              }
              else{
                  NFTs.append(NFT(id:i,price:0.0,state:state,owner:owner,nft:borrowNFT))
              }
            

          }
          return NFTs
        }

        
        `
        const args = (arg, t) => [arg(addr, t.Address)];
        console.log("Enter to Code")
        const getNfts=await fcl.query({cadence,args})
        return getNfts
      }
    const value={
        getFlowBalance,createCollection,listNFT,createNFT,marketplace,getCollectionIds,totalSupply,sendFlow,checkCollection,getOwner,getState,getPrice,getAllNfts,getCollectionNfts
    }
    return (
        <Data.Provider value={value}>
            {children}
        </Data.Provider>
    )
}

export default interact

export function cadenceCode(){
    return useContext(Data)
}


