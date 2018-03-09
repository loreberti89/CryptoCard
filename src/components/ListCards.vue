<template>
  <div class="list">
    <h1>Lista Carte</h1>
    
    <table>
    <thead>
      <tr>
        <th>Identità</th>
        <th>Nome</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in cards">
        <td>{{ card.identity }}</td>
        <td>{{card.name}}</td>
      </tr>
    </tbody>
    </table>
  
  </div>
</template>

<script>


import CryptoCardsFactory from '@/js/cards'
import Card from '../classes/Card.js';
export default {

  name: 'listcards',
  data () {
    return {
      
    }
  },
  components: {
        
  },
  beforeCreate: function () {
    CryptoCardsFactory.init().then(() => {
      CryptoCardsFactory.getAllCards().then(tx => {
              let cards = tx;
              for(var i = 0; i < cards.length; i++){
                CryptoCardsFactory.getCardById(cards[i].toNumber()).then(txc => {
                  this.$store.commit('pushCard', new Card(txc[0], txc[1].toNumber()));    
                }).catch(err=>{
                  console.log(err);
                })
                
              }
            }).catch(err => {
              console.log(err)
            })
    }).catch(err=>{
      console.log(err);
    }); 
  },
  
  computed: {
    cards(){
      return this.$store.getters.getCards
    }
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
