<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <h1>Numero totale di carte create: {{totalNumber}}</h1>
    <div>
      <formcreationcard></formcreationcard>
      <listcards></listcards>
    </div>
  
  </div>
</template>

<script>

import formcreationcard from './FormCreationCard';
import listcards from './ListCards';
import CryptoCardsFactory from '@/js/cards';
import Card from '../classes/Card.js';

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to CryptoCard',
      pseudo: undefined
      
    }
  },
  components: {
        formcreationcard,
        listcards
  },
  computed: {
    totalNumber(){
      return this.$store.getters.getTotalCards
    }
  },
  beforeCreate: function () {

    CryptoCardsFactory.init().then(() => {
      
      CryptoCardsFactory.getTotalCards().then(tx => {
            this.$store.commit('setNumberCards', tx.toNumber());
             
            
          }).catch(err => {
            console.log(err)
          })
         
      }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
