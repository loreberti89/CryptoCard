<template>
  <div class="form">
    <form v-on:submit.prevent="saveCard()">
      <label>Nome carta</label>
      <input type="text" name="name" v-model="card.name"/>
      <label>La carta sarà in vendita? </label>
      <input type="checkbox" name="onSale" v-model="card.onSale" />
      <span v-if="card.onSale">
        <label>A quale prezzo (deve essere maggiore di 0 e in eth)</label>
        <input name="price" type="number" v-model="card.price" step="0.01"/>
      </span>
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
          identity: null,
          onSale: false,
          price: 0
        }    
    }
  },
  computed: {
    
  },
  methods: {
    saveCard(){
      var identity = moment().unix();
      this.$set(this.card, 'identity', identity);
      if(!this.card.onSale){
        this.$set(this.card, 'price', 0);
      }else{
        this.$set(this.card, 'price', window.web3.toWei(this.card.price, 'ether'));
      }
      

      CryptoCardsFactory.createCard(this.card.identity, this.card.price, this.card.name, this.card.onSale).then(tx => {
          this.$store.commit('incrementsNumberCards');
            
          if(this.card.onSale){
            this.$store.commit('pushCard', new Card(this.card.identity, this.card.price, this.card.name, this.card.onSale)); 
          }
          
            
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
