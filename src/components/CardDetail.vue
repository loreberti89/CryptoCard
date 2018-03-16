<template>
  <div class="card-container" v-if="card && card.name">
    <h1>{{ card.name }}</h1>
    <div>
      <img width="100" v-bind:src="`${card.imageBase64}`">
    </div>
    <div>
      <h2>Prezzo richiesto</h2>
      <span>{{card.getPriceFromWei()}}</span>
    </div>
    <div>
      <h2>Fai offerta</h2>
      <input type="text" class="form-control" v-model="offer_value" />
      <span @click="offer()">Offri</span>
    </div>
  </div>
</template>

<script>

import CryptoCardsFactory from '@/js/cards';
import Card from '../classes/Card.js';

export default {
  name: 'card-detail',
  data () {
    return {
      
      offer_value: 0
    }
  },
  props: ['id'],
  components: {
        
  },
  computed: {
    card(){
      return this.$store.getters.getCardDetail
    }
  },
  created: function () {
    let self = this;
    console.log(self.id);
    CryptoCardsFactory.init().then(() => {
      
      CryptoCardsFactory.getCardById(self.id).then(txc => {
        window.ipfs.files.cat(txc[1],  function (err, stream){
          self.$store.commit('setCardDetail', new Card(
              //price, identity,  name, onsale
              txc[0].toNumber(), txc[1] , txc[2], txc[3], Buffer(stream, 'ascii').toString()
            )) 
           
            
            
        }); 
      }).catch(err => {
            console.log(err)
      })
         
      }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    offer(){
      console.log("test");
    }
  }
}
</script>