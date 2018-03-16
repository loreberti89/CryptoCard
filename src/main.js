// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'


import App from './App'
import Web3 from 'web3'
import router from './router'





Vue.config.productionTip = false
Vue.use(Vuex)
window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  }


var ipfsAPI = require('ipfs-api')
// or using options
window.ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

const store = new Vuex.Store({
  state: {
    numberCards: 0,
    cards: [],
    cardDetail: {}
  },
  mutations: {
    incrementsNumberCards (state) {
      state.numberCards++
    },
    setNumberCards (state, number){
      state.numberCards = number;
    },
    pushCard(state, card){
      
      state.cards.push(card);
    },
    setCardDetail(state, card){
      state.cardDetail = card;
    }
  },
  getters:{
    getTotalCards: state => {
      return state.numberCards;
    },
    getCards: state => {
      return state.cards;
    },
    getCardDetail: state =>{
      return state.cardDetail;
    }
  }
})

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
})




