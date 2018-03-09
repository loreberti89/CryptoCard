<template>
  <div class="form">
    <form v-on:submit.prevent="saveCard()">
      <label>Nome carta</label>
      <input name="name" v-model="card.name"/>
      <button>Crea</button>
    </form>
  
  </div>
</template>

<script>
import CryptoCardsFactory from '@/js/cards'
import moment from 'moment';
import Card from '../classes/Card.js';
export default {
  name: 'formcreationcard',
  data () {
    return {
        card: {
          name: "",
          identity: null
        }    
    }
  },
  computed: {
    
  },
  methods: {
    saveCard(){
      var identity = moment().unix();
      this.$set(this.card, 'identity', identity);
      CryptoCardsFactory.createCard(this.card.name, this.card.identity).then(tx => {
            this.$store.commit('incrementsNumberCards');
            

            this.$store.commit('pushCard', new Card(this.card.name, this.card.identity)); 
            
          }).catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
