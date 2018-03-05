<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    
  
  </div>
</template>

<script>
import CryptoCardsFactory from '@/js/cards'

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to your truffle-vue dApp',
      pseudo: undefined
    }
  },
  computed: {
    
  },
  beforeCreate: function () {
    CryptoCardsFactory.init().then(() => {
      

      
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
