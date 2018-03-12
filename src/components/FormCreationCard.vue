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
      <label>Immagine</label>
      <input type="file" @change="filesChange($event.target.name, $event.target.files);" />
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
        },
        image: ""    
    }
  },
  computed: {
    
  },
  methods: {
    filesChange(event, fileList){
      let reader = new FileReader();
      const file = fileList[0];
      reader.readAsDataURL(file);
        reader.onload = function(e) {
          this.image = e.target.result;
          console.log(this.image);
          
        } ;
    },
    saveToIpfs(reader){
      console.log(reader);
    },
    saveCard(){
      
      let self = this;
      window.ipfs.add(new Buffer(self.image), function(err, res) {
          
          if(res){

            self.$set(self.card, 'identity', res[0].hash);
      
            if(!self.card.onSale){
              self.$set(self.card, 'price', 0);
            }else{
              self.$set(self.card, 'price', window.web3.toWei(self.card.price, 'ether'));
            }
      

            CryptoCardsFactory.createCard(self.card.price, self.card.identity, self.card.name, 
            self.card.onSale).then(tx => {
                self.$store.commit('incrementsNumberCards');
                if(self.card.onSale){
                  self.$store.commit('pushCard', new Card(self.card.price, self.card.identity,  self.card.name, self.card.onSale)); 
                }
                
                  
                }).catch(err => {
                  console.log(err)
            })

          }else{
            console.log("errore in ipfs");
          }
            
                
      });


      //var identity = moment().unix();
          }
      
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
