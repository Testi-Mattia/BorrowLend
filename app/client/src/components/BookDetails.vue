<template>
  <div class="book-details">
    <div class="book-info">
      <div class="book-cover">
        <img :src="book.copertina" alt="Copertina del libro" />
      </div>
      <div class="book-details-info">
        <h2>{{ book.titolo }}</h2>
        <p>Autore: {{ book.autore }}</p>
        <p>Prezzo: {{ book.prezzo }}</p>
        <p>Descrizione: {{ book.descrizione }}</p>
        <p>ISBN: {{ book.isbn }}</p>
      </div>
    </div>
    <div class="button">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Torna alla libreria
      </button>
      <button class="add-to-cart-button" @click="addToCart">
        Aggiungi al carrello
      </button>
    </div>
    <transition name="message-transition">
      <div v-if="showAlert" class="message-alert">{{ message }}</div>
    </transition>
  </div>
</template>

<script>
import { useCounterStore } from "@/store/counter.js";

export default {
  data() {
    return {
      message: "",
      showAlert: false,
    };
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$emit("back");
    },
    addToCart() {
      const store = useCounterStore();
      store.addToCart(this.book);
      this.showMessage("Elemento Aggiunto Al Carrello");
    },
    showMessage(text) {
      this.message = text;
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 3000); // Tempo in millisecondi dopo il quale il messaggio scompare (in questo caso 3 secondi)
    },
  },
};
</script>

<style scoped>
.message-transition-enter-active,
.message-transition-leave-active {
  transition: opacity 0.5s;
}
.message-transition-enter,
.message-transition-leave-to {
  opacity: 0;
}
.message-alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #b3d9ff;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  width: 100%;
  text-align: center;
}
.book-details {
  font-family: 'Courier New', monospace;
  background-color: #f7f7f7;
  padding: 20px;
}

.back-button,
.add-to-cart-button {
  background-color: #313439;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 120px;
  margin-left: 100px;
}

.back-button:hover,
.add-to-cart-button:hover {
  background-color: #313439;
}

.back-button i,
.add-to-cart-button i {
  margin-right: 8px;
}

.book-info {
  display: flex;
}

.book-cover {
  flex: 0 0 200px;
  margin-right: 20px;
}

.book-cover img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.book-details-info {
  flex: 1;
}

.book-details-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.book-details-info p {
  font-size: 16px;
  margin-bottom: 5px;
}
</style>
