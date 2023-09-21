import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    if (localStorage.getItem("counter")) {
      return JSON.parse(localStorage.getItem("counter"));
    }
    return {
      cartItems: [],
      logged: false,
      user: null,
    };
  },
  actions: {
    addToCart(book) {
      const existingItem = this.cartItems.find((item) => item.isbn === book.isbn);
      if (existingItem) {
        existingItem.quantita += 1; // Aggiungi alla quantità esistente
      } else {
        book.quantita = 1; // Aggiungi il campo "quantita" all'oggetto book
        this.cartItems.push(book);
      }
    },

    removeFromCart(item) {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        if (item.quantita > 1) {
          item.quantita -= 1;
        } else {
          this.cartItems.splice(index, 1);
        }
      }
    },
    
    getCartTotalPrice() {
      const totalPrice = this.cartItems.reduce((total, item) => total + parseFloat(item.prezzo) * item.quantita, 0);
      return totalPrice.toFixed(2);
    },

    logIn() {
      this.logged = true;
    },
    logOut() {
      this.logged = false;
    },
    setUser(user){
      this.user=user;
    }
  },
  getters: {
  },
});
