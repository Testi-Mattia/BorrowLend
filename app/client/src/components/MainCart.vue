<template>
  <div class="main-cart" v-if="store">
    <h1>Il mio carrello</h1>
    <div v-if="store.cartItems.length === 0">
      <p>Il carrello è vuoto.</p>
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Torna alla libreria
      </button>
    </div>
    <div v-else>
      <div class="cart-item" v-for="item in store.cartItems" :key="item.id">
        <div class="cart-item-info">
          <img :src="item.copertina" alt="Copertina del libro" />
          <div>
            <h2>{{ item.titolo }}</h2>
            <p>Autore: {{ item.autore }}</p>
            <p>Prezzo: {{ item.prezzo }}€</p>
            <p>Quantità: {{ item.quantita }}</p>
          </div>
        </div>
        <div class="remove-chart">
          <button class="remove-button" @click="removeFromCart(item)">
            Rimuovi dal carrello
          </button>
        </div>
      </div>
      <p class="total">Totale: {{ getTotalPrice() }}€</p>
      <Checkout-Payment v-if="log()" />
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Torna alla libreria
      </button>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from "@/store/counter.js";
import CheckoutPayment from '@/components/Checkout.vue';

export default {
  name: 'App',
  components: {
  CheckoutPayment,
  },
  data() {
    return {
      store: null,
    };
  },
  methods: {
    log(){
      return this.store.logged;
    },
    goBack() {
      this.$emit("back");
    },
    removeFromCart(item) {
      this.store.removeFromCart(item);
    },
    getTotalPrice() {
      return this.store.getCartTotalPrice();
    },
  },
  mounted() {
    this.store = useCounterStore();
  },
};
</script>


  <style scoped>
  /* Stili CSS personalizzati per il componente MainCart */
  .remove-chart{
    padding: 30px;
  }
  .main-cart {
  padding: 20px;
  font-family: 'Courier New', monospace;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item img {
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.cart-item-info {
  display: flex;
  align-items: center;
}

.cart-item-info h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.cart-item-info p {
  font-size: 16px;
  margin: 0;
}

.remove-button {
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.total {
  font-size: 18px;
  margin-bottom: 10px;
}

.checkout-button {
  margin-right: 170px;
  padding: 10px 30px;
  background-color: #313439;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.back-button[data-v-763ea7ae] {
  padding: 10px 20px;
  background-color: #313439;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 10px;
}

.back-button i {
  margin-right: 5px;
}

  </style>