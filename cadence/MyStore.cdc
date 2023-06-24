import NonFungibleToken from 0xe980ac3a631ef292
pub contract MyStore:NonFungibleToken{

   pub var totalSupply:UInt64;
   pub var price:{UInt64:UFix64};
   pub var state:{UInt64:String};
   pub var owner:{UInt64:Address};


   pub event ContractInitialized()
   pub event Withdraw(id: UInt64, from: Address?)
   pub event Deposit(id: UInt64, to: Address?)

   pub resource NFT:NonFungibleToken.INFT {

       pub let id:UInt64;
       pub let ipfs:String;
       pub let name:String;
       init(_name:String,_ipfs:String,_owner:Address){

         self.id=MyStore.totalSupply;
         MyStore.totalSupply=MyStore.totalSupply+1
         self.ipfs=_ipfs;
         self.name=_name;
         MyStore.state[self.id]="NotSale";
         MyStore.owner[self.id]=_owner;

       }
   }
   
       pub resource Collection:NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic{

        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT{
           emit Withdraw(id:withdrawID , from: self.owner?.address)
           return <- self.ownedNFTs.remove(key: withdrawID)!
        }
        
        pub fun deposit(token: @NonFungibleToken.NFT){

           emit Deposit(id: token.id, to: self.owner?.address)
           self.ownedNFTs[token.id]<-! token

        }

        pub fun getIDs(): [UInt64]{
           return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }
        init(){
           self.ownedNFTs <- {}
        }
        destroy(){
           destroy self.ownedNFTs
        }
    }


  
    pub fun createNFT(_name:String,_ipfs:String,_owner:Address):@NFT{
       return <- create NFT(_name:_name,_ipfs:_ipfs,_owner:_owner)
    }
    
    pub fun createEmptyCollection():@Collection  {
       return <- create Collection()
    }
   
    pub fun listNFT(_id:UInt64,_price:UFix64){
      self.price[_id]=_price;
      self.state[_id]="OnSale";
    }
   
    pub fun sellNFT(_id:UInt64,_owner:Address){
      self.state[_id]="NotSale";
      self.price.remove(key: _id);
      self.owner[_id]=_owner;
    }
  
   
   init(){

     self.totalSupply=0
     self.price={};
     self.state={};
     self.owner={};
    
   }
}
//self.account.address