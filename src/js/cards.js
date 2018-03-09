import contract from 'truffle-contract'
import CryptoCardFactoryContract from "@contracts/CryptoCardOwnership.json"


const CryptoCardFactory = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(CryptoCardFactoryContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getTotalCards: function(){
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.totalSupply().then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllCards: function(){

    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getAllCards().then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getCardById: function(id){
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getCardById(id).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },
  createCard: function(name, identity){
    let self = this
    console.log(window.web3.eth.accounts[0]);
    return new Promise((resolve, reject) => {
      self.instance.createCard(
        name, 
        identity,
        {from: window.web3.eth.accounts[0], gas: 300000}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }

  
}

export default CryptoCardFactory
