<template>
  <div class="main-library">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    </head>
    <h1 class="title">BorrowLend</h1>
    
    <i class="fa fa-shopping-cart cart-icon" @click="showcart">{{cartItems.length}}</i>
    <MainLogin class="cart-icon" style="margin-right: 60px;"></MainLogin>
    
    <MainNavbar @category-selected="changeCategory" @search-selected="changeSearch" />
    <p></p>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i> Pagina precedente
      </button>
      <span>Pagina {{ currentPage }} di {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Pagina successiva <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div v-if="selectedBook === null && !showCart">
      <div class="book-grid">
        <div class="book-item" v-for="book in displayedBooks" :key="book.isbn" @click="selectBook(book)">
          <img :src="book.copertina" alt="Copertina del libro" />
          <h2>{{ book.titolo }}</h2>
          <p>Autore: {{ book.autore }}</p>
          <p>Prezzo: {{ book.prezzo }}</p>
        </div>
      </div>
      
    </div>

    <BookDetails v-if="selectedBook && !showCart" :book="selectedBook" @back="deselectBook" @add-to-cart="addToCart" />

    <MainCart v-if="showCart" :cart-items="cartItems" @back="showCart = false" @remove-from-cart="removeFromCart" />

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i> Pagina precedente
      </button>
      <span>Pagina {{ currentPage }} di {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Pagina successiva <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MainNavbar from './MainNavbar.vue';
import BookDetails from './BookDetails.vue';
import MainCart from './MainCart.vue';
import { useCounterStore } from "@/store/counter.js"
import MainLogin from "@/components/MainLogin.vue"


export default {
  components: {
    MainNavbar,
    BookDetails,
    MainCart,
    MainLogin
  },
  data() {
    return {
      books: [],
      currentPage: 1,
      perPage: 12,
      selectedCategory: '',
      searchQuery: '',
      selectedBook: null,
      showCart: false,
      cartItems: []
    };
  },
  computed: {
    displayedBooks() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      let filteredBooks = this.selectedCategory
        ? this.books.filter(book => book.categoria === this.selectedCategory)
        : this.books;

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredBooks = filteredBooks.filter(book => {
          const titleMatch = book.titolo.toLowerCase().startsWith(query);
          const isbnMatch = book.isbn.toLowerCase().startsWith(query);
          return titleMatch || isbnMatch;
        });
      }

      return filteredBooks.slice(startIndex, endIndex);
    },
    totalPages() {
      let filteredBooks = this.selectedCategory
        ? this.books.filter(book => book.categoria === this.selectedCategory)
        : this.books;

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredBooks = filteredBooks.filter(book => {
          const titleMatch = book.titolo.toLowerCase().startsWith(query);
          const isbnMatch = book.isbn.toLowerCase().startsWith(query);
          return titleMatch || isbnMatch;
        });
      }

      return Math.ceil(filteredBooks.length / this.perPage);
    }
  },
  methods: {
    showcart(){
      this.showCart = true; // Aggiunta di questa linea per visualizzare il carrello
    },
    fetchBooks() {
      const limit = this.perPage;
      const offset = (this.currentPage - 1) * this.perPage;

      axios
        .get(`http://localhost:3000/api/books?limit=${limit}&offset=${offset}`)
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Errore durante la richiesta dei libri:', error);
        });
    },
    previousPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
    changeCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
    },
    changeSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
    selectBook(book) {
      this.selectedBook = book;
    },
    deselectBook() {
      this.selectedBook = null;
    },
    addToCart(book){
      this.store.addToCart(book);
    },
    removeFromCart(book){
      this.store.removeFromCart(book);
    }
  },
  mounted() {
    const store = useCounterStore(); //initialize the store
    this.cartItems=store.cartItems;
    this.fetchBooks();
  }
};
</script>
<style scoped>

.title {
  font-size: 40px;
  animation: slideInAnimation 2s ease-in-out forwards;
  text-align: center;
  font-family: 'Courier New', monospace;
}

@keyframes slideInAnimation {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}


.cart-icon {
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 30px;
  color: #000;
  cursor: pointer;
}

/* Stile principale */
.main-library {
  padding: 20px;
  font-family: 'Courier New', monospace;
}

/* Titolo della libreria */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Pulsante del carrello */
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

/* Barra di navigazione principale */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.pagination button {
  padding: 10px 20px;
  background-color: #313439;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.pagination span {
  font-size: 16px;
  margin: 0 10px;
}

/* Griglia dei libri */
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Singolo libro nell'elenco */
.book-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.book-item img {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}

.book-item h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.book-item p {
  font-size: 16px;
  margin: 0;
}

/* Dettagli del libro */
.book-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.book-details img {
  width: 300px;
  height: auto;
  margin-bottom: 10px;
}

.book-details h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.book-details p {
  font-size: 18px;
  margin: 0;
}

/* Carrello principale */
.main-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

/* Singolo elemento nel carrello */
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.cart-item img {
  width: 80px;
  height: auto;
  margin-right: 10px;
}

/* Icone delle frecce */
.fa-chevron-left,
.fa-chevron-right {
  color: #007bff;
  font-size: 16px;
}

/* Stile per il pulsante disabilitato */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>